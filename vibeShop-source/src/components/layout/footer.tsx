import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';

/**
 * Footer Component
 * - Dark luxury theme matching VERSPA design
 * - Premium feel with amber accents
 */

const footerLinks = {
  product: [
    { href: '/products', label: 'V-Series' },
    { href: '/categories', label: 'S-Series' },
    { href: '/new', label: 'X-Series' },
    { href: '/best', label: 'Accessories' },
  ],
  support: [
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
    { href: '/downloads', label: 'Downloads' },
    { href: '/refund', label: 'Warranty' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Gallery' },
    { href: '/careers', label: 'Distributors' },
    { href: '/press', label: 'Contact' },
  ],
};

const socialLinks = [
  { href: 'https://instagram.com/verspa', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/verspa', icon: Facebook, label: 'Facebook' },
  { href: 'https://linkedin.com/company/verspa', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hello@verspa.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-surface-dark">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-2xl sm:text-3xl font-black uppercase tracking-tight text-white hover:text-primary transition-colors"
            >
              VERSPA
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-sm">
              Redefining the salon experience with premium, ergonomic furniture designed for luxury and longevity.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="hidden md:block">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full border-t border-white/5 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © 2023 VERSPA International. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
