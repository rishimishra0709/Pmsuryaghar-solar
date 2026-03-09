import { CompanyData } from './types';

// Centralized data store for all solar companies
// Add new companies by adding entries to this Map

export const companiesData = new Map<string, CompanyData>([
    [
        'demo-solar',
        {
            slug: 'demo-solar',
            name: 'SunPower Solutions',
            tagline: 'Powering Tomorrow, Today',
            description: 'Leading solar energy provider with 10+ years of experience in residential and commercial solar installations across India.',

            contact: {
                phone: '+91 98765 43210',
                whatsapp: '+91 98765 43210',
                email: 'info@sunpowersolutions.com',
                address: '123 Solar Street, Green Park',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9373!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1234567890',
                socialMedia: {
                    facebook: 'https://facebook.com/sunpowersolutions',
                    instagram: 'https://instagram.com/sunpowersolutions',
                    linkedin: 'https://linkedin.com/company/sunpowersolutions',
                },
            },

            hero: {
                headline: 'Go Solar, Save Big with PM Surya Ghar Yojana',
                subheadline: 'Get up to ₹78,000 subsidy + Zero Down Payment + 4 Year ROI',
                roiYears: 4,
                stats: [
                    { label: 'Happy Customers', value: '5000+' },
                    { label: 'MW Installed', value: '50+' },
                    { label: 'Years Experience', value: '10+' },
                    { label: 'Avg. Savings', value: '80%' },
                ],
            },

            pmSuryaGhar: {
                title: 'PM Surya Ghar Muft Bijli Yojana',
                description: 'The Government of India\'s flagship program to promote rooftop solar installations. Get substantial subsidies and generate free electricity for your home.',
                subsidyRates: [
                    { capacity: '1-2 kW', subsidy: '₹30,000/kW', amount: 'Up to ₹60,000' },
                    { capacity: '2-3 kW', subsidy: '₹18,000/kW', amount: 'Up to ₹78,000' },
                    { capacity: '3+ kW', subsidy: 'Fixed', amount: '₹78,000' },
                ],
                benefits: [
                    'Reduce electricity bills by up to 90%',
                    'Earn money by selling excess power to grid',
                    'Increase property value by 15-20%',
                    'Zero maintenance for 25+ years',
                    'Contribute to clean energy mission',
                    'Tax benefits under Section 80C',
                ],
                eligibility: [
                    'Residential property owner',
                    'Adequate rooftop space (100 sq ft per kW)',
                    'Electricity connection in your name',
                    'No pending electricity dues',
                ],
                applicationSteps: [
                    {
                        step: 1,
                        title: 'Register Online',
                        description: 'Visit the PM Surya Ghar portal and complete registration with your electricity bill details',
                    },
                    {
                        step: 2,
                        title: 'Get Approval',
                        description: 'Receive feasibility approval from your local electricity distribution company (DISCOM)',
                    },
                    {
                        step: 3,
                        title: 'Installation',
                        description: 'We install your solar system with high-quality components and ensure grid connectivity',
                    },
                    {
                        step: 4,
                        title: 'Receive Subsidy',
                        description: 'Subsidy amount is directly credited to your bank account after inspection and commissioning',
                    },
                ],
            },

            loanOptions: [
                {
                    provider: 'HDFC Bank Solar Loan',
                    interestRate: 8.5,
                    tenure: [3, 5, 7, 10],
                    processingFee: '1% of loan amount',
                    features: [
                        'No collateral required',
                        'Quick approval in 48 hours',
                        'Flexible EMI options',
                        'Loan up to ₹10 lakhs',
                    ],
                },
                {
                    provider: 'SBI Green Energy Loan',
                    interestRate: 8.75,
                    tenure: [5, 7, 10],
                    processingFee: '0.5% of loan amount',
                    features: [
                        'Special rates for solar projects',
                        'Doorstep service available',
                        'Part prepayment allowed',
                        'Loan up to ₹15 lakhs',
                    ],
                },
                {
                    provider: 'ICICI Solar Finance',
                    interestRate: 9.0,
                    tenure: [3, 5, 7],
                    processingFee: '1.5% of loan amount',
                    features: [
                        'Instant online approval',
                        'Minimal documentation',
                        'Competitive interest rates',
                        'Loan up to ₹8 lakhs',
                    ],
                },
            ],

            products: [
                {
                    id: 'sys-3kw',
                    name: '3 kW On-Grid Solar System',
                    type: 'complete-system',
                    capacity: '3 kW',
                    price: 180000,
                    warranty: '25 years on panels, 5 years on inverter',
                    features: [
                        '12 x 250W Monocrystalline panels',
                        '3 kW Grid-tie inverter',
                        'Mounting structure & cables',
                        'Net metering compatible',
                        'Generates ~12 units/day',
                    ],
                },
                {
                    id: 'sys-5kw',
                    name: '5 kW On-Grid Solar System',
                    type: 'complete-system',
                    capacity: '5 kW',
                    price: 275000,
                    warranty: '25 years on panels, 5 years on inverter',
                    features: [
                        '20 x 250W Monocrystalline panels',
                        '5 kW Grid-tie inverter',
                        'Mounting structure & cables',
                        'Net metering compatible',
                        'Generates ~20 units/day',
                    ],
                },
                {
                    id: 'sys-10kw',
                    name: '10 kW On-Grid Solar System',
                    type: 'complete-system',
                    capacity: '10 kW',
                    price: 525000,
                    warranty: '25 years on panels, 10 years on inverter',
                    features: [
                        '40 x 250W Monocrystalline panels',
                        '10 kW Grid-tie inverter',
                        'Commercial grade mounting',
                        'Net metering compatible',
                        'Generates ~40 units/day',
                    ],
                },
                {
                    id: 'panel-mono-545',
                    name: 'Monocrystalline Solar Panel',
                    type: 'panel',
                    capacity: '545W',
                    price: 15000,
                    warranty: '25 years performance warranty',
                    efficiency: '21.5%',
                    features: [
                        'High efficiency monocrystalline cells',
                        'Weather resistant design',
                        'Low degradation rate',
                        'Certified by IEC standards',
                    ],
                },
                {
                    id: 'inv-5kw-hybrid',
                    name: 'Hybrid Solar Inverter',
                    type: 'inverter',
                    capacity: '5 kW',
                    price: 65000,
                    warranty: '5 years manufacturer warranty',
                    efficiency: '97.5%',
                    features: [
                        'Grid + Battery compatible',
                        'MPPT technology',
                        'WiFi monitoring',
                        'Surge protection',
                    ],
                },
                {
                    id: 'battery-150ah',
                    name: 'Lithium Solar Battery',
                    type: 'battery',
                    capacity: '150 Ah',
                    price: 85000,
                    warranty: '7 years warranty',
                    features: [
                        'Deep cycle lithium battery',
                        '5000+ charge cycles',
                        'Fast charging capability',
                        'BMS protection system',
                    ],
                },
            ],

            benefits: [
                {
                    icon: 'Zap',
                    title: 'Reduce Electricity Bills',
                    description: 'Save up to 90% on your monthly electricity bills with solar power generation',
                },
                {
                    icon: 'Leaf',
                    title: 'Clean & Green Energy',
                    description: 'Reduce your carbon footprint and contribute to a sustainable future',
                },
                {
                    icon: 'TrendingUp',
                    title: 'Increase Property Value',
                    description: 'Solar installations can increase property value by 15-20%',
                },
                {
                    icon: 'Shield',
                    title: 'Energy Independence',
                    description: 'Generate your own power and protect against rising electricity costs',
                },
                {
                    icon: 'IndianRupee',
                    title: 'Earn from Excess Power',
                    description: 'Sell surplus electricity back to the grid and earn additional income',
                },
                {
                    icon: 'Award',
                    title: 'Government Subsidies',
                    description: 'Benefit from PM Surya Ghar Yojana subsidies up to ₹78,000',
                },
            ],

            testimonials: [
                {
                    id: 'test-1',
                    name: 'Rajesh Kumar',
                    location: 'Mumbai, Maharashtra',
                    rating: 5,
                    comment: 'Installed a 5kW system 6 months ago. My electricity bill dropped from ₹8,000 to just ₹800! The team was professional and installation was completed in 2 days. Highly recommended!',
                    systemSize: '5 kW',
                    savings: '₹7,200/month',
                },
                {
                    id: 'test-2',
                    name: 'Priya Sharma',
                    location: 'Pune, Maharashtra',
                    rating: 5,
                    comment: 'Best decision ever! Got ₹78,000 subsidy under PM Surya Ghar Yojana. The ROI is amazing - my system will pay for itself in just 4 years. Customer service is excellent.',
                    systemSize: '3 kW',
                    savings: '₹4,500/month',
                },
                {
                    id: 'test-3',
                    name: 'Amit Patel',
                    location: 'Ahmedabad, Gujarat',
                    rating: 5,
                    comment: 'Professional installation, quality products, and transparent pricing. They handled all the paperwork for subsidy and net metering. Zero hassle experience!',
                    systemSize: '10 kW',
                    savings: '₹15,000/month',
                },
                {
                    id: 'test-4',
                    name: 'Sneha Reddy',
                    location: 'Hyderabad, Telangana',
                    rating: 5,
                    comment: 'Great service from consultation to installation. The solar calculator helped me choose the right system size. Now I\'m generating more power than I consume!',
                    systemSize: '5 kW',
                    savings: '₹6,800/month',
                },
            ],

            seo: {
                title: 'SunPower Solutions - Best Solar Panel Installation in Mumbai',
                description: 'Leading solar energy provider in Mumbai. Get up to ₹78,000 subsidy under PM Surya Ghar Yojana. Zero down payment, 4-year ROI. 10+ years experience, 5000+ happy customers.',
                keywords: [
                    'solar panels Mumbai',
                    'solar installation Mumbai',
                    'PM Surya Ghar Yojana',
                    'rooftop solar Mumbai',
                    'solar subsidy India',
                    'best solar company Mumbai',
                    'solar panel price',
                    'solar energy Maharashtra',
                ],
            },
        },
    ],
]);

// Helper functions
export function getCompanyBySlug(slug: string): CompanyData | undefined {
    return companiesData.get(slug);
}

export function getAllSlugs(): string[] {
    return Array.from(companiesData.keys());
}

export function getAllCompanies(): CompanyData[] {
    return Array.from(companiesData.values());
}
