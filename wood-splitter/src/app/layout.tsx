import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wood Splitter — BOWS 20',
  description: 'The safest, fastest excavator-mounted log splitter.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
