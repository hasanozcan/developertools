import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import nesting from 'tailwindcss/nesting';
import { describe, expect, it } from 'vitest';

// The scoped selector-parser 7.1.6 security override changes insertion during
// iteration. Exercise Tailwind 3's selector mutations and postcss-nested's '&'
// expansion rather than checking only the installed version number.
describe('CSS dependency compatibility', () => {
  it('preserves compound, arbitrary, responsive and pseudo-element variants', async () => {
    const classes = [
      'group-hover:focus:text-blue-500',
      'peer-checked:before:block',
      '[&>a:hover]:underline',
      'dark:hover:bg-blue-500',
      'sm:grid-cols-2',
      'w-[calc(100%-2rem)]',
      'data-[state=open]:block',
    ].join(' ');
    const result = await postcss([
      tailwindcss({
        content: [{ raw: `<div class="${classes}"></div>`, extension: 'html' }],
        darkMode: 'class',
      }),
    ]).process('@tailwind utilities; .button { @apply hover:bg-blue-500 focus:ring-2; }', {
      from: undefined,
    });
    const declarations = new Map<string, Record<string, string>>();
    result.root.walkRules((rule) => {
      const values: Record<string, string> = {};
      rule.walkDecls((declaration) => {
        values[declaration.prop] = declaration.value;
      });
      declarations.set(rule.selector, values);
    });

    expect(
      declarations.get(String.raw`.group:hover .group-hover\:focus\:text-blue-500:focus`),
    ).toMatchObject({ color: 'rgb(59 130 246 / var(--tw-text-opacity, 1))' });
    expect(
      declarations.get(String.raw`.peer:checked ~ .peer-checked\:before\:block::before`),
    ).toMatchObject({ content: 'var(--tw-content)', display: 'block' });
    expect(declarations.get(String.raw`.\[\&\>a\:hover\]\:underline>a:hover`)).toMatchObject({
      'text-decoration-line': 'underline',
    });
    expect(declarations.get(String.raw`.dark\:hover\:bg-blue-500:hover:is(.dark *)`)).toMatchObject(
      { 'background-color': 'rgb(59 130 246 / var(--tw-bg-opacity, 1))' },
    );
    expect(declarations.get(String.raw`.sm\:grid-cols-2`)).toMatchObject({
      'grid-template-columns': 'repeat(2, minmax(0, 1fr))',
    });
    expect(declarations.get(String.raw`.w-\[calc\(100\%-2rem\)\]`)).toMatchObject({
      width: 'calc(100% - 2rem)',
    });
    expect(
      declarations.get(String.raw`.data-\[state\=open\]\:block[data-state="open"]`),
    ).toMatchObject({ display: 'block' });
    expect(declarations.get('.button:hover')).toMatchObject({
      'background-color': 'rgb(59 130 246 / var(--tw-bg-opacity, 1))',
    });
    expect(declarations.get('.button:focus')?.['box-shadow']).toContain('var(--tw-ring-shadow)');
    expect(result.css).toContain('@media (min-width: 640px)');
  });

  it('preserves ampersands, selector lists and nested media rules', async () => {
    const result = await postcss([nesting()]).process(
      '.parent, .second { &:hover, &:focus { color: red } & > :is(a, button) { display: block } @media (min-width: 640px) { & .child { color: blue } } }',
      { from: undefined },
    );

    expect(result.css).toBe(
      '.parent:hover, .parent:focus, .second:hover, .second:focus { color: red } .parent > :is(a, button), .second > :is(a, button) { display: block } @media (min-width: 640px) { .parent .child, .second .child { color: blue } }',
    );
  });
});
