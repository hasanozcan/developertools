export function generateTestCard(brand: 'visa' | 'mastercard' | 'amex' = 'visa'): { number: string; exp: string; cvv: string; brand: string } {
  let prefix = '4532';
  if (brand === 'mastercard') prefix = '5425';
  if (brand === 'amex') prefix = '3782';

  let num = prefix;
  while (num.length < 15) {
    num += Math.floor(Math.random() * 10);
  }

  // Calculate Luhn checksum digit
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    let digit = parseInt(num[num.length - 1 - i], 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  num += checkDigit;

  return { number: num, exp: '12/28', cvv: brand === 'amex' ? '1234' : '123', brand };
}
