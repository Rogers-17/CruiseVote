import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const poppins = localFont({
  src: [
    {
      path: '../assets/fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'ClipCast',
  description:
    'ClipCast is a renowed Video Streaming Platform designed to watch videos, stream and also upload videos, insipred by YOUTUBE, it a great tool for content creator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Analytics debug={false} />
      </body>
    </html>
  );
}
