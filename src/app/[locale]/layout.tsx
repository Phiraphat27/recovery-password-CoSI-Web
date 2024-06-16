import type { Metadata } from "next";
import { Noto_Sans_Thai_Looped } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import Auth from "@/components/Auth";

// const inter = Inter({ subsets: ["latin"] });
const NotoSansThai = Noto_Sans_Thai_Looped({ weight: ['100', '200', '300', '400', '500', '600', '700', '800'], subsets: ["latin", "thai"] });

export const metadata: Metadata = {
  title: 'CoSI Lab | Members',
  description: 'Website description',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/Icon_Gray.png',
        href: '/images/Icon_Gray.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/Icon_Light.png',
        href: '/images/Icon_Light.png',
      },
    ],
  },
};


export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Auth />
      <NextIntlClientProvider messages={messages}>
        <body className={NotoSansThai.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
