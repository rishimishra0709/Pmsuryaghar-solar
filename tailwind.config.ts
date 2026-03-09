import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                solar: {
                    orange: 'hsl(var(--color-solar-orange))',
                    amber: 'hsl(var(--color-solar-amber))',
                    yellow: 'hsl(var(--color-solar-yellow))',
                    green: 'hsl(var(--color-solar-green))',
                    blue: 'hsl(var(--color-solar-blue))',
                },
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                    '2xl': '6rem',
                },
            },
        },
    },
    plugins: [],
};

export default config;
