import './globals.css';
import type { Metadata } from 'next';
import { Readex_Pro } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { Header, Footer } from '@/components';
import { cn } from '@/lib/utils';

import site from '@/site/site.json';

const readexPro = Readex_Pro({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: site.title,
    description: site.description,
};

// 👇🏼 This is the app's entry point. It is not a page, but a layout that wraps all pages. 👇🏼
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn('text-zinc-50 bg-[#111010]', readexPro.className)}>
            <head>
                {/* favicon */}
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />

                {/* TODO: finish head metadata 👇🏼 */}
            </head>
            <body className="max-w-2xl mx-auto antialiased custom-transition">
                <Toaster position="top-right" />
                <div className="grid grid-rows-[auto_1fr_auto] min-h-screen gap-12 mt-8 mx-4">
                    <Header />
                    <main className="">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
