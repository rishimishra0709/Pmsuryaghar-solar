'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, IndianRupee, FileText, Zap, Sun } from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface PMYojanaSectionProps {
    company: CompanyData;
}

export default function PMYojanaSection({ company }: PMYojanaSectionProps) {
    const { pmSuryaGhar } = company;

    return (
        <section id="pm-yojana" className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0c1c38] via-[#0b2854] to-[#06152b]">
            {/* Ambient Lighting & Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/20 to-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-sky-400/20 to-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500/20 to-amber-400/20 border border-orange-400/30 text-amber-300 px-6 py-2 rounded-full font-semibold mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-sm"
                    >
                        <Sun className="w-5 h-5" />
                        Official Government Scheme
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-white mb-6 tracking-tight leading-tight"
                    >
                        {pmSuryaGhar.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-sky-200/80 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        {pmSuryaGhar.description}
                    </motion.p>
                </div>

                {/* Subsidy Rates */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20 relative">
                    {/* Decorative connecting line for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

                    {pmSuryaGhar.subsidyRates.map((rate, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
                            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group overflow-hidden"
                        >
                            {/* Card inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl mb-6 shadow-xl shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-white/20">
                                    <IndianRupee className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                                    {rate.capacity}
                                </h3>
                                <div className="inline-block bg-sky-900/50 text-sky-300 px-5 py-2 rounded-full font-medium text-sm mb-5 border border-sky-400/20 shadow-inner">
                                    {rate.subsidy}
                                </div>
                                <div className="relative">
                                    <span className="absolute -inset-1 bg-amber-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <p className="relative text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 group-hover:from-white group-hover:to-amber-200 transition-all duration-300">
                                        {rate.amount}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits and Eligibility */}
                <div className="grid lg:grid-cols-2 gap-8 mb-24">
                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-emerald-900/20 to-teal-900/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500" />

                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 border border-emerald-300/30">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            Key Benefits
                        </h3>
                        <ul className="space-y-6 relative z-10">
                            {pmSuryaGhar.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-4 group/item">
                                    <div className="bg-emerald-500/20 rounded-full p-1 border border-emerald-500/30 flex-shrink-0 mt-0.5 group-hover/item:bg-emerald-500/40 transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="text-sky-100/90 text-lg leading-relaxed">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Eligibility */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-sky-900/20 to-blue-900/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-sky-500/20 relative overflow-hidden group hover:border-sky-500/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:bg-sky-500/20 transition-colors duration-500" />

                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25 border border-sky-300/30">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            Eligibility Criteria
                        </h3>
                        <ul className="space-y-6 relative z-10">
                            {pmSuryaGhar.eligibility.map((criteria, index) => (
                                <li key={index} className="flex items-start gap-4 group/item">
                                    <div className="bg-sky-500/20 rounded-full p-1 border border-sky-500/30 flex-shrink-0 mt-0.5 group-hover/item:bg-sky-500/40 transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <span className="text-sky-100/90 text-lg leading-relaxed">{criteria}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Application Steps */}
                <div className="relative pt-10 border-t border-white/10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200 mb-4">
                            How to Apply
                        </h3>
                        <p className="text-sky-200/60 font-medium">Simple 4-step process to get your solar subsidy</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 lg:gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                        {pmSuryaGhar.applicationSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="group"
                            >
                                <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="relative w-24 h-24 mx-auto mb-6 flex justify-center items-center">
                                        {/* Outer glowing ring */}
                                        <div className="absolute inset-0 bg-orange-500/10 rounded-full scale-110 blur-md group-hover:scale-125 group-hover:bg-orange-500/20 transition-all duration-300" />

                                        {/* Main circle */}
                                        <div className="relative w-20 h-20 bg-gradient-to-br from-[#0c1c38] to-[#1a386b] rounded-full border-2 border-orange-400/30 flex items-center justify-center shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] group-hover:border-orange-400 transition-colors">
                                            <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-orange-500 drop-shadow-sm">
                                                {step.step}
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3">
                                        {step.title}
                                    </h4>
                                    <p className="text-sky-100/60 text-sm leading-relaxed max-w-[200px] mx-auto">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
