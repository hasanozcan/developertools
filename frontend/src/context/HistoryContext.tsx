'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { isToolSlug } from '@/lib/api';

interface HistoryItem {
  slug: string;
  name: string;
  category: string;
  timestamp: number;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const MAX_HISTORY_ITEMS = 10;

function isValidHistoryItem(item: unknown): item is HistoryItem {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.slug === 'string' &&
    isToolSlug(candidate.slug) &&
    typeof candidate.name === 'string' &&
    candidate.name.trim().length > 0 &&
    typeof candidate.category === 'string' &&
    candidate.category.trim().length > 0 &&
    typeof candidate.timestamp === 'number' &&
    Number.isFinite(candidate.timestamp)
  );
}

function sanitizeHistoryItems(parsed: unknown): HistoryItem[] {
  if (!Array.isArray(parsed)) return [];
  const seen = new Set<string>();
  const valid: HistoryItem[] = [];
  for (const item of parsed) {
    if (!isValidHistoryItem(item) || seen.has(item.slug)) continue;
    seen.add(item.slug);
    valid.push({
      slug: item.slug,
      name: item.name,
      category: item.category,
      timestamp: item.timestamp,
    });
    if (valid.length >= MAX_HISTORY_ITEMS) break;
  }
  return valid;
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('toolHistory');
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        setHistory(sanitizeHistoryItems(parsed));
      }
    } catch {
      setHistory([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      window.localStorage.setItem('toolHistory', JSON.stringify(history));
    } catch {
      // Keep history usable in memory when storage is unavailable.
    }
  }, [history, isInitialized]);

  const addToHistory = useCallback((item: Omit<HistoryItem, 'timestamp'>) => {
    setHistory((prev) => {
      // Remove existing entry for the same tool
      const filtered = prev.filter((h) => h.slug !== item.slug);
      // Add new entry at the beginning
      const newHistory = [{ ...item, timestamp: Date.now() }, ...filtered];
      // Keep only the last MAX_HISTORY_ITEMS
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
