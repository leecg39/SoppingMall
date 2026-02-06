import Link from 'next/link';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Zap,
    VolumeX,
    ShieldCheck,
    Globe2,
    Award,
    CheckCircle2
} from 'lucide-react';
import productsData from '@/data/products.json';
import galleryData from '@/data/gallery.json';
import ProductCard from '@/components/ProductCard';
import ImageGallery from '@/components/ImageGallery';
import { Product, GalleryItem } from '@/types';

export default function Home() {
    const products = productsData.products as Product[];
    const featuredProducts = products.filter(p => p.featured);
    const installations = galleryData.installations as GalleryItem[];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <header className="relative w-full min-h-[600px] lg:h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background with Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(24, 21, 17, 0.4), rgba(24, 21, 17, 0.8)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDB3hXQR5-pL0gcdvrTYnwc__uwOHaaRM9LGiiWAqZ-bAICyenKqUwWriFH3zb1h2o_pU_NoKpRxFnXP8iXziVcMMMdzSxD-SoFNsQViILXuJUf-16ziu28Fet6qicFgdFeaR1T_KjY2EHdt1eJhFD-CnUrUIwQ-BTTeEUtYvl13r4NGLQRZt2G01RSpzSxiR1f4MHCO2OhC39DupwnOinVPwxze8ZCs3P3uGuxpNS2d70GFyByQH8RIFnzsotfnYi_KyHjnUMISEw")'
                    }}
                ></div>

                <div className="relative z-10 container mx-auto px-6 lg:px-40 flex flex-col items-center text-center gap-8">
                    <span className="uppercase tracking-[0.2em] text-primary text-sm font-bold animate-fade-in">
                        The Future of Salon Luxury
                    </span>
                    <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight max-w-4xl">
                        Revolutionizing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/50 to-gray-400">
                            Salon Comfort
                        </span>
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                        Premium Massage Shampoo Chairs designed for the modern salon. Combine world-class relaxation with operational efficiency.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mt-4">
                        <Link
                            href="#products"
                            className="flex min-w-[160px] items-center justify-center rounded-xl h-12 px-6 bg-primary text-background-dark text-base font-bold hover:bg-white transition-all shadow-lg shadow-primary/20"
                        >
                            View Collection
                        </Link>
                        <Link
                            href="/contact"
                            className="flex min-w-[160px] items-center justify-center rounded-xl h-12 px-6 bg-transparent border border-white text-white text-base font-bold hover:bg-white hover:text-background-dark transition-all"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
                </div>
            </header>

            {/* Trusted By Section */}
            <section className="w-full bg-surface-dark py-8 border-y border-surface-dark/30">
                <div className="container mx-auto px-6 lg:px-40 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Trusted by global leaders</span>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                        <span className="text-xl font-serif text-white/60 font-bold">VOGUE</span>
                        <span className="text-xl font-sans text-white/60 font-bold tracking-tighter">ELLE</span>
                        <span className="text-xl font-serif text-white/60 font-bold italic">BAZAAR</span>
                        <span className="text-xl font-sans text-white/60 font-bold uppercase">Allure</span>
                    </div>
                </div>
            </section>

            {/* Product Highlight Section */}
            <section className="py-24 bg-background-dark" id="products">
                <div className="container mx-auto px-6 lg:px-40">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Our Masterpieces</h2>
                            <p className="text-white/40 max-w-md">Engineered for durability, designed for luxury. Explore our range of professional equipment.</p>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <button className="size-10 rounded-full border border-surface-dark flex items-center justify-center text-white/40 hover:bg-primary hover:border-primary hover:text-background-dark transition-all">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="size-10 rounded-full border border-surface-dark flex items-center justify-center text-white/40 hover:bg-primary hover:border-primary hover:text-background-dark transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-surface-dark relative overflow-hidden" id="features">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f59e0b 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
                <div className="container mx-auto px-6 lg:px-40 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="flex flex-col gap-8">
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                                Engineered for <br />
                                <span className="text-primary">Excellence</span>
                            </h2>
                            <p className="text-lg text-white/60">
                                Experience the intersection of luxury and technology. Every VERSPA chair is a testament to rigorous engineering and aesthetic perfection.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { icon: <Zap />, title: 'Ergonomic Contours', desc: 'Designed to support the natural curve of the spine, ensuring client comfort.' },
                                    { icon: <VolumeX />, title: 'Whisper-Quiet Motors', desc: 'German-engineered motors that operate below 30dB, preserving salon tranquility.' },
                                    { icon: <ShieldCheck />, title: 'Premium Materials', desc: 'Stain-resistant, high-grade leather with bespoke finishes.' },
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex gap-5">
                                        <div className="shrink-0 size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-1 text-white">{feature.title}</h4>
                                            <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/technology" className="mt-4 w-fit flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                                Learn about our technology <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 translate-y-12">
                                    <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
                                        <img src="/images/features/bearing.jpg" className="w-full h-full object-cover" alt="Bearing Detail" />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden aspect-square shadow-xl bg-primary/10 flex items-center justify-center p-8">
                                        <div className="text-center">
                                            <span className="text-5xl font-black text-primary italic">5Y</span>
                                            <p className="text-white/60 text-xs mt-2 font-bold uppercase tracking-widest">Motor Warranty</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="rounded-2xl overflow-hidden aspect-square shadow-xl">
                                        <img src="/images/features/leather.jpg" className="w-full h-full object-cover" alt="Leather Detail" />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
                                        <img src="/images/features/woman.jpg.jpg" className="w-full h-full object-cover" alt="Woman Relaxing" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installation Gallery Section */}
            <section className="py-24 bg-background-dark" id="gallery">
                <div className="container mx-auto px-6 lg:px-40 flex flex-col items-center">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3 block">Global Installations</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">Elevating Spaces Worldwide</h2>
                    </div>
                    <ImageGallery items={installations} products={products} />

                    <div className="mt-16">
                        <Link
                            href="/gallery"
                            className="px-10 py-4 rounded-xl border border-surface-dark text-white hover:bg-white hover:text-background-dark transition-all font-bold"
                        >
                            View Full Gallery
                        </Link>
                    </div>
                </div>
            </section>

            {/* Certification Section */}
            <section className="py-16 bg-surface-dark/50 border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-40 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col gap-3 text-center lg:text-left">
                        <h4 className="text-2xl font-bold text-white tracking-tight">Certified Quality</h4>
                        <p className="text-white/40 max-w-sm">Our products meet the highest international safety and durability standards.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 lg:gap-16 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                        {[
                            { icon: <ShieldCheck size={40} />, label: 'ISO 9001' },
                            { icon: <Globe2 size={40} />, label: 'Eco Cert' },
                            { icon: <Award size={40} />, label: 'UL Listed' },
                        ].map((cert, k) => (
                            <div key={k} className="flex flex-col items-center gap-3">
                                <div className="text-primary">{cert.icon}</div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">{cert.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-28 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="absolute -top-24 -left-24 size-64 bg-white/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 size-64 bg-background-dark/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 lg:px-40 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-background-dark">
                        Ready to Upgrade <br />Your Salon?
                    </h2>
                    <p className="text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto text-background-dark/80">
                        Join thousands of elite salons worldwide. Request a personalized quote today and discover the VERSPA difference.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-10 py-5 bg-background-dark text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            href="/pdfs/verspa-catalog.pdf.PDF"
                            className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-background-dark text-background-dark rounded-2xl font-bold text-lg hover:bg-background-dark/5 transition-all text-center"
                        >
                            Download Catalog
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
