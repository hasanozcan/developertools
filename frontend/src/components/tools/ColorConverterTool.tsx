'use client';

import { useState, useCallback, useEffect } from 'react';
import { Copy, Check, Palette } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

interface PaletteColor {
  hex: string;
  name: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function generatePalette(hsl: { h: number; s: number; l: number }): {
  complementary: PaletteColor[];
  analogous: PaletteColor[];
  triadic: PaletteColor[];
  splitComplementary: PaletteColor[];
} {
  const { h, s, l } = hsl;
  
  // Helper to convert HSL back to RGB
  const hslToHex = (h: number, s: number, l: number): string => {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b).toUpperCase();
  };

  // Complementary (opposite on color wheel)
  const complementary = [
    { hex: hslToHex(h, s, l), name: 'Original' },
    { hex: hslToHex((h + 180) % 360, s, l), name: 'Complementary' },
  ];

  // Analogous (adjacent colors)
  const analogous = [
    { hex: hslToHex((h - 30 + 360) % 360, s, l), name: 'Analogous 1' },
    { hex: hslToHex(h, s, l), name: 'Original' },
    { hex: hslToHex((h + 30) % 360, s, l), name: 'Analogous 2' },
  ];

  // Triadic (3 colors equally spaced)
  const triadic = [
    { hex: hslToHex(h, s, l), name: 'Primary' },
    { hex: hslToHex((h + 120) % 360, s, l), name: 'Triadic 1' },
    { hex: hslToHex((h + 240) % 360, s, l), name: 'Triadic 2' },
  ];

  // Split Complementary
  const splitComplementary = [
    { hex: hslToHex(h, s, l), name: 'Original' },
    { hex: hslToHex((h + 150) % 360, s, l), name: 'Split 1' },
    { hex: hslToHex((h + 210) % 360, s, l), name: 'Split 2' },
  ];

  return { complementary, analogous, triadic, splitComplementary };
}

export default function ColorConverterTool() {
  const { t } = useLanguage();
  const [color, setColor] = useState<ColorValues>({
    hex: '#3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [showPalette, setShowPalette] = useState(true);

  const palette = generatePalette(color.hsl);

  const updateFromHex = useCallback((hex: string) => {
    const cleanHex = hex.startsWith('#') ? hex : '#' + hex;
    const rgb = hexToRgb(cleanHex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor({ hex: cleanHex.toUpperCase(), rgb, hsl });
    }
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    setColor({ hex: hex.toUpperCase(), rgb: { r, g, b }, hsl });
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    l = Math.max(0, Math.min(100, l));
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColor({ hex: hex.toUpperCase(), rgb, hsl: { h, s, l } });
  }, []);

  const copyToClipboard = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const loadSample = useCallback(() => {
    updateFromHex('#FF5733');
  }, [updateFromHex]);

  const hexString = color.hex;
  const rgbString = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
  const hslString = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;

  const copyToClipboardWithFeedback = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const ColorSwatch = ({ hex, name }: { hex: string; name: string }) => (
    <button
      onClick={() => {
        copyToClipboardWithFeedback(hex, hex);
        updateFromHex(hex);
      }}
      className="group relative flex flex-col items-center gap-2 transition-transform hover:scale-105"
    >
      <div
        className="w-16 h-16 rounded-lg shadow-md border-2 border-white dark:border-gray-700"
        style={{ backgroundColor: hex }}
      />
      <div className="text-center">
        <div className="text-xs font-mono text-gray-700 dark:text-gray-300">{hex}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{name}</div>
      </div>
      {copied === hex && (
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
          <Check className="w-6 h-6 text-white" />
        </div>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Load Sample Button */}
      <div className="flex justify-end">
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t('common.loadSample')}
        </button>
      </div>

      {/* Color Palette Generator */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">{t('tool.colorConverter.generatePalette')}</span>
          </div>
          <span className={`transform transition-transform ${showPalette ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {showPalette && (
          <div className="p-6 space-y-6">
            {/* Complementary */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('tool.colorConverter.paletteComplementary')}</h4>
              <div className="flex gap-4 justify-center">
                {palette.complementary.map((color) => (
                  <ColorSwatch key={color.hex} hex={color.hex} name={color.name} />
                ))}
              </div>
            </div>

            {/* Analogous */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Analogous</h4>
              <div className="flex gap-4 justify-center">
                {palette.analogous.map((color) => (
                  <ColorSwatch key={color.hex} hex={color.hex} name={color.name} />
                ))}
              </div>
            </div>

            {/* Triadic */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Triadic</h4>
              <div className="flex gap-4 justify-center">
                {palette.triadic.map((color) => (
                  <ColorSwatch key={color.hex} hex={color.hex} name={color.name} />
                ))}
              </div>
            </div>

            {/* Split Complementary */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Split Complementary</h4>
              <div className="flex gap-4 justify-center">
                {palette.splitComplementary.map((color) => (
                  <ColorSwatch key={color.hex} hex={color.hex} name={color.name} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Preview */}
      <div className="flex items-center gap-6">
        <div
          className="w-32 h-32 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-inner"
          style={{ backgroundColor: color.hex }}
        />
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool.colorConverter.colorPicker')}</label>
          <input
            type="color"
            value={color.hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full h-12 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      {/* HEX Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HEX</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={color.hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
            placeholder="#000000"
          />
          <button
            onClick={() => copyToClipboard(hexString, 'hex')}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            title={t('tool.colorConverter.copyHex')}
          >
            {copied === 'hex' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
          </button>
        </div>
      </div>

      {/* RGB Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">RGB</label>
        <div className="flex gap-2">
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">R</label>
              <input
                type="number"
                min="0"
                max="255"
                value={color.rgb.r}
                onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, color.rgb.g, color.rgb.b)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">G</label>
              <input
                type="number"
                min="0"
                max="255"
                value={color.rgb.g}
                onChange={(e) => updateFromRgb(color.rgb.r, parseInt(e.target.value) || 0, color.rgb.b)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">B</label>
              <input
                type="number"
                min="0"
                max="255"
                value={color.rgb.b}
                onChange={(e) => updateFromRgb(color.rgb.r, color.rgb.g, parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(rgbString, 'rgb')}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors self-end"
            title={t('tool.colorConverter.copyRgb')}
          >
            {copied === 'rgb' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{rgbString}</p>
      </div>

      {/* HSL Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HSL</label>
        <div className="flex gap-2">
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t('tool.colorConverter.hue')}</label>
              <input
                type="number"
                min="0"
                max="360"
                value={color.hsl.h}
                onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, color.hsl.s, color.hsl.l)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t('tool.colorConverter.saturation')}</label>
              <input
                type="number"
                min="0"
                max="100"
                value={color.hsl.s}
                onChange={(e) => updateFromHsl(color.hsl.h, parseInt(e.target.value) || 0, color.hsl.l)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t('tool.colorConverter.lightness')}</label>
              <input
                type="number"
                min="0"
                max="100"
                value={color.hsl.l}
                onChange={(e) => updateFromHsl(color.hsl.h, color.hsl.s, parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(hslString, 'hsl')}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors self-end"
            title={t('tool.colorConverter.copyHsl')}
          >
            {copied === 'hsl' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{hslString}</p>
      </div>

      {/* Color Variations */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.colorConverter.colorVariations')}</label>
        <div className="grid grid-cols-5 gap-2">
          {[10, 30, 50, 70, 90].map((lightness) => {
            const variantRgb = hslToRgb(color.hsl.h, color.hsl.s, lightness);
            const variantHex = rgbToHex(variantRgb.r, variantRgb.g, variantRgb.b);
            return (
              <button
                key={lightness}
                onClick={() => updateFromHex(variantHex)}
                className="h-12 rounded-lg border border-gray-200 dark:border-gray-600 transition-transform hover:scale-105"
                style={{ backgroundColor: variantHex }}
                title={`${lightness}% ${t('tool.colorConverter.lightnessTooltip')}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
