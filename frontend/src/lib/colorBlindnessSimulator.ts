export type CvdType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface ColorBlindnessSimulation {
  original: string;
  protanopia: string;
  deuteranopia: string;
  tritanopia: string;
  achromatopsia: string;
}

type Matrix3 = [[number, number, number], [number, number, number], [number, number, number]];
type Vec3 = [number, number, number];

// sRGB -> CIE XYZ (D65)
const SRGB_TO_XYZ: Matrix3 = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041],
];

// CIE XYZ -> Hunt-Pointer-Estevez LMS
const XYZ_TO_LMS: Matrix3 = [
  [0.4002, 0.7076, -0.0808],
  [-0.2263, 1.1653, 0.0457],
  [0, 0, 0.9182],
];

function mul3(a: Matrix3, b: Matrix3): Matrix3 {
  const out: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
    }
  }
  return out as Matrix3;
}

function mulVec(m: Matrix3, v: Vec3): Vec3 {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}

function inv3(m: Matrix3): Matrix3 {
  const [a, b, c] = m[0];
  const [d, e, f] = m[1];
  const [g, h, i] = m[2];
  const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  return [
    [(e * i - f * h) / det, (c * h - b * i) / det, (b * f - c * e) / det],
    [(f * g - d * i) / det, (a * i - c * g) / det, (c * d - a * f) / det],
    [(d * h - e * g) / det, (b * g - a * h) / det, (a * e - b * d) / det],
  ];
}

const RGB_TO_LMS = mul3(XYZ_TO_LMS, SRGB_TO_XYZ);
const LMS_TO_RGB = inv3(RGB_TO_LMS);

// Solve Vienot (1999) dichromatic LMS projection planes preserving D65 white and primary anchors.
const WHITE_LMS = mulVec(RGB_TO_LMS, [1, 1, 1]);
const BLUE_LMS = mulVec(RGB_TO_LMS, [0, 0, 1]);
const RED_LMS = mulVec(RGB_TO_LMS, [1, 0, 0]);

const detP = WHITE_LMS[1] * BLUE_LMS[2] - WHITE_LMS[2] * BLUE_LMS[1];
const P_LMS: Matrix3 = [
  [
    0,
    (WHITE_LMS[0] * BLUE_LMS[2] - BLUE_LMS[0] * WHITE_LMS[2]) / detP,
    (WHITE_LMS[1] * BLUE_LMS[0] - BLUE_LMS[1] * WHITE_LMS[0]) / detP,
  ],
  [0, 1, 0],
  [0, 0, 1],
];

const detD = WHITE_LMS[0] * BLUE_LMS[2] - WHITE_LMS[2] * BLUE_LMS[0];
const D_LMS: Matrix3 = [
  [1, 0, 0],
  [
    (WHITE_LMS[1] * BLUE_LMS[2] - BLUE_LMS[1] * WHITE_LMS[2]) / detD,
    0,
    (WHITE_LMS[0] * BLUE_LMS[1] - BLUE_LMS[0] * WHITE_LMS[1]) / detD,
  ],
  [0, 0, 1],
];

const detT = WHITE_LMS[0] * RED_LMS[1] - WHITE_LMS[1] * RED_LMS[0];
const T_LMS: Matrix3 = [
  [1, 0, 0],
  [0, 1, 0],
  [
    (WHITE_LMS[2] * RED_LMS[1] - RED_LMS[2] * WHITE_LMS[1]) / detT,
    (WHITE_LMS[0] * RED_LMS[2] - RED_LMS[0] * WHITE_LMS[2]) / detT,
    0,
  ],
];

const PROTAN_RGB = mul3(LMS_TO_RGB, mul3(P_LMS, RGB_TO_LMS));
const DEUTAN_RGB = mul3(LMS_TO_RGB, mul3(D_LMS, RGB_TO_LMS));
const TRITAN_RGB = mul3(LMS_TO_RGB, mul3(T_LMS, RGB_TO_LMS));

export function normalizeHexColor(hex: string): string {
  const cleaned = (hex || '').trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(cleaned)) {
    return (
      '#' +
      cleaned
        .split('')
        .map((c) => `${c}${c}`.toLowerCase())
        .join('')
    );
  }
  if (/^[0-9a-f]{6}$/i.test(cleaned)) {
    return `#${cleaned.toLowerCase()}`;
  }
  throw new Error('Enter a valid hex color such as #ef4444 or #f00.');
}

function srgbChannelToLinear(channel255: number): number {
  const c = channel255 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgbChannel(linear: number): number {
  const clamped = Math.max(0, Math.min(1, linear));
  const encoded =
    clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(encoded * 255)));
}

function hexToLinearRgb(hex: string): Vec3 {
  const normalized = normalizeHexColor(hex);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return [srgbChannelToLinear(r), srgbChannelToLinear(g), srgbChannelToLinear(b)];
}

function linearRgbToHex(rgb: Vec3): string {
  return '#' + rgb.map((c) => linearToSrgbChannel(c).toString(16).padStart(2, '0')).join('');
}

export function simulateColorBlindness(hex: string, type: CvdType): string {
  const linear = hexToLinearRgb(hex);

  if (type === 'achromatopsia') {
    const y = 0.2126729 * linear[0] + 0.7151522 * linear[1] + 0.072175 * linear[2];
    return linearRgbToHex([y, y, y]);
  }

  const matrix =
    type === 'protanopia' ? PROTAN_RGB : type === 'deuteranopia' ? DEUTAN_RGB : TRITAN_RGB;

  return linearRgbToHex(mulVec(matrix, linear));
}

export function simulateProtanopia(hex: string): string {
  return simulateColorBlindness(hex, 'protanopia');
}

export function simulateDeuteranopia(hex: string): string {
  return simulateColorBlindness(hex, 'deuteranopia');
}

export function simulateTritanopia(hex: string): string {
  return simulateColorBlindness(hex, 'tritanopia');
}

export function simulateAchromatopsia(hex: string): string {
  return simulateColorBlindness(hex, 'achromatopsia');
}

export function simulateAllColorBlindness(hex: string): ColorBlindnessSimulation {
  const original = normalizeHexColor(hex);
  return {
    original,
    protanopia: simulateProtanopia(original),
    deuteranopia: simulateDeuteranopia(original),
    tritanopia: simulateTritanopia(original),
    achromatopsia: simulateAchromatopsia(original),
  };
}
