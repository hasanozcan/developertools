export type MockDataType = 'users' | 'products' | 'orders' | 'companies' | 'posts';

const FIRST_NAMES = ['Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'James', 'Sophia', 'Daniel', 'Emily', 'Liam', 'Mia', 'Lucas', 'Ava', 'Ethan', 'Isabella'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin'];
const DOMAINS = ['example.com', 'mail.org', 'techcorp.io', 'devhub.net', 'cloudpulse.app'];
const CITIES = ['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Toronto', 'Sydney', 'Paris', 'Amsterdam', 'Singapore', 'Austin', 'Zurich'];
const COUNTRIES = ['United States', 'United Kingdom', 'Germany', 'Japan', 'Canada', 'Australia', 'France', 'Netherlands', 'Singapore', 'Switzerland'];
const ROLES = ['Software Engineer', 'Product Manager', 'UX Designer', 'DevOps Lead', 'Data Scientist', 'QA Engineer', 'Technical Writer'];
const PRODUCT_NAMES = ['Wireless Noise-Cancelling Headphones', 'Ultra-Wide Curved Gaming Monitor', 'Mechanical RGB Keyboard', 'Ergonomic Desk Chair', '4K USB-C Webcam', 'Smart Fitness Tracker', 'Portable SSD 2TB', 'Anodized Aluminum Laptop Stand'];
const CATEGORIES = ['Electronics', 'Office Supplies', 'Audio', 'Peripherals', 'Storage', 'Accessories'];
const COMPANY_NAMES = ['Apex Technologies', 'Nexus Cloud Solutions', 'Starlight Data', 'Quantum Logic', 'Horizon Media', 'Pulse Dynamics', 'CyberScale', 'Zenith AI'];
const POST_TITLES = [
  '10 Tips for High-Performance Web Applications',
  'Mastering TypeScript Generics in Modern Frameworks',
  'Why Zero-Trust Security Matters in 2026',
  'A Comprehensive Guide to Client-Side Encryption',
  'Designing Accessible UI Components with WCAG 2.2',
  'The Future of Edge Computing and Serverless Workloads',
];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMockData(type: MockDataType, count: number = 10): Record<string, any>[] {
  const safeCount = Math.max(1, Math.min(100, Math.floor(count)));
  const result: Record<string, any>[] = [];

  for (let i = 1; i <= safeCount; i++) {
    if (type === 'users') {
      const firstName = pick(FIRST_NAMES);
      const lastName = pick(LAST_NAMES);
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randInt(10, 99)}@${pick(DOMAINS)}`;
      result.push({
        id: i,
        firstName,
        lastName,
        email,
        phone: `+1 (${randInt(200, 999)}) ${randInt(100, 999)}-${randInt(1000, 9999)}`,
        role: pick(ROLES),
        isActive: Math.random() > 0.15,
        location: {
          city: pick(CITIES),
          country: pick(COUNTRIES),
        },
        createdAt: new Date(Date.now() - randInt(1, 365) * 86400000).toISOString(),
      });
    } else if (type === 'products') {
      const title = pick(PRODUCT_NAMES);
      const price = parseFloat((randInt(19, 499) + Math.random()).toFixed(2));
      result.push({
        id: i,
        sku: `SKU-${randInt(1000, 9999)}-${String.fromCharCode(65 + randInt(0, 25))}`,
        title,
        category: pick(CATEGORIES),
        price,
        inStock: randInt(0, 150),
        rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        isFeatured: Math.random() > 0.7,
      });
    } else if (type === 'orders') {
      const totalAmount = parseFloat((randInt(45, 1250) + Math.random()).toFixed(2));
      result.push({
        id: `ORD-${randInt(10000, 99999)}`,
        customer: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
        total: totalAmount,
        currency: 'USD',
        status: pick(['completed', 'pending', 'processing', 'shipped']),
        itemCount: randInt(1, 8),
        paymentMethod: pick(['credit_card', 'apple_pay', 'paypal', 'crypto']),
        timestamp: new Date(Date.now() - randInt(1, 60) * 86400000).toISOString(),
      });
    } else if (type === 'companies') {
      const name = pick(COMPANY_NAMES);
      result.push({
        id: i,
        name,
        domain: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        industry: pick(['SaaS', 'Cloud Infrastructure', 'FinTech', 'E-commerce', 'AI Research']),
        headquarters: `${pick(CITIES)}, ${pick(COUNTRIES)}`,
        employees: randInt(20, 5000),
        revenueArr: `$${randInt(2, 50)}M`,
      });
    } else if (type === 'posts') {
      result.push({
        id: i,
        title: pick(POST_TITLES),
        author: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
        views: randInt(250, 45000),
        likes: randInt(10, 3200),
        published: true,
        tags: [pick(['javascript', 'react', 'performance', 'security', 'devops', 'css'])],
        publishedAt: new Date(Date.now() - randInt(1, 180) * 86400000).toISOString(),
      });
    }
  }

  return result;
}
