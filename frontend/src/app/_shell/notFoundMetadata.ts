import type { Metadata } from 'next';

export const notFoundMetadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for does not exist. Browse free online developer tools instead.',
  robots: { index: false, follow: true },
  alternates: null,
};
