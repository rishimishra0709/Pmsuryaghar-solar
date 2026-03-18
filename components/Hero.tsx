'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sun, Leaf, IndianRupee } from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface HeroProps {
    company: CompanyData;
}

const VIDEO_SRC = '/hero/8853485-hd_1920_1080_24fps.mp4';

const slides = [
    {
        type: 'image' as const,
        media: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800&q=85',
        badge: 'PM Surya Ghar Yojana',
        headline: 'Power Your Home\nWith Clean Solar Energy',
        highlight: 'Clean Solar Energy',
        sub: 'Get up to ₹78,000 government subsidy, zero down payment, and recover your investment in just 4 years.',
        cta1: { label: 'Get Free Site Survey', target: 'contact' },
        cta2: { label: 'Calculate Savings', target: 'calculator' },
        tag: { icon: IndianRupee, label: '₹78,000', desc: 'Govt. Subsidy' },
    },
    {
        type: 'video' as const,
        media: VIDEO_SRC,
        badge: 'Professional Installation',
        headline: 'Cut Your Electricity\nBill by Up to 90%',
        highlight: 'Bill by Up to 90%',
        sub: 'Our certified team installs premium monocrystalline panels with 25-year performance warranty. Start saving from day one.',
        cta1: { label: 'Explore Products', target: 'products' },
        cta2: { label: 'View Benefits', target: 'benefits' },
        tag: { icon: Sun, label: '25 Years', desc: 'Panel Warranty' },
    },
    {
        type: 'image' as const,
        media: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1800&q=85',
        badge: 'Clean Energy Future',
        headline: 'Join 5,000+ Happy\nCustomers Going Green',
        highlight: 'Customers Going Green',
        sub: '50+ MW installed across India. Professional installation, transparent pricing, and end-to-end support.',
        cta1: { label: 'Read Testimonials', target: 'testimonials' },
        cta2: { label: 'Contact Us', target: 'contact' },
        tag: { icon: Leaf, label: '5000+', desc: 'Happy Customers' },
    },
];

// Slide 1 gives video ~8s to preload before it appears in slide 2
const SLIDE_DURATIONS = [3000, 6000, 3000];

export default function Hero({ company }: HeroProps) {
    const { hero } = company;
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        
        timerRef.current = setTimeout(() => {
            setDirection(1);
            setCurrent(prev => (prev + 1) % slides.length);
        }, SLIDE_DURATIONS[current]);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current]);

    const goTo = (i: number, dir = 1) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setDirection(dir);
        setCurrent(i);
    };
    const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);
    const next = () => goTo((current + 1) % slides.length, 1);

    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const slide = slides[current];
    const TagIcon = slide.tag.icon;

    return (
        <section id="hero" className="relative min-h-screen flex items-end overflow-hidden bg-[#080c18]">

            {/* Hidden video preloader — loads during slide 1 */}
            <video
                key="preloader"
                src={VIDEO_SRC}
                preload="auto"
                muted
                playsInline
                className="absolute w-0 h-0 opacity-0 pointer-events-none"
                aria-hidden="true"
            />

            {/* ── BACKGROUND MEDIA ── */}
            <AnimatePresence mode="sync" custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    className="absolute inset-0 z-0"
                    variants={{
                        enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 1 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 1 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {slide.type === 'video' ? (
                        <video
                            ref={videoRef}
                            key="hero-video"
                            autoPlay muted loop playsInline
                            preload="auto"
                            onLoadedData={() => setVideoLoaded(true)}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-90' : 'opacity-0'}`}
                        >
                            <source src={slide.media} type="video/mp4" />
                        </video>
                    ) : (
                        <Image
                            src={slide.media}
                            alt={slide.badge}
                            fill
                            className="object-cover"
                            priority={current === 1}
                            unoptimized
                        />
                    )}

                    {/* Cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080c18]/90 via-[#080c18]/55 to-[#080c18]/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c18]/85 via-transparent to-[#080c18]/25" />
                </motion.div>
            </AnimatePresence>

            {/* Ambient glows */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                <motion.div
                    key={`glow-${current}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px]"
                />
                <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] bg-orange-600/8 rounded-full blur-[140px]" />
            </div>

            {/* ── CONTENT ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 pb-28 pt-40">
                <div className="max-w-[600px]">

                    {/* Badge */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`badge-${current}`}
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({ x: d * 40, opacity: 0 }),
                                center: { x: 0, opacity: 1 },
                                exit: (d: number) => ({ x: d * -40, opacity: 0 }),
                            }}
                            initial="enter" animate="center" exit="exit"
                            transition={{ duration: 0.25 }}
                            className="inline-flex items-center gap-2 border border-amber-400/25 bg-amber-400/8 backdrop-blur-sm px-4 py-1.5 rounded-full mb-7"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-300 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
                                {slide.badge}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Headline */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.h1
                            key={`h1-${current}`}
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({ x: d * 50, opacity: 0 }),
                                center: { x: 0, opacity: 1 },
                                exit: (d: number) => ({ x: d * -50, opacity: 0 }),
                            }}
                            initial="enter" animate="center" exit="exit"
                            transition={{ duration: 0.28, delay: 0.03 }}
                            className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-white mb-5 whitespace-pre-line"
                        >
                            {slide.headline.split(slide.highlight).map((part, i, arr) =>
                                i < arr.length - 1
                                    ? <span key={i}>{part}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300">{slide.highlight}</span></span>
                                    : <span key={i}>{part}</span>
                            )}
                        </motion.h1>
                    </AnimatePresence>

                    {/* Sub */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.p
                            key={`sub-${current}`}
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({ x: d * 40, opacity: 0 }),
                                center: { x: 0, opacity: 1 },
                                exit: (d: number) => ({ x: d * -40, opacity: 0 }),
                            }}
                            initial="enter" animate="center" exit="exit"
                            transition={{ duration: 0.25, delay: 0.06 }}
                            className="text-white/55 text-[0.97rem] leading-[1.7] mb-9 font-light max-w-[480px]"
                        >
                            {slide.sub}
                        </motion.p>
                    </AnimatePresence>

                    {/* CTAs */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`cta-${current}`}
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({ x: d * 30, opacity: 0 }),
                                center: { x: 0, opacity: 1 },
                                exit: (d: number) => ({ x: d * -30, opacity: 0 }),
                            }}
                            initial="enter" animate="center" exit="exit"
                            transition={{ duration: 0.22, delay: 0.09 }}
                            className="flex flex-wrap gap-3"
                        >
                            <button
                                onClick={() => scrollTo(slide.cta1.target)}
                                className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-[#080c18] font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(251,191,36,0.4)] shadow-lg"
                            >
                                {slide.cta1.label}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={() => scrollTo(slide.cta2.target)}
                                className="inline-flex items-center gap-2 border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200"
                            >
                                {slide.cta2.label}
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ── FLOATING TAG CARD — right side ── */}
            <motion.div
                key={`tag-${current}`}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 z-20 hidden md:block"
            >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 w-44 text-center shadow-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
                        <TagIcon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white text-2xl font-black mb-0.5">{slide.tag.label}</p>
                    <p className="text-white/40 text-[0.7rem] font-medium uppercase tracking-wider">{slide.tag.desc}</p>
                    <div className="mt-4 h-[1.5px] w-full rounded-full bg-gradient-to-r from-amber-400/50 to-orange-500/50" />
                </div>

                {/* Stats below */}
                <div className="mt-3 bg-white/4 backdrop-blur-xl border border-white/8 rounded-2xl p-4 w-44">
                    {hero.stats.slice(0, 2).map((s, i) => (
                        <div key={i} className={`${i > 0 ? 'mt-3 pt-3 border-t border-white/8' : ''}`}>
                            <p className="text-white font-bold text-lg leading-none">{s.value}</p>
                            <p className="text-white/35 text-[0.65rem] uppercase tracking-wider mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── BOTTOM BAR — progress dots + arrows + stats ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                {/* Progress bar */}
                <div className="flex">
                    {slides.map((_, i) => (
                        <div key={i} className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                            {i === current && (
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: SLIDE_DURATIONS[i] / 1000, ease: 'linear' }}
                                />
                            )}
                            {i < current && <div className="absolute inset-0 bg-amber-400/40" />}
                        </div>
                    ))}
                </div>

                {/* Nav row */}
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-5 flex items-center justify-between">
                    {/* Dots */}
                    <div className="flex items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-amber-400' : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>

                    {/* Stats — mobile only, middle */}
                    <div className="hidden sm:flex items-center gap-8">
                        {hero.stats.slice(0, 4).map((s, i) => (
                            <div key={i} className="text-center">
                                <p className="text-white font-bold text-base leading-none">{s.value}</p>
                                <p className="text-white/35 text-[0.6rem] uppercase tracking-wider mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prev}
                            className="w-9 h-9 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={next}
                            className="w-9 h-9 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
