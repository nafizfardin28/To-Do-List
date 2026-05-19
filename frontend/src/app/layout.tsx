import './global.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'A simple To-Do application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

