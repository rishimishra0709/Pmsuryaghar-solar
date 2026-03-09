import { Metadata } from 'next';
import { CompanyData } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

export function generateCompanyMetadata(company: CompanyData): Metadata {
    const url = `${SITE_URL}/${company.slug}`;

    return {
        title: company.seo.title,
        description: company.seo.description,
        keywords: company.seo.keywords,
        authors: [{ name: company.name }],
        creator: company.name,
        publisher: company.name,

        openGraph: {
            type: 'website',
            locale: 'en_IN',
            url: url,
            title: company.seo.title,
            description: company.seo.description,
            siteName: company.name,
            images: company.seo.ogImage
                ? [
                    {
                        url: company.seo.ogImage,
                        width: 1200,
                        height: 630,
                        alt: company.name,
                    },
                ]
                : [],
        },

        twitter: {
            card: 'summary_large_image',
            title: company.seo.title,
            description: company.seo.description,
            images: company.seo.ogImage ? [company.seo.ogImage] : [],
        },

        alternates: {
            canonical: url,
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export function generateLocalBusinessSchema(company: CompanyData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/${company.slug}`,
        name: company.name,
        description: company.description,
        url: `${SITE_URL}/${company.slug}`,
        telephone: company.contact.phone,
        email: company.contact.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: company.contact.address,
            addressLocality: company.contact.city,
            addressRegion: company.contact.state,
            postalCode: company.contact.pincode,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            // These would ideally be extracted from the map URL or provided in data
            latitude: '19.0760',
            longitude: '72.8777',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: company.testimonials.length,
        },
        priceRange: '₹₹',
        image: company.seo.ogImage || '',
        sameAs: Object.values(company.contact.socialMedia).filter(Boolean),
    };
}

export function generateProductSchema(company: CompanyData) {
    return company.products.map((product) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.features.join(', '),
        brand: {
            '@type': 'Brand',
            name: company.name,
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: company.name,
            },
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '50',
        },
    }));
}
