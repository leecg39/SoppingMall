import Link from 'next/link';
import { ShoppingBag, Zap, Shield, Package, ArrowRight, VolumeX, ShieldCheck, Globe2, Award } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import Image from 'next/image';

/**
 * Home Page
 * - VERSPA design from GitHub repository
 * - Featured products from database
 */

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  product_images: { url: string; alt: string | null }[];
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
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <header className="relative w-full min-h-[600px] lg:h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: 'linear-gradient(rgba(30, 35, 40, 0.65), rgba(20, 25, 30, 0.85)), url(/products/verspa-basic/20220331 컴헤어(연출)-0577.jpg)'
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-40 flex flex-col items-center text-center gap-8">
          <span className="uppercase tracking-[0.2em] text-primary text-sm font-bold animate-fade-in drop-shadow-lg">
            The Future of Salon Luxury
          </span>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight max-w-4xl drop-shadow-2xl">
            Revolutionizing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/50 to-gray-400">
              Salon Comfort
            </span>
          </h1>
          <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-lg">
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
              href="/inquiries/new"
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
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-background-dark" id="products">
          <div className="container mx-auto px-6 lg:px-40">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Our Masterpieces</h2>
              <p className="text-white/40 max-w-2xl mx-auto">Engineered for durability, designed for luxury. Explore our range of professional equipment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: Product, index: number) => {
                const badges = ['판매 1위', '신기술', '액세서리'];
                return (
                  <div
                    key={product.id}
                    className="bg-white/5 border border-white/10 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 flex flex-col rounded-2xl overflow-hidden"
                  >
                    {/* Badge */}
                    <div className="bg-primary text-background-dark px-4 py-2 text-xs font-black uppercase tracking-wider text-center">
                      {badges[index % 3]}
                    </div>

                    {/* Product Image */}
                    <div className="aspect-[4/3] bg-background-dark relative overflow-hidden">
                      {product.product_images[0] ? (
                        <Image
                          src={product.product_images[0].url}
                          alt={product.product_images[0].alt || product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-16 h-16 text-white/20" strokeWidth={2} />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-black text-white mb-3 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Features List */}
                      <ul className="text-sm text-white/60 space-y-2 mb-6 flex-1">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Premium ergonomic design</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Whisper-quiet operation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>5-year warranty included</span>
                        </li>
                      </ul>

                      {/* Price */}
                      <div className="flex items-baseline gap-3 mb-6">
                        {product.discount_price ? (
                          <>
                            <span className="text-2xl font-black text-primary">
                              ${Math.round(2000 + ((product.discount_price % 1000) * 1.5)).toLocaleString()}
                            </span>
                            <span className="text-sm text-white/40 line-through">
                              ${Math.round(2000 + ((product.price % 1000) * 1.5)).toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-black text-primary">
                            ${Math.round(2000 + ((product.price % 1000) * 1.5)).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 py-3 text-center bg-primary text-background-dark font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 rounded-xl"
                        >
                          View Details
                        </Link>
                        <Link
                          href="/inquiries/new"
                          className="flex-1 py-3 text-center bg-transparent border border-primary text-primary font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-background-dark transition-all duration-300 rounded-xl"
                        >
                          Inquiry
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Product Specifications Section */}
      <section className="py-20 bg-background-dark border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-40">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                Innovation in Every Detail
              </h2>
              <p className="text-white/40">
                Cutting-edge technology meets premium craftsmanship
              </p>
            </div>

            {/* Specification Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Premium Design */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all">
                <div className="aspect-square bg-surface-dark rounded-xl mb-4 overflow-hidden relative">
                  <Image
                    src="/products/brand-info/verspa_5.jpg"
                    alt="Premium Materials Technology"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-black">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">
                      Premium Materials
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      High-grade stainless steel and premium leather upholstery designed for lasting luxury and easy maintenance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Color Options */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all">
                <div className="aspect-square bg-surface-dark rounded-xl mb-4 overflow-hidden relative">
                  <Image
                    src="/products/brand-info/verspa_6.jpg"
                    alt="Custom Color Technology"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-black">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">
                      Custom Colors
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Choose from desert brown, ivory, and custom color options to match your salon's aesthetic perfectly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Professional Setup */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all">
                <div className="aspect-square bg-surface-dark rounded-xl mb-4 overflow-hidden relative">
                  <Image
                    src="/products/brand-info/verspa_brand_3.jpg"
                    alt="Expert Installation Technology"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-black">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">
                      Expert Installation
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Professional installation service included. Our technicians ensure perfect setup and full functionality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-white">
                  All components backed by our comprehensive warranty
                </span>
              </div>
            </div>
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

              <Link href="/about" className="mt-4 w-fit flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                Learn about our technology <ArrowRight size={18} />
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-12">
                  <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-surface-dark">
                    <Image
                      src="/products/verspa-basic/20220331 컴헤어(연출)-0517.jpg"
                      alt="VERSPA Product Detail"
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-xl bg-primary/10 flex items-center justify-center p-8">
                    <div className="text-center">
                      <span className="text-5xl font-black text-primary italic">5Y</span>
                      <p className="text-white/60 text-xs mt-2 font-bold uppercase tracking-widest">Motor Warranty</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-xl border border-surface-dark">
                    <Image
                      src="/products/verspa-accessory/KakaoTalk_20221129_153440639_02.jpg"
                      alt="VERSPA Leather Detail"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-surface-dark">
                    <Image
                      src="/products/verspa-basic/20220331 컴헤어(연출)-0567.jpg"
                      alt="VERSPA in Use"
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
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
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #181511 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
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
              href="/inquiries/new"
              className="w-full sm:w-auto px-10 py-5 bg-background-dark text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-background-dark text-background-dark rounded-2xl font-bold text-lg hover:bg-background-dark/5 transition-all text-center"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
