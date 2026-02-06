import productsData from '@/data/products.json';
import galleryData from '@/data/gallery.json';
import ImageGallery from '@/components/ImageGallery';
import { Product, GalleryItem } from '@/types';

export default function GalleryPage() {
    const products = productsData.products as Product[];
    const installations = galleryData.installations as GalleryItem[];

    return (
        <div className="flex flex-col min-h-screen bg-background-dark">
            {/* Page Hero */}
            <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-10 pt-32 pb-16">
                <div className="flex flex-col gap-6 max-w-3xl">
                    <div className="h-1 w-12 bg-primary rounded-full"></div>
                    <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                        Global Installations
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                        Witness the integration of luxury and ergonomics in salons worldwide.
                        Explore how top-tier establishments are redefining the client experience with VERSPA.
                    </p>
                </div>
            </section>

            {/* Gallery with Filters (Handled by component) */}
            <section className="w-full pb-24">
                <ImageGallery items={installations} products={products} />
            </section>

            {/* Bottom CTA */}
            <section className="w-full py-20 px-6 bg-surface-dark border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Want to be featured?</h2>
                    <p className="text-white/40 mb-10">
                        Showcase your salon's transformation. Send us your high-quality installation photos
                        and join our global network of elite salons.
                    </p>
                    <button className="px-10 py-4 bg-primary text-background-dark font-black rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/20">
                        Contact Marketing Team
                    </button>
                </div>
            </section>
        </div>
    );
}
