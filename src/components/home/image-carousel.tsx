'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSlide {
  src: string;
  alt: string;
  aspectRatio: 'square' | 'portrait' | 'info';
  infoContent?: {
    label: string;
    sublabel: string;
  };
}

const slides: ImageSlide[] = [
  {
    src: '/products/verspa-basic/KakaoTalk_20250103_173412595_01.jpg',
    alt: 'VERSPA Product Detail',
    aspectRatio: 'portrait',
  },
  {
    src: '/products/verspa-accessory/KakaoTalk_20250103_173412595_02.jpg',
    alt: 'VERSPA Leather Detail',
    aspectRatio: 'square',
  },
  {
    src: '/products/verspa-basic/KakaoTalk_20250103_173412595.jpg',
    alt: 'VERSPA in Use',
    aspectRatio: 'portrait',
  },
  {
    src: '',
    alt: 'Warranty Info',
    aspectRatio: 'info',
    infoContent: {
      label: '5Y',
      sublabel: 'Motor Warranty',
    },
  },
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Slides Wrapper */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full">
              {slide.aspectRatio === 'info' ? (
                /* Info Card */
                <div className="aspect-square rounded-2xl bg-primary/10 flex items-center justify-center p-8 border border-surface-dark">
                  <div className="text-center">
                    <span className="text-7xl md:text-8xl font-black text-primary italic">
                      {slide.infoContent?.label}
                    </span>
                    <p className="text-white/60 text-sm md:text-base mt-4 font-bold uppercase tracking-widest">
                      {slide.infoContent?.sublabel}
                    </p>
                  </div>
                </div>
              ) : (
                /* Image Slide */
                <div
                  className={`relative ${
                    slide.aspectRatio === 'portrait'
                      ? 'aspect-[3/4]'
                      : 'aspect-square'
                  } rounded-2xl overflow-hidden border border-surface-dark shadow-2xl`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background-dark/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background-dark/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
