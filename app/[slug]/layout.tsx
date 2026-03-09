import { Metadata } from 'next';
import { getCompanyBySlug, getAllSlugs } from '@/lib/data';
import { generateCompanyMetadata, generateLocalBusinessSchema } from '@/lib/seo';

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const resolvedParams = await params;
    const company = getCompanyBySlug(resolvedParams.slug);

    if (!company) {
        return {
            title: 'Company Not Found',
            description: 'The requested solar company page could not be found.',
        };
    }

    return generateCompanyMetadata(company);
}

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export default async function CompanyLayout({ children, params }: LayoutProps) {
    const resolvedParams = await params;
    const company = getCompanyBySlug(resolvedParams.slug);

    if (!company) {
        return <>{children}</>;
    }

    const schema = generateLocalBusinessSchema(company);

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            {children}
        </>
    );
}
