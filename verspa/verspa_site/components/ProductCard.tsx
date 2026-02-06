'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Zap, Shield, Waves, Maximize2 } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Mapping features to icons (placeholder logic)
    const getIcon = (feature: string) => {
        const f = feature.toLowerCase();
        if (f.includes('massage') || f.includes('point')) return <Zap size={16} className="text-primary" />;
        if (f.includes('warranty') || f.includes('system') || f.includes('detection')) return <Shield size={16} className="text-primary" />;
        if (f.includes('spa') || f.includes('quiet') || f.includes('heat')) return <Waves size={16} className="text-primary" />;
        return <Maximize2 size={16} className="text-primary" />;
    };

    return (
        <div className="snap-center shrink-0 w-[300px] md:w-[380px] bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-800">
            {/* Product Image */}
            <div className="aspect-[4/3] bg-gray-100 dark:bg-[#1a1814] relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.images.hero})` }}
                ></div>
                {product.badge && (
                    <div className="absolute top-4 left-4 bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-background-dark dark:text-white">{product.name}</h3>
                    <span className="text-primary font-bold">Inquiry</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                    {product.description}
                </p>

                {/* Features Row */}
                <div className="flex flex-wrap gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            {getIcon(feature)}
                            <span className="truncate max-w-[100px]">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href={`/products/${product.id}`}
                    className="block w-full mt-6 py-3 text-center rounded-lg border border-background-dark dark:border-white/20 hover:bg-background-dark hover:text-white dark:hover:bg-white dark:hover:text-background-dark font-medium transition-all duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
