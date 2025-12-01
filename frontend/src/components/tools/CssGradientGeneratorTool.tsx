'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, RefreshCw, Palette, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface GradientStop {
  color: string;
  position: number;
  id: string;
}

const PRESET_GRADIENTS = [
  { name: 'Sunset', stops: [{ color: '#ff512f', position: 0 }, { color: '#dd2476', position: 100 }] },
  { name: 'Ocean', stops: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }] },
  { name: 'Forest', stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }] },
  { name: 'Purple', stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
  { name: 'Fire', stops: [{ color: '#f12711', position: 0 }, { color: '#f5af19', position: 100 }] },
  { name: 'Aurora', stops: [{ color: '#00c6ff', position: 0 }, { color: '#0072ff', position: 50 }, { color: '#00c6ff', position: 100 }] },
  { name: 'Rainbow', stops: [{ color: '#ff0000', position: 0 }, { color: '#ff8c00', position: 20 }, { color: '#ffff00', position: 40 }, { color: '#00ff00', position: 60 }, { color: '#0000ff', position: 80 }, { color: '#8b00ff', position: 100 }] },
  { name: 'Midnight', stops: [{ color: '#232526', position: 0 }, { color: '#414345', position: 100 }] },
];

export default function CssGradientGeneratorTool() {
  const { t } = useLanguage();
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>('circle');
  const [radialPosition, setRadialPosition] = useState('center');
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#667eea', position: 0, id: '1' },
    { color: '#764ba2', position: 100, id: '2' },
  ]);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const gradientCSS = useCallback(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
    
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${stopsString})`;
    } else {
      return `radial-gradient(${radialShape} at ${radialPosition}, ${stopsString})`;
    }
  }, [gradientType, angle, radialShape, radialPosition, stops]);

  const fullCSSCode = useCallback(() => {
    const gradient = gradientCSS();
    return `background: ${stops[0]?.color || '#667eea'};
background: -webkit-${gradient};
background: ${gradient};`;
  }, [gradientCSS, stops]);

  const copyCSS = useCallback(() => {
    navigator.clipboard.writeText(fullCSSCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [fullCSSCode]);

  const addStop = useCallback(() => {
    if (stops.length >= 8) return;
    const lastStop = stops[stops.length - 1];
    const newPosition = Math.min(lastStop.position + 10, 100);
    setStops([...stops, { color: '#ffffff', position: newPosition, id: generateId() }]);
  }, [stops]);

  const removeStop = useCallback((id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  }, [stops]);

  const updateStop = useCallback((id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  }, [stops]);

  const randomGradient = useCallback(() => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setStops([
      { color: randomColor(), position: 0, id: generateId() },
      { color: randomColor(), position: 100, id: generateId() },
    ]);
    setAngle(Math.floor(Math.random() * 360));
  }, []);

  const applyPreset = useCallback((preset: typeof PRESET_GRADIENTS[0]) => {
    setStops(preset.stops.map(s => ({ ...s, id: generateId() })));
  }, []);

  const downloadPNG = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    
    if (gradientType === 'linear') {
      const radians = (angle - 90) * Math.PI / 180;
      const x1 = 400 - Math.cos(radians) * 400;
      const y1 = 200 - Math.sin(radians) * 200;
      const x2 = 400 + Math.cos(radians) * 400;
      const y2 = 200 + Math.sin(radians) * 200;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      sortedStops.forEach(s => gradient.addColorStop(s.position / 100, s.color));
      ctx.fillStyle = gradient;
    } else {
      const gradient = ctx.createRadialGradient(400, 200, 0, 400, 200, 400);
      sortedStops.forEach(s => gradient.addColorStop(s.position / 100, s.color));
      ctx.fillStyle = gradient;
    }
    
    ctx.fillRect(0, 0, 800, 400);
    
    const link = document.createElement('a');
    link.download = 'gradient.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [stops, gradientType, angle]);

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div
        ref={previewRef}
        className="w-full h-48 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        style={{ background: gradientCSS() }}
      />

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Type & Direction */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('tool.gradient.type')}
            </label>
            <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <button
                onClick={() => setGradientType('linear')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  gradientType === 'linear'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType('radial')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  gradientType === 'radial'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                Radial
              </button>
            </div>
          </div>

          {gradientType === 'linear' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tool.gradient.angle')}: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <button
                    key={a}
                    onClick={() => setAngle(a)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      angle === a
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {a}°
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tool.gradient.shape')}
                </label>
                <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setRadialShape('circle')}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                      radialShape === 'circle'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    Circle
                  </button>
                  <button
                    onClick={() => setRadialShape('ellipse')}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                      radialShape === 'ellipse'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    Ellipse
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('tool.gradient.position')}
                </label>
                <select
                  value={radialPosition}
                  onChange={(e) => setRadialPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700"
                >
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="top left">Top Left</option>
                  <option value="top right">Top Right</option>
                  <option value="bottom left">Bottom Left</option>
                  <option value="bottom right">Bottom Right</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Color Stops */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.gradient.colorStops')}
            </label>
            <button
              onClick={addStop}
              disabled={stops.length >= 8}
              className="text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50"
            >
              + {t('tool.gradient.addStop')}
            </button>
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center gap-3">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                  className="w-24 px-2 py-1.5 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) => updateStop(stop.id, { position: Math.max(0, Math.min(100, Number(e.target.value))) })}
                  className="w-16 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500">%</span>
                <button
                  onClick={() => removeStop(stop.id)}
                  disabled={stops.length <= 2}
                  className="text-red-500 hover:text-red-700 disabled:opacity-30"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.gradient.presets')}
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_GRADIENTS.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="w-12 h-12 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
              style={{
                background: `linear-gradient(90deg, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
              }}
              title={preset.name}
            />
          ))}
          <button
            onClick={randomGradient}
            className="w-12 h-12 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
            title={t('tool.gradient.random')}
          >
            <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            CSS
          </label>
          <div className="flex gap-2">
            <button
              onClick={downloadPNG}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PNG
            </button>
            <button
              onClick={copyCSS}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
        </div>
        <pre className="w-full p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
          <code>{fullCSSCode()}</code>
        </pre>
      </div>
    </div>
  );
}
