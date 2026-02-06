'use client';

import React, { useState, useMemo } from 'react';
import { GalleryItem, Product } from '@/types';
import { Maximize2, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface ImageGalleryProps {
    items: GalleryItem[];
    products: Product[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, products }) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [activeProductFilter, setActiveProductFilter] = useState<string>('all');
    const [activeLocationFilter, setActiveLocationFilter] = useState<string>('all');

    // Unique locations for filter
    const locations = useMemo(() => {
        return ['all', ...Array.from(new Set(items.map(item => item.location.split(', ')[1] || item.location)))];
    }, [items]);

    // Filtered items
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchProduct = activeProductFilter === 'all' || item.productId === activeProductFilter;
            const matchLocation = activeLocationFilter === 'all' || item.location.includes(activeLocationFilter);
            return matchProduct && matchLocation;
        });
    }, [items, activeProductFilter, activeLocationFilter]);

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % filteredItems.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length);
        }
    };

    return (
        <div className="w-full">
            {/* Sticky Filters */}
            <div className="sticky top-16 z-40 bg-background-dark/95 backdrop-blur border-b border-surface-dark py-4 mb-8">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                        {/* Product Filter */}
                        <div className="flex items-center bg-surface-dark rounded-xl p-1 border border-surface-dark">
                            <button
                                onClick={() => setActiveProductFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeProductFilter === 'all' ? 'bg-primary text-background-dark shadow-sm' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                All Models
                            </button>
                            {products.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => setActiveProductFilter(product.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeProductFilter === product.id ? 'bg-primary text-background-dark shadow-sm' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {product.name.split(' ')[1]}
                                </button>
                            ))}
                        </div>

                        {/* Location Filter */}
                        <div className="relative group">
                            <div className="flex h-10 items-center gap-x-2 rounded-xl border border-surface-dark bg-surface-dark pl-4 pr-3 hover:border-primary/50 transition-colors cursor-pointer">
                                <Filter size={18} className="text-gray-400 group-hover:text-primary" />
                                <select
                                    className="bg-transparent text-gray-300 text-sm font-medium outline-none cursor-pointer appearance-none pr-6"
                                    value={activeLocationFilter}
                                    onChange={(e) => setActiveLocationFilter(e.target.value)}
                                >
                                    {locations.map(loc => (
                                        <option key={loc} value={loc} className="bg-surface-dark">{loc === 'all' ? 'All Regions' : loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <p className="text-white/40 text-sm font-medium hidden md:block">
                        Showing {filteredItems.length} installations
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto px-6 lg:px-10">
                {filteredItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-xl bg-surface-dark aspect-[4/3] cursor-pointer shadow-lg hover:shadow-primary/10 transition-shadow"
                        onClick={() => openLightbox(index)}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"></div>

                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{item.location}</p>
                                    <h3 className="text-white text-lg font-bold leading-tight">{item.salonName || 'Private Salon'}</h3>
                                </div>
                                <div className="size-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                    <Maximize2 size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                    onClick={closeLightbox}
                >
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={closeLightbox}>
                        <X size={32} />
                    </button>

                    <button className="absolute left-6 text-white/50 hover:text-white transition-colors" onClick={prevImage}>
                        <ChevronLeft size={48} />
                    </button>

                    <div className="max-w-5xl max-h-full relative group" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={filteredItems[selectedImage].image}
                            alt={filteredItems[selectedImage].salonName || 'Installation'}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        />
                        <div className="mt-6 text-center">
                            <p className="text-primary text-sm font-bold uppercase tracking-widest">{filteredItems[selectedImage].location}</p>
                            <h2 className="text-white text-2xl font-bold mt-1">{filteredItems[selectedImage].salonName || 'Private Salon'}</h2>
                        </div>
                    </div>

                    <button className="absolute right-6 text-white/50 hover:text-white transition-colors" onClick={nextImage}>
                        <ChevronRight size={48} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
