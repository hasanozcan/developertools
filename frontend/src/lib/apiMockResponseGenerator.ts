export type MockDatasetType = 'users' | 'products' | 'orders' | 'posts' | 'transactions';

export interface MockOptions {
  type: MockDatasetType;
  count: number;
  statusCode?: number;
  includePagination?: boolean;
  page?: number;
  perPage?: number;
}

const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Sam', 'Casey', 'Riley', 'Jamie', 'Avery', 'Dakota'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor'];
const CITIES = ['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Toronto', 'Sydney', 'Paris', 'Amsterdam', 'Singapore'];
const DOMAINS = ['gmail.com', 'outlook.com', 'apple.com', 'github.com', 'dev.co'];

const PRODUCT_NAMES = [
  'Ergonomic Mechanical Keyboard', 'Wireless Noise-Canceling Headphones', 'Ultra-Wide 4K Gaming Monitor',
  'USB-C Multiport Docking Station', 'Smart Ergonomic Office Chair', 'Anodized Aluminum Laptop Stand',
  'High-Speed NVMe M.2 SSD 2TB', 'Smart LED Desk Lamp', 'Magnetic Wireless Charging Pad', 'Waterproof Tech Backpack'
];
const CATEGORIES = ['Electronics', 'Office Equipment', 'Accessories', 'Audio', 'Storage', 'Furniture'];

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function generateMockData(options: MockOptions): Record<string, any> {
  const { type, count = 10, statusCode = 200, includePagination = true, page = 1, perPage = count } = options;
  const items: any[] = [];

  for (let i = 1; i <= count; i++) {
    const seed = i * 13 + type.length;
    const rnd1 = Math.floor(pseudoRandom(seed) * 10);
    const rnd2 = Math.floor(pseudoRandom(seed + 1) * 10);

    if (type === 'users') {
      const firstName = FIRST_NAMES[rnd1 % FIRST_NAMES.length];
      const lastName = LAST_NAMES[rnd2 % LAST_NAMES.length];
      items.push({
        id: 'usr_' + (1000 + i).toString(36),
        firstName,
        lastName,
        email: firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@' + DOMAINS[rnd1 % DOMAINS.length],
        role: i === 1 ? 'ADMIN' : 'USER',
        status: i % 5 === 0 ? 'inactive' : 'active',
        location: {
          city: CITIES[rnd2 % CITIES.length],
          country: 'United States',
        },
        createdAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
      });
    } else if (type === 'products') {
      const name = PRODUCT_NAMES[(i - 1) % PRODUCT_NAMES.length];
      const price = parseFloat((29.99 + pseudoRandom(seed) * 450).toFixed(2));
      items.push({
        id: 'prod_' + (5000 + i).toString(36),
        title: name,
        category: CATEGORIES[rnd1 % CATEGORIES.length],
        price,
        currency: 'USD',
        stock: Math.floor(pseudoRandom(seed + 2) * 120) + 5,
        rating: parseFloat((3.5 + pseudoRandom(seed + 3) * 1.5).toFixed(1)),
        isFeatured: i <= 2,
      });
    } else if (type === 'orders') {
      items.push({
        id: 'ord_' + (90000 + i).toString(36).toUpperCase(),
        userId: 'usr_' + (1000 + (i % 5) + 1).toString(36),
        totalAmount: parseFloat((49.99 + pseudoRandom(seed) * 300).toFixed(2)),
        currency: 'USD',
        status: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'][(i - 1) % 4],
        itemCount: (i % 4) + 1,
        createdAt: new Date(Date.now() - i * 3600000 * 12).toISOString(),
      });
    } else if (type === 'posts') {
      items.push({
        id: 'post_' + i,
        title: 'Top ' + (i + 5) + ' Architectural Patterns for Modern Web Applications',
        slug: 'top-' + (i + 5) + '-architectural-patterns-modern-web',
        authorId: 'usr_' + (1000 + (i % 3) + 1).toString(36),
        tags: ['architecture', 'javascript', 'devops', 'typescript'].slice(0, (i % 3) + 1),
        views: Math.floor(pseudoRandom(seed) * 5000) + 150,
        published: true,
        publishedAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
      });
    } else {
      items.push({
        id: 'tx_' + (700000 + i).toString(36),
        amount: parseFloat((10.0 + pseudoRandom(seed) * 990).toFixed(2)),
        fee: 0.35,
        currency: 'USD',
        type: i % 2 === 0 ? 'PAYMENT' : 'REFUND',
        status: 'SUCCEEDED',
        timestamp: Date.now() - i * 600000,
      });
    }
  }

  if (!includePagination) {
    return {
      status: statusCode,
      data: items,
    };
  }

  return {
    status: statusCode,
    page,
    perPage,
    totalCount: count * 4,
    totalPages: 4,
    hasMore: page < 4,
    data: items,
  };
}
