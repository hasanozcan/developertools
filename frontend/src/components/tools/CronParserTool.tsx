'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, AlertCircle, Calendar, Play, Copy, Check, FileText } from 'lucide-react';
import { useLanguage, type Language } from '@/context/LanguageContext';
import {
  describeCronSchedule,
  findNextCronRuns,
  parseCronExpression,
  type CronDescriptionKey,
} from '@/lib/cron';

const languageLocales: Record<Language, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  ru: 'ru-RU',
  zh: 'zh-CN',
};

function formatNextRun(date: Date, locale: string): string {
  return date.toLocaleString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, value),
    template,
  );
}

export default function CronParserTool() {
  const { t, language } = useLanguage();
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [nextRuns, setNextRuns] = useState<Date[]>([]);
  const [copied, setCopied] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Builder state
  const [builderMinute, setBuilderMinute] = useState('*');
  const [builderMinuteCustom, setBuilderMinuteCustom] = useState('');
  const [builderHour, setBuilderHour] = useState('*');
  const [builderHourCustom, setBuilderHourCustom] = useState('');
  const [builderDayMonth, setBuilderDayMonth] = useState('*');
  const [builderDayMonthCustom, setBuilderDayMonthCustom] = useState('');
  const [builderMonth, setBuilderMonth] = useState('*');
  const [builderDayWeek, setBuilderDayWeek] = useState('*');

  const parseCron = useCallback((expr: string) => {
    const trimmed = expr.trim();
    if (!trimmed) {
      setDescription('');
      setError('');
      setNextRuns([]);
      return;
    }

    try {
      const parsed = parseCronExpression(trimmed);
      const runs = findNextCronRuns(parsed, { count: 5 });
      setDescription(
        describeCronSchedule(parsed, {
          locale: languageLocales[language],
          translate: (key: CronDescriptionKey, values) =>
            interpolate(t(`tool.cronParser.description.${key}`), values),
        }),
      );
      setNextRuns(runs);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse cron expression');
      setDescription('');
      setNextRuns([]);
    }
  }, [language, t]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      parseCron(expression);
    }, 200);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [expression, parseCron]);

  const loadPreset = (expr: string) => {
    setExpression(expr);
  };

  const loadSample = () => {
    setExpression('0 9 * * 1-5');
  };

  const generateFromBuilder = () => {
    const minute = builderMinute === 'custom' ? builderMinuteCustom : builderMinute;
    const hour = builderHour === 'custom' ? builderHourCustom : builderHour;
    const dayMonth = builderDayMonth === 'custom' ? builderDayMonthCustom : builderDayMonth;
    const month = builderMonth;
    const dayWeek = builderDayWeek;
    
    const cron = `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`;
    setExpression(cron);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: t('tool.cronParser.presetEveryMinute'), expr: '* * * * *' },
    { label: t('tool.cronParser.presetEveryHour'), expr: '0 * * * *' },
    { label: t('tool.cronParser.presetMidnight'), expr: '0 0 * * *' },
    { label: t('tool.cronParser.presetNoon'), expr: '0 12 * * *' },
    { label: t('tool.cronParser.presetMondayMorning'), expr: '0 9 * * 1' },
    { label: t('tool.cronParser.presetWeekdayEvening'), expr: '0 18 * * 1-5' },
    { label: t('tool.cronParser.presetFirstOfMonth'), expr: '0 0 1 * *' },
    { label: t('tool.cronParser.presetEvery15Min'), expr: '*/15 * * * *' },
    { label: t('tool.cronParser.presetEvery6Hours'), expr: '0 */6 * * *' },
    { label: t('tool.cronParser.presetWeekends'), expr: '0 10 * * 0,6' },
  ];

  const fieldInfo = [
    { name: 'Minute', range: '0-59', special: '* , - /' },
    { name: 'Hour', range: '0-23', special: '* , - /' },
    { name: 'Day of Month', range: '1-31', special: '* , - /' },
    { name: 'Month', range: '1-12', special: '* , - /' },
    { name: 'Day of Week', range: '0-7 (Sun-Sat; 7=Sun)', special: '* , - /' },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.cronParser.cronExpression')}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="* * * * *"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            onClick={copyToClipboard}
            disabled={!expression}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            title="Copy expression"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-3 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
          >
            {t('common.loadSample')}
          </button>
        </div>
        
        {/* Field Labels */}
        <div className="grid grid-cols-5 gap-2 mt-2 text-center">
          {['Minute', 'Hour', 'Day', 'Month', 'Weekday'].map((label) => (
            <span key={label} className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
          ))}
        </div>
      </div>

      {/* Visual Builder Toggle */}
      <div>
        <button
          onClick={() => setShowBuilder(!showBuilder)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          {showBuilder ? t('common.hide') : t('common.show')} {t('tool.cronParser.visualBuilder')}
        </button>
      </div>

      {/* Visual Builder */}
      {showBuilder && (
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('tool.cronParser.visualBuilder')}</h3>
          
          <div className="space-y-4">
            {/* Minute */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minute</label>
                <select
                  value={builderMinute}
                  onChange={(e) => setBuilderMinute(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="*">Every minute (*)</option>
                  <option value="0">At minute 0</option>
                  <option value="*/5">Every 5 minutes (*/5)</option>
                  <option value="*/15">Every 15 minutes (*/15)</option>
                  <option value="*/30">Every 30 minutes (*/30)</option>
                  <option value="custom">Custom...</option>
                </select>
                {builderMinute === 'custom' && (
                  <input
                    type="text"
                    value={builderMinuteCustom}
                    onChange={(e) => setBuilderMinuteCustom(e.target.value)}
                    placeholder="0-59, e.g., 0,15,30,45"
                    className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                )}
              </div>

              {/* Hour */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hour</label>
                <select
                  value={builderHour}
                  onChange={(e) => setBuilderHour(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="*">Every hour (*)</option>
                  <option value="0">At hour 0 (midnight)</option>
                  <option value="*/2">Every 2 hours (*/2)</option>
                  <option value="*/6">Every 6 hours (*/6)</option>
                  <option value="*/12">Every 12 hours (*/12)</option>
                  <option value="9">At 9 AM</option>
                  <option value="17">At 5 PM</option>
                  <option value="custom">Custom...</option>
                </select>
                {builderHour === 'custom' && (
                  <input
                    type="text"
                    value={builderHourCustom}
                    onChange={(e) => setBuilderHourCustom(e.target.value)}
                    placeholder="0-23, e.g., 9,17"
                    className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                )}
              </div>

              {/* Day of Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day of Month</label>
                <select
                  value={builderDayMonth}
                  onChange={(e) => setBuilderDayMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="*">Every day (*)</option>
                  <option value="1">1st of month</option>
                  <option value="15">15th of month</option>
                  <option value="1,15">1st and 15th</option>
                  <option value="custom">Custom...</option>
                </select>
                {builderDayMonth === 'custom' && (
                  <input
                    type="text"
                    value={builderDayMonthCustom}
                    onChange={(e) => setBuilderDayMonthCustom(e.target.value)}
                    placeholder="1-31, e.g., 1,15,30"
                    className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                )}
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Month</label>
                <select
                  value={builderMonth}
                  onChange={(e) => setBuilderMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="*">Every month (*)</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              {/* Day of Week */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day of Week</label>
                <select
                  value={builderDayWeek}
                  onChange={(e) => setBuilderDayWeek(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="*">Every day (*)</option>
                  <option value="0">Sunday</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                  <option value="1-5">Weekdays (Mon-Fri)</option>
                  <option value="0,6">Weekends (Sat-Sun)</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateFromBuilder}
              className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Generate Cron Expression
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-700 dark:text-green-300">{t('tool.cronParser.scheduleDescription')}</span>
          </div>
          <p className="text-green-800 dark:text-green-200 text-lg">{description}</p>
        </div>
      )}

      {/* Next Runs */}
      {nextRuns.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Play className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">{t('tool.cronParser.nextRuns')}</span>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-600">
            {nextRuns.map((run, index) => (
              <div key={index} className="px-4 py-3 flex items-center gap-3">
                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {formatNextRun(run, languageLocales[language])}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {t('tool.cronParser.commonPresets')}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.expr}
              onClick={() => loadPreset(preset.expr)}
              className="p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              <div className="font-mono text-sm text-primary-600 dark:text-primary-400">{preset.expr}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{preset.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Field Reference */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">{t('tool.cronParser.fieldReference')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">{t('tool.cronParser.field')}</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">{t('tool.cronParser.range')}</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">{t('tool.cronParser.specialChars')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {fieldInfo.map((field) => (
                <tr key={field.name}>
                  <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">{field.name}</td>
                  <td className="px-4 py-2 font-mono text-gray-600 dark:text-gray-400">{field.range}</td>
                  <td className="px-4 py-2 font-mono text-gray-600 dark:text-gray-400">{field.special}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:divide-gray-600 text-sm text-gray-600 dark:text-gray-400">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div><code className="text-primary-600 dark:text-primary-400">*</code> = {t('tool.cronParser.anyValue')}</div>
            <div><code className="text-primary-600 dark:text-primary-400">,</code> = {t('tool.cronParser.valueList')}</div>
            <div><code className="text-primary-600 dark:text-primary-400">-</code> = {t('tool.cronParser.rangeValue')}</div>
            <div><code className="text-primary-600 dark:text-primary-400">/</code> = {t('tool.cronParser.stepValues')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
