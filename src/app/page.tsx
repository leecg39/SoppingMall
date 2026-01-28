import Link from 'next/link';
import { ShoppingBag, Zap, Shield, Package, ArrowRight } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import Image from 'next/image';

/**
 * Home Page
 * - Elegant dark mode design inspired by Design folder
 * - Featured products from database
 */

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  product_images: { url: string; alt: string }[];
}

async function getFeaturedProducts() {
  const supabase = await createServerClient();

  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      price,
      discount_price,
      product_images (
        url,
        alt
      )
    `)
    .eq('is_featured', true)
    .eq('status', 'active')
    .limit(3);

  return products || [];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="w-full bg-[#0a0806] text-white">
      {/* Dark Hero Section */}
      <section className="relative w-full min-h-[600px] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a0806] border-b border-[#2a2520]">
        {/* Background with gradient overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(10, 8, 6, 0.7), rgba(10, 8, 6, 0.85)), url(/products/verspa-basic/KakaoTalk_20250103_173412595.jpg)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-40 flex flex-col items-center text-center gap-8">
          <span className="uppercase tracking-[0.2em] text-[#f59f0a] text-sm font-bold">
            The Future of Salon Luxury
          </span>

          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight max-w-4xl">
            Revolutionizing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Salon Comfort
            </span>
          </h1>

          <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Premium Massage Shampoo Chairs designed for the modern salon. Combine world-class relaxation with operational efficiency through whisper-quiet motors and ergonomic perfection.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Link
              href="/products"
              className="flex min-w-[160px] items-center justify-center gap-2 rounded-xl h-12 px-8 bg-[#f59f0a] text-[#181511] font-bold hover:bg-white transition-colors"
            >
              View Collection
            </Link>
            <Link
              href="/inquiries/new"
              className="flex min-w-[160px] items-center justify-center rounded-xl h-12 px-8 bg-transparent border border-white text-white font-bold hover:bg-white hover:text-[#181511] transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full bg-[#1a1612] py-8 border-b border-[#2a2520]">
        <div className="container mx-auto px-6 lg:px-40 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-white/40 text-sm font-medium uppercase tracking-widest whitespace-nowrap">
            Trusted by global leaders
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            <span className="text-xl font-serif text-white/60 font-bold">VOGUE</span>
            <span className="text-xl font-sans text-white/60 font-bold tracking-tighter">ELLE</span>
            <span className="text-xl font-serif text-white/60 font-bold italic">Harper's BAZAAR</span>
            <span className="text-xl font-sans text-white/60 font-bold">allure</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 lg:py-28 bg-[#0f0d0a] border-b border-[#2a2520]">
          <div className="container mx-auto px-6 lg:px-40">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
                  Our Masterpieces
                </h2>
                <p className="text-gray-400 max-w-md">
                  Engineered for durability, designed for luxury. Explore our range of professional equipment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: Product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-[#1a1612] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#2a2520]"
                >
                  {/* Product Image */}
                  <div className="aspect-[4/3] bg-[#0f0d0a] relative overflow-hidden">
                    {product.product_images[0] ? (
                      <Image
                        src={product.product_images[0].url}
                        alt={product.product_images[0].alt || product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0f0d0a]">
                        <Package className="w-16 h-16 text-white/20" strokeWidth={2} />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      {product.discount_price ? (
                        <>
                          <span className="text-2xl font-bold text-[#f59f0a]">
                            ${Math.round(2000 + ((product.discount_price % 1000) * 1.5)).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${Math.round(2000 + ((product.price % 1000) * 1.5)).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-[#f59f0a]">
                          ${Math.round(2000 + ((product.price % 1000) * 1.5)).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button className="w-full py-3 rounded-lg border border-white/20 hover:bg-white hover:text-[#181511] font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-white/20 text-white hover:bg-white hover:text-[#181511] transition-colors font-medium"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-[#1a1612] relative overflow-hidden border-b border-[#2a2520]">
        {/* Decorative bg pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(#f59f0a 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>

        <div className="container mx-auto px-6 lg:px-40 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Engineered for <br />
                <span className="text-[#f59f0a]">Excellence</span>
              </h2>
              <p className="text-lg text-gray-300">
                Experience the intersection of luxury and technology. Every VERSPA chair is a testament to rigorous engineering and aesthetic perfection.
              </p>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex gap-4">
                  <div className="shrink-0 size-12 rounded-xl bg-[#f59f0a]/10 flex items-center justify-center text-[#f59f0a]">
                    <Shield className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Ergonomic Contours</h4>
                    <p className="text-sm text-gray-400">
                      Designed to support the natural curve of the spine, ensuring client comfort even during long treatments.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4">
                  <div className="shrink-0 size-12 rounded-xl bg-[#f59f0a]/10 flex items-center justify-center text-[#f59f0a]">
                    <Zap className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Whisper-Quiet Motors</h4>
                    <p className="text-sm text-gray-400">
                      German-engineered motors that operate below 30dB, preserving the tranquility of your salon.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4">
                  <div className="shrink-0 size-12 rounded-xl bg-[#f59f0a]/10 flex items-center justify-center text-[#f59f0a]">
                    <Package className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Premium Materials</h4>
                    <p className="text-sm text-gray-400">
                      Stain-resistant, high-grade leather available in bespoke finishes to match your interior.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="mt-4 w-fit flex items-center gap-2 text-[#f59f0a] font-bold hover:gap-4 transition-all"
              >
                Learn about our technology
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                  <Image
                    src="/products/verspa-basic/KakaoTalk_20250103_173412595_01.jpg"
                    alt="VERSPA Product Detail"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#0f0d0a] flex items-center justify-center p-8 text-center">
                  <div>
                    <span className="text-5xl font-black text-[#f59f0a]">5<span className="text-2xl text-white">+</span></span>
                    <p className="text-white text-sm mt-2">Years Warranty on Motor</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#0f0d0a] flex items-center justify-center p-6 text-center">
                  <div>
                    <span className="text-5xl font-black text-[#f59f0a]">47<span className="text-2xl text-white">+</span></span>
                    <p className="text-white text-sm mt-2 font-bold">Premium Products</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                  <Image
                    src="/products/verspa-accessory/KakaoTalk_20250103_173412595_02.jpg"
                    alt="VERSPA Professional Use"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-12 bg-[#0f0d0a] border-b border-[#2a2520]">
        <div className="container mx-auto px-6 lg:px-40 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-white">Certified Quality</h4>
            <p className="text-sm text-gray-400 max-w-xs">
              Our products meet the highest international safety and durability standards.
            </p>
          </div>
          <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 mb-1 text-white" />
              <span className="text-xs font-bold text-white">ISO 9001</span>
            </div>
            <div className="flex flex-col items-center">
              <Package className="w-10 h-10 mb-1 text-white" />
              <span className="text-xs font-bold text-white">Eco Cert</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 mb-1 text-white" />
              <span className="text-xs font-bold text-white">UL Listed</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#f59f0a] relative overflow-hidden text-[#181511] border-b border-[#2a2520]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 lg:px-40 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Ready to Upgrade Your Salon?
          </h2>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto opacity-80">
            Join thousands of elite salons worldwide. Request a personalized quote today and discover the VERSPA difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/inquiries/new"
              className="w-full sm:w-auto px-8 py-4 bg-[#181511] text-white rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#181511] text-[#181511] rounded-xl font-bold text-lg hover:bg-[#181511]/10 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
