'use client';

import { useState, useCallback, useEffect } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { ArrowDownUp, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TimestampConverterTool() {
  const { t } = useLanguage();
  const [timestamp, setTimestamp] = useState('');
  const [dateString, setDateString] = useState('');
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = useCallback((ts: string, unit: 'seconds' | 'milliseconds'): string => {
    const num = parseInt(ts, 10);
    if (isNaN(num)) return '';
    
    const ms = unit === 'seconds' ? num * 1000 : num;
    const date = new Date(ms);
    
    if (isNaN(date.getTime())) return '';
    return date.toISOString();
  }, []);

  const dateToTimestamp = useCallback((dateStr: string, unit: 'seconds' | 'milliseconds'): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    const ms = date.getTime();
    return unit === 'seconds' ? Math.floor(ms / 1000).toString() : ms.toString();
  }, []);

  const handleTimestampChange = useCallback((value: string) => {
    setTimestamp(value);
    const date = timestampToDate(value, unit);
    setDateString(date);
  }, [unit, timestampToDate]);

  const handleDateChange = useCallback((value: string) => {
    setDateString(value);
    const ts = dateToTimestamp(value, unit);
    setTimestamp(ts);
  }, [unit, dateToTimestamp]);

  const setNow = useCallback(() => {
    const now = unit === 'seconds' ? Math.floor(Date.now() / 1000) : Date.now();
    setTimestamp(now.toString());
    setDateString(new Date().toISOString());
  }, [unit]);

  const loadSample = useCallback(() => {
    // Use a specific sample timestamp (Jan 1, 2024 12:00:00 UTC)
    const sampleTs = unit === 'seconds' ? '1704110400' : '1704110400000';
    setTimestamp(sampleTs);
    setDateString(timestampToDate(sampleTs, unit));
  }, [unit, timestampToDate]);

  const formatLocalDate = (isoString: string): string => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const currentDate = new Date(currentTime * 1000);

  return (
    <div className="space-y-6">
      {/* Current Time Display */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{t('tool.timestampConverter.currentTime')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Unix Timestamp</span>
            <div className="flex items-center gap-2">
              <code className="font-mono text-lg text-gray-900 dark:text-white">{currentTime}</code>
              <CopyButton text={currentTime.toString()} />
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Date/Time</span>
            <div className="font-mono text-lg text-gray-900 dark:text-white">{currentDate.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">{t('tool.timestampConverter.unit')}:</span>
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setUnit('seconds')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              unit === 'seconds'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {t('tool.timestampConverter.seconds')}
          </button>
          <button
            onClick={() => setUnit('milliseconds')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              unit === 'milliseconds'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {t('tool.timestampConverter.milliseconds')}
          </button>
        </div>
        <button
          onClick={setNow}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          {t('tool.timestampConverter.useNow')}
        </button>
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          {t('common.loadSample')}
        </button>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.timestampConverter.timestampLabel')} ({unit})
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => handleTimestampChange(e.target.value)}
              placeholder={unit === 'seconds' ? '1700000000' : '1700000000000'}
              className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <CopyButton text={timestamp} />
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.timestampConverter.isoDateLabel')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={dateString}
              onChange={(e) => handleDateChange(e.target.value)}
              placeholder="2024-01-01T00:00:00.000Z"
              className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <CopyButton text={dateString} />
          </div>
        </div>
      </div>

      {/* Conversion Result */}
      {(timestamp || dateString) && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-3">{t('tool.timestampConverter.conversionResult')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600 dark:text-blue-400">{t('tool.timestampConverter.localTime')}:</span>
              <div className="font-mono text-blue-900 dark:text-blue-200">{formatLocalDate(dateString) || '-'}</div>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">{t('tool.timestampConverter.utcTime')}:</span>
              <div className="font-mono text-blue-900 dark:text-blue-200">{dateString || '-'}</div>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">{t('tool.timestampConverter.timestampSeconds')}:</span>
              <div className="font-mono text-blue-900 dark:text-blue-200">
                {timestamp ? (unit === 'seconds' ? timestamp : Math.floor(parseInt(timestamp) / 1000)) : '-'}
              </div>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">{t('tool.timestampConverter.timestampMilliseconds')}:</span>
              <div className="font-mono text-blue-900 dark:text-blue-200">
                {timestamp ? (unit === 'milliseconds' ? timestamp : parseInt(timestamp) * 1000) : '-'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t('tool.timestampConverter.info')}</p>
      </div>
    </div>
  );
}
