import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wood Splitter — Excavator-Mounted Log Splitters',
  description: 'BOWS 20: The safest and fastest excavator-mounted hydraulic log splitter. Engineered in Slovenia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
