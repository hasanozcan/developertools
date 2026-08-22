export function convertMultiRadix(valueStr: string, fromRadix = 10): {
  binary: string;
  octal: string;
  decimal: string;
  hex: string;
} {
  const clean = valueStr.trim();
  const num = parseInt(clean, fromRadix);
  if (isNaN(num)) {
    return { binary: '0', octal: '0', decimal: '0', hex: '0' };
  }

  return {
    binary: (num >>> 0).toString(2),
    octal: (num >>> 0).toString(8),
    decimal: num.toString(10),
    hex: (num >>> 0).toString(16).toUpperCase(),
  };
}
