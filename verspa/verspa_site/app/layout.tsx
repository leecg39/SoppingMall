import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const viewport: Viewport = {
    themeColor: '#181511',
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: 'VERSPA International | Luxury Salon Equipment',
        template: '%s | VERSPA International'
    },
    description: 'Global leader in premium massage shampoo chairs and salon furniture. Discover the intersection of luxury, ergonomics, and technology.',
    keywords: ['shampoo chair', 'massage chair', 'salon equipment', 'luxury hair salon', 'VERSPA', 'head spa'],
    authors: [{ name: 'VERSPA International' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://verspa-international.com',
        siteName: 'VERSPA',
        title: 'VERSPA International | Premium Salon Solutions',
        description: 'Revolutionizing salon comfort with world-class massage technology.',
        images: ['/og-image.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'VERSPA International',
        description: 'Luxury Salon Equipment & Technology',
        images: ['/twitter-image.jpg'],
    },
    robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <head>
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-R2C2VG9GKQ" strategy="afterInteractive" />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-R2C2VG9GKQ');
                    `}
                </Script>
            </head>
            <body className={`${inter.variable} font-sans antialiased bg-background-dark text-white selection:bg-primary selection:text-background-dark flex flex-col min-h-screen`}>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
