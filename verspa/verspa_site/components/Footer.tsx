import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#0c0a08] text-white pt-20 pb-10 border-t border-surface-dark/30">
            <div className="container mx-auto px-6 lg:px-40">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand and Social */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/images/logo.png" alt="VERSPA Logo" className="h-6 w-auto" />
                            <h2 className="text-2xl font-bold tracking-tight text-white">VERSPA</h2>
                        </div>
                        <p className="text-white/60 mb-8 max-w-sm leading-relaxed">
                            Redefining the salon experience with premium, ergonomic furniture designed for luxury and longevity.
                        </p>
                        <div className="flex gap-4">
                            {['IG', 'FB', 'LI'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all duration-300 group"
                                >
                                    <span className="text-xs font-bold group-hover:scale-110 transition-transform">{social}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Products Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Products</h3>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="#v-series" className="hover:text-primary transition-colors">V-Series</Link></li>
                            <li><Link href="#s-series" className="hover:text-primary transition-colors">S-Series</Link></li>
                            <li><Link href="#x-series" className="hover:text-primary transition-colors">X-Series</Link></li>
                            <li><Link href="#accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Company</h3>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="#distributors" className="hover:text-primary transition-colors">Distributors</Link></li>
                            <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>© 2023 VERSPA International. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
