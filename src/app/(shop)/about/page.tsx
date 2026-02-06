/**
 * About Page - Neo-Brutalism Design
 * Shopping mall introduction page
 */

import { Store, Shield, Truck, Headphones, Star, Gift } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neo-cream">
      {/* Hero Section */}
      <section className="bg-neo-blue border-b-3 border-neo-black">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-4">
            About VERSPA STORE
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Digital products marketplace, providing better experiences
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase text-neo-black mb-6">
              Premium Digital Products
              <br />
              <span className="text-neo-pink">At Affordable Prices</span>
            </h2>
            <p className="text-lg text-neo-black/70 mb-6 leading-relaxed">
              VERSPA STORE is a specialized marketplace offering various digital products
              including templates, design assets, code snippets, and more. Instant download
              after purchase, and all products are registered through strict quality inspection.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neo-yellow text-neo-black border-3 border-neo-black shadow-neo font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all"
            >
              Browse Products
            </Link>
          </div>
          <div className="bg-neo-white border-3 border-neo-black shadow-neo-lg p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-neo-blue">500+</div>
                <div className="text-neo-black/70 font-bold mt-1">Digital Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-neo-pink">10K+</div>
                <div className="text-neo-black/70 font-bold mt-1">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-neo-purple">4.9</div>
                <div className="text-neo-black/70 font-bold mt-1">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-neo-lime">24H</div>
                <div className="text-neo-black/70 font-bold mt-1">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neo-yellow border-y-3 border-neo-black py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase text-neo-black text-center mb-12">
            Why VERSPA STORE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-neo-white border-3 border-neo-black shadow-neo p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all">
              <div className="w-14 h-14 flex items-center justify-center bg-neo-blue border-3 border-neo-black shadow-neo-sm mb-4">
                <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-neo-black mb-2">Secure Payments</h3>
              <p className="text-neo-black/70">
                Safe and fast payment system through Toss Payments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-neo-white border-3 border-neo-black shadow-neo p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all">
              <div className="w-14 h-14 flex items-center justify-center bg-neo-pink border-3 border-neo-black shadow-neo-sm mb-4">
                <Truck className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-neo-black mb-2">Instant Download</h3>
              <p className="text-neo-black/70">
                Download files immediately from the download center after payment completion.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-neo-white border-3 border-neo-black shadow-neo p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all">
              <div className="w-14 h-14 flex items-center justify-center bg-neo-lime border-3 border-neo-black shadow-neo-sm mb-4">
                <Headphones className="w-7 h-7 text-neo-black" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-neo-black mb-2">Friendly Support</h3>
              <p className="text-neo-black/70">
                Quick and friendly responses to product-related inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neo-white border-3 border-neo-black shadow-neo p-8 flex gap-6 items-start">
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-neo-purple border-3 border-neo-black shadow-neo-sm">
              <Star className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-black text-neo-black mb-2">Quality Guarantee</h3>
              <p className="text-neo-black/70">
                All products are registered through expert review.
                If you are not satisfied with the quality, we will refund you.
              </p>
            </div>
          </div>

          <div className="bg-neo-white border-3 border-neo-black shadow-neo p-8 flex gap-6 items-start">
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-neo-pink border-3 border-neo-black shadow-neo-sm">
              <Gift className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-black text-neo-black mb-2">Regular Discount Events</h3>
              <p className="text-neo-black/70">
                Various discount events and promotions every month.
                Get 10% off coupon for first purchase when you sign up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neo-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase text-white mb-4">
            Get Started Today
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join now and discover various digital products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neo-yellow text-neo-black border-3 border-neo-yellow font-bold uppercase tracking-wide hover:bg-neo-lime transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-3 border-white font-bold uppercase tracking-wide hover:bg-white hover:text-neo-black transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
