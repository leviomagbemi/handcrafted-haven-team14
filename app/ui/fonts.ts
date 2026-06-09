import { Poppins, Inter } from 'next/font/google';

export const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});
