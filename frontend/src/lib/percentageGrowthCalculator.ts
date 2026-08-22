export function calculateGrowth(
  oldValue: number,
  newValue: number,
): {
  percentageChange: number;
  formatted: string;
  isIncrease: boolean;
} {
  if (oldValue === 0) {
    return { percentageChange: 0, formatted: '0%', isIncrease: true };
  }

  const change = ((newValue - oldValue) / oldValue) * 100;
  return {
    percentageChange: change,
    formatted: (change > 0 ? '+' : '') + change.toFixed(2) + '%',
    isIncrease: change >= 0,
  };
}
