import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    Star,
    ArrowRight,
    Download,
    CheckCircle2,
    Zap,
    VolumeX,
    ShieldCheck,
    Sparkles,
    ChevronLeft
} from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import DownloadButton from '@/components/DownloadButton';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return productsData.products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetail({ params }: PageProps) {
    const { id } = await params;
    const product = productsData.products.find((p) => p.id === id) as Product | undefined;

    if (!product) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen bg-background-dark text-white">
            {/* Back Button */}
            <div className="container mx-auto px-6 lg:px-40 pt-24 pb-4">
                <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm font-medium">
                    <ChevronLeft size={16} />
                    Back to Collection
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative w-full py-12 px-6 lg:px-40">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-surface-dark shadow-2xl border border-white/5 group">
                                <img
                                    src={product.images.hero}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent"></div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 w-fit">
                                <Star size={14} className="text-primary fill-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.badge || 'Premium Model'}</span>
                            </div>

                            <div>
                                <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-xl text-white/60 font-light leading-relaxed max-w-xl italic">
                                    "{product.tagline}"
                                </p>
                                <p className="text-lg text-white/40 mt-6 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 border-l-4 border-primary pl-6 py-2">
                                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Purchase Inquiry</p>
                                <p className="text-3xl font-black text-white">Starting from $2,499</p>
                                <p className="text-white/30 text-sm">Trade pricing & bulk orders available worldwide</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Link
                                    href="/contact"
                                    className="h-14 px-10 bg-primary hover:bg-white text-background-dark font-black rounded-2xl transition-all flex items-center justify-center gap-3 min-w-[200px] shadow-lg shadow-primary/20"
                                >
                                    Request Quote
                                    <ArrowRight size={20} />
                                </Link>
                                <button className="h-14 px-10 bg-transparent border border-white/10 hover:border-white text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 min-w-[200px] group">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="w-full bg-surface-dark/30 py-24 px-6 lg:px-40 border-y border-white/5">
                <div className="container mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Engineered for Perfection</h2>
                        <p className="text-white/40 text-lg max-w-2xl">Crafted to enhance professional workflow while providing unmatched therapeutic comfort.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap />, title: 'Ergonomic Excellence', desc: 'Contours perfectly to support natural spinal alignment during long sessions.' },
                            { icon: <VolumeX />, title: 'Whisper-Silent Operation', desc: 'Motors designed to maintain tranquility below 30dB for a true spa experience.' },
                            { icon: <ShieldCheck />, title: 'Advanced Safety', desc: 'Multiple sensors for real-time monitoring and automated protection systems.' }
                        ].map((f, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-background-dark/50 border border-white/5 hover:border-primary/30 transition-all">
                                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                                <p className="text-white/40 leading-relaxed italic">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specifications & Downloads */}
            <section className="w-full py-24 px-6 lg:px-40">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Specs Table */}
                        <div className="lg:w-2/3">
                            <h2 className="text-3xl font-bold mb-10">Technical Specifications</h2>
                            <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface-dark/20">
                                <table className="w-full text-left border-collapse">
                                    <tbody>
                                        {Object.entries(product.specs).map(([key, value], idx) => (
                                            <tr key={key} className={`border-b border-white/5 last:border-0 ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                                                <td className="p-5 text-white/40 font-medium uppercase text-xs tracking-widest w-1/3">{key}</td>
                                                <td className="p-5 text-white font-medium">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Downloads Side */}
                        <div className="lg:w-1/3">
                            <div className="bg-surface-dark/50 p-8 rounded-3xl border border-white/10 sticky top-24">
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles className="text-primary" />
                                    <h3 className="text-xl font-bold">Resources</h3>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <DownloadButton
                                        label="Technical Brochure (PDF)"
                                        href={product.pdfCatalog}
                                        type="brochure"
                                    />
                                    <DownloadButton
                                        label="Installation Guide"
                                        href="#"
                                        type="guide"
                                    />
                                </div>
                                <p className="mt-8 text-xs text-white/30 text-center">
                                    Available in EN, KR, JP versions. <br />Contact support for CAD files.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
