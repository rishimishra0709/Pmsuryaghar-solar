'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { CheckCircle2, IndianRupee, FileText, Zap, Sun, ArrowRight } from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface PMYojanaSectionProps {
    company: CompanyData;
}

function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1500;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return <span ref={ref}>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
}

export default function PMYojanaSection({ company }: PMYojanaSectionProps) {
    const { pmSuryaGhar } = company;

    return (
        <section id="pm-yojana" className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-white">
            {/* Floating orbs — light theme */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/40 to-green-100/20 rounded-full blur-[100px] pointer-events-none animate-float" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-100/40 to-orange-50/20 rounded-full blur-[80px] pointer-events-none animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-yellow-100/30 to-emerald-100/20 rounded-full blur-[60px] pointer-events-none animate-float-slow" />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#059669 1px, transparent 1px), linear-gradient(90deg, #059669 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2.5 bg-emerald-100 border border-emerald-200 text-emerald-700 px-6 py-2 rounded-full font-semibold mb-6 shadow-sm"
                    >
                        <Sun className="w-4 h-4" />
                        Official Government Scheme
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight font-jakarta"
                    >
                        {pmSuryaGhar.title}
                    </motion.h2>

                    {/* Animated divider line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                        className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mb-6 rounded-full origin-left"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {pmSuryaGhar.description}
                    </motion.p>
                </div>

                {/* Subsidy Rates */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
                    {pmSuryaGhar.subsidyRates.map((rate, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, type: 'spring', stiffness: 60 }}
                            className="group bg-white rounded-3xl p-8 border border-emerald-100 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Top accent bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-6 shadow-lg shadow-emerald-200 group-hover:scale-110 group-hover:shadow-emerald-300 transition-all duration-300">
                                    <IndianRupee className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3 font-jakarta">
                                    {rate.capacity}
                                </h3>
                                <div className="inline-block bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full font-medium text-sm mb-5 border border-emerald-100">
                                    {rate.amount}
                                </div>
                                <div className="text-4xl font-extrabold text-emerald-600 mb-2 font-jakarta">
                                    <CountUp target={parseInt(rate.subsidy.replace(/[^0-9]/g, ''))} prefix="₹" />
                                </div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Govt. Subsidy</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits & Eligibility */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 lg:p-10 border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4 font-jakarta">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            Key Benefits
                        </h3>
                        <ul className="space-y-4">
                            {pmSuryaGhar.benefits.map((benefit, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="bg-emerald-100 rounded-full p-1 border border-emerald-200 flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Eligibility */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 lg:p-10 border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4 font-jakarta">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            Eligibility Criteria
                        </h3>
                        <ul className="space-y-4">
                            {pmSuryaGhar.eligibility.map((criteria, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="bg-amber-100 rounded-full p-1 border border-amber-200 flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <span className="text-gray-700 leading-relaxed">{criteria}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Application Steps */}
                <div className="relative pt-10 border-t border-emerald-100">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-jakarta"
                        >
                            How to Apply
                        </motion.h3>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full origin-left"
                        />
                        <p className="text-gray-500 font-medium mt-4">Simple 4-step process to get your solar subsidy</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
                        {pmSuryaGhar.applicationSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                className="group"
                            >
                                <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="relative w-20 h-20 mx-auto mb-5 flex justify-center items-center">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full group-hover:scale-110 transition-transform duration-300" />
                                        <span className="relative text-3xl font-extrabold text-emerald-700 font-jakarta">{step.step}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 font-jakarta">{step.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                                    {index < pmSuryaGhar.applicationSteps.length - 1 && (
                                        <div className="hidden md:flex absolute top-10 left-[60%] items-center">
                                            <ArrowRight className="w-5 h-5 text-emerald-300" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
