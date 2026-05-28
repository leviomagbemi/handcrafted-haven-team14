import { Libre_Caslon_Text, Inter } from 'next/font/google';

export const libreCaslonText = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-libre-caslon-text',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});
