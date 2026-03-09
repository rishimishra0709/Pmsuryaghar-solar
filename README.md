# Solar Enterprise Website System

A production-ready, modular, and reusable solar enterprise website system built with Next.js (App Router), TypeScript, and Tailwind CSS. This system supports multi-client dynamic routing using slug-based architecture, allowing a single codebase to serve 1000+ solar enterprises.

## 🌟 Features

- ✅ **Multi-Client Architecture**: Slug-based routing for unlimited solar companies
- ✅ **Fully Responsive**: Optimized for 320px to 1920px+ screens
- ✅ **SEO Optimized**: Dynamic metadata, Open Graph, Schema.org markup
- ✅ **PM Surya Ghar Yojana**: Dedicated section with subsidy calculator
- ✅ **Interactive Calculators**: Solar ROI calculator and EMI calculator
- ✅ **Lead Generation**: Contact form with validation and API integration
- ✅ **Premium UI/UX**: Framer Motion animations, modern design
- ✅ **Production Ready**: Type-safe, validated, and deployment-ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
bm-solar/
├── app/
│   ├── [slug]/              # Dynamic company pages
│   │   ├── layout.tsx       # Metadata generation
│   │   └── page.tsx         # Main page component
│   ├── api/
│   │   └── lead/
│   │       └── route.ts     # Lead submission API
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── not-found.tsx        # Custom 404 page
│   └── page.tsx             # Root redirect
├── components/              # Reusable UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PMYojanaSection.tsx
│   ├── LoanSection.tsx
│   ├── ProductShowcase.tsx
│   ├── SolarCalculator.tsx
│   ├── BenefitsSection.tsx
│   ├── TestimonialsCarousel.tsx
│   ├── ContactForm.tsx
│   ├── WhatsAppButton.tsx
│   └── Footer.tsx
├── lib/                     # Core utilities and data
│   ├── types.ts            # TypeScript interfaces
│   ├── data.ts             # Company data store
│   ├── seo.ts              # SEO utilities
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
├── .env.example            # Environment variables template
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher (20.9.0+ recommended)
- npm or yarn

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd bm-solar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your values:
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   GOOGLE_MAPS_API_KEY=your_api_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000/demo-solar](http://localhost:3000/demo-solar)

## 📝 Adding a New Solar Company

To add a new company, edit `lib/data.ts`:

```typescript
export const companiesData = new Map<string, CompanyData>([
  // Existing companies...
  
  // Add your new company
  [
    'your-company-slug',  // URL will be: /your-company-slug
    {
      slug: 'your-company-slug',
      name: 'Your Company Name',
      tagline: 'Your Tagline',
      description: 'Your description',
      contact: {
        phone: '+91 XXXXXXXXXX',
        whatsapp: '+91 XXXXXXXXXX',
        email: 'info@yourcompany.com',
        address: 'Your Address',
        city: 'Your City',
        state: 'Your State',
        pincode: '000000',
        mapEmbedUrl: 'your_google_maps_embed_url',
        socialMedia: {
          facebook: 'https://facebook.com/yourcompany',
          instagram: 'https://instagram.com/yourcompany',
          linkedin: 'https://linkedin.com/company/yourcompany',
        },
      },
      hero: {
        headline: 'Your Headline',
        subheadline: 'Your Subheadline',
        roiYears: 4,
        stats: [
          { label: 'Happy Customers', value: '1000+' },
          // Add more stats...
        ],
      },
      // ... add other sections (pmSuryaGhar, loanOptions, products, etc.)
      seo: {
        title: 'Your SEO Title',
        description: 'Your SEO Description',
        keywords: ['keyword1', 'keyword2'],
      },
    },
  ],
]);
```

The new company will be automatically available at `/your-company-slug`.

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  solar: {
    orange: 'hsl(var(--color-solar-orange))',
    // Modify other colors...
  },
}
```

### Components

All components are in the `components/` directory. Each component accepts a `company` prop with the company data.

### Calculations

Solar and EMI calculations are in `lib/utils.ts`. Adjust formulas as needed:

```typescript
export function calculateSolarSystem(monthlyBill: number): SolarCalculation {
  // Customize calculation logic
}
```

## 🔌 API Integration

### Lead Submission

The contact form submits to `/api/lead/route.ts`. To integrate with your email service or CRM:

1. **Install your email service SDK**:
   ```bash
   npm install @sendgrid/mail
   # or
   npm install resend
   ```

2. **Update `app/api/lead/route.ts`**:
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export async function POST(request: NextRequest) {
     const validatedData = leadSchema.parse(body);
     
     // Send email
     await sgMail.send({
       to: 'sales@yourcompany.com',
       from: process.env.SENDGRID_FROM_EMAIL!,
       subject: 'New Solar Lead',
       text: `Name: ${validatedData.name}...`,
     });
     
     return NextResponse.json({ success: true });
   }
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

### Other Platforms

The project works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Implemented for heavy components

## 🔒 Security

- ✅ Input validation with Zod
- ✅ Environment variables for secrets
- ✅ No client-side secret storage
- ✅ CORS headers configured
- ✅ Rate limiting ready (add implementation)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px - 1919px
- **Ultra-wide**: 1920px+

## 🧪 Testing

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

This project is proprietary. All rights reserved.

## 🤝 Support

For support or questions, contact your development team.

---

**Built with ❤️ for the Solar Industry**
