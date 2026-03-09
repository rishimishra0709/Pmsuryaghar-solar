// Core TypeScript types for the Solar Enterprise Website System

export interface CompanyData {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    contact: ContactInfo;
    hero: HeroSection;
    pmSuryaGhar: PMSuryaGharInfo;
    loanOptions: LoanOption[];
    products: SolarProduct[];
    benefits: Benefit[];
    testimonials: Testimonial[];
    seo: SEOMetadata;
}

export interface ContactInfo {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    mapEmbedUrl: string;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    };
}

export interface HeroSection {
    headline: string;
    subheadline: string;
    roiYears: number;
    stats: {
        label: string;
        value: string;
    }[];
}

export interface PMSuryaGharInfo {
    title: string;
    description: string;
    subsidyRates: {
        capacity: string;
        subsidy: string;
        amount: string;
    }[];
    benefits: string[];
    eligibility: string[];
    applicationSteps: {
        step: number;
        title: string;
        description: string;
    }[];
}

export interface LoanOption {
    provider: string;
    interestRate: number;
    tenure: number[];
    processingFee: string;
    features: string[];
}

export interface SolarProduct {
    id: string;
    name: string;
    type: 'panel' | 'inverter' | 'battery' | 'complete-system';
    capacity: string;
    price: number;
    warranty: string;
    efficiency?: string;
    features: string[];
    image?: string;
}

export interface Benefit {
    icon: string;
    title: string;
    description: string;
}

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    comment: string;
    systemSize: string;
    savings: string;
    image?: string;
}

export interface SEOMetadata {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
}

// Form types
export interface LeadFormData {
    name: string;
    email: string;
    phone: string;
    city: string;
    systemSize?: string;
    message?: string;
    companySlug: string;
}

// Calculator types
export interface SolarCalculation {
    monthlyBill: number;
    requiredCapacity: number;
    systemCost: number;
    subsidy: number;
    netCost: number;
    monthlySavings: number;
    annualSavings: number;
    roiYears: number;
}
