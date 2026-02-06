export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    badge: string;
    features: string[];
    specs: {
        dimensions: string;
        weight: string;
        voltage: string;
        warranty: string;
        massagePoints: number;
        reclining: string;
    };
    colors: string[];
    images: {
        hero: string;
        gallery: string[];
    };
    pdfCatalog: string;
    order: number;
    featured: boolean;
}

export interface GalleryItem {
    id: string;
    image: string;
    thumbnail: string;
    salonName: string | null;
    location: string;
    productId: string;
    year: number;
    featured: boolean;
    order: number;
}

export interface Certification {
    id: string;
    name: string;
    type: 'certification' | 'patent' | 'award';
    icon: string;
    pdfPath: string;
    issuedBy: string;
    year: number;
    order: number;
}
