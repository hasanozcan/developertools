const TAILWIND_ORDER_CATEGORIES: { prefix: RegExp; weight: number }[] = [
  { prefix: /^(block|inline|flex|grid|hidden|table)/, weight: 10 },
  { prefix: /^(absolute|relative|fixed|sticky)/, weight: 20 },
  { prefix: /^(top|right|bottom|left|inset|z-)/, weight: 30 },
  { prefix: /^(flex-|grid-|justify-|items-|content-|self-|order-|gap-)/, weight: 40 },
  { prefix: /^(w-|min-w-|max-w-|h-|min-h-|max-h-)/, weight: 50 },
  { prefix: /^(p-|px-|py-|pt-|pr-|pb-|pl-)/, weight: 60 },
  { prefix: /^(m-|mx-|my-|mt-|mr-|mb-|ml-)/, weight: 70 },
  { prefix: /^(text-|font-|leading-|tracking-|uppercase|lowercase|capitalize)/, weight: 80 },
  { prefix: /^(bg-|from-|via-|to-)/, weight: 90 },
  { prefix: /^(border|rounded|ring|outline)/, weight: 100 },
  { prefix: /^(shadow|opacity|blur)/, weight: 110 },
  { prefix: /^(transition|duration|ease|animate)/, weight: 120 },
];

function getClassWeight(cls: string): number {
  const base = cls.replace(/^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|dark:)+/, '');
  for (const cat of TAILWIND_ORDER_CATEGORIES) {
    if (cat.prefix.test(base)) return cat.weight;
  }
  return 200;
}

export function sortTailwindClasses(classString: string): string {
  const classes = classString.trim().split(/\s+/).filter(Boolean);
  if (classes.length <= 1) return classString.trim();

  // Deduplicate
  const unique = Array.from(new Set(classes));

  unique.sort((a, b) => {
    const weightA = getClassWeight(a);
    const weightB = getClassWeight(b);
    if (weightA !== weightB) return weightA - weightB;
    return a.localeCompare(b);
  });

  return unique.join(' ');
}
