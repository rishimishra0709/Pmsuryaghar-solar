import { notFound } from 'next/navigation';
import { getCompanyBySlug } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PMYojanaSection from '@/components/PMYojanaSection';
import LoanSection from '@/components/LoanSection';
import ProductShowcase from '@/components/ProductShowcase';
import SolarCalculator from '@/components/SolarCalculator';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CompanyPage({ params }: PageProps) {
    const resolvedParams = await params;
    const company = getCompanyBySlug(resolvedParams.slug);

    if (!company) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <Navbar company={company} />
            <Hero company={company} />
            <PMYojanaSection company={company} />
            <LoanSection company={company} />
            <ProductShowcase company={company} />
            <SolarCalculator />
            <BenefitsSection company={company} />
            <TestimonialsCarousel company={company} />
            <ContactForm company={company} />
            <Footer company={company} />
            <WhatsAppButton company={company} />
        </main>
    );
}
