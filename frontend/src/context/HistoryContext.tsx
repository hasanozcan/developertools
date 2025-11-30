'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

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

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('toolHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('toolHistory', JSON.stringify(history));
    }
  }, [history, isInitialized]);

  const addToHistory = useCallback((item: Omit<HistoryItem, 'timestamp'>) => {
    setHistory(prev => {
      // Remove existing entry for the same tool
      const filtered = prev.filter(h => h.slug !== item.slug);
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
