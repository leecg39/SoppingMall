'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Products', href: '#products' },
        { name: 'Features', href: '#features' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'About', href: '#about' },
    ];

    return (
        <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
                ? 'bg-background-dark/95 backdrop-blur-md border-surface-dark/50'
                : 'bg-transparent border-transparent'
            }`}>
            <div className="px-4 md:px-10 lg:px-40 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 text-white">
                    <img src="/images/logo.png" alt="VERSPA Logo" className="h-8 w-auto" />
                    <h2 className="text-xl font-bold tracking-tight">VERSPA</h2>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA and Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link href="/contact" className="hidden sm:flex items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 transition-all text-background-dark text-sm font-bold shadow-lg shadow-primary/20">
                        <span className="truncate">Request Quote</span>
                    </Link>

                    <button
                        className="lg:hidden text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden absolute top-full left-0 w-full bg-background-dark/98 backdrop-blur-lg border-b border-surface-dark transition-all duration-300 ${isOpen ? 'opacity-100 visible h-auto py-6' : 'opacity-0 invisible h-0 overflow-hidden'
                }`}>
                <div className="flex flex-col items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-white hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/contact" className="flex items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary hover:bg-primary/90 transition-all text-background-dark text-lg font-bold">
                        Request Quote
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
