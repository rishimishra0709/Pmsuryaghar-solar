'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface BenefitsSectionProps {
    company: CompanyData;
}

const accentColors = [
    { from: 'from-emerald-500', to: 'to-green-600', shadow: 'shadow-emerald-200', border: 'group-hover:border-emerald-200' },
    { from: 'from-orange-500', to: 'to-amber-500', shadow: 'shadow-orange-200', border: 'group-hover:border-amber-200' },
    { from: 'from-emerald-500', to: 'to-teal-600', shadow: 'shadow-emerald-200', border: 'group-hover:border-emerald-200' },
    { from: 'from-amber-500', to: 'to-orange-500', shadow: 'shadow-amber-200', border: 'group-hover:border-amber-200' },
    { from: 'from-green-500', to: 'to-emerald-600', shadow: 'shadow-green-200', border: 'group-hover:border-green-200' },
    { from: 'from-orange-600', to: 'to-red-500', shadow: 'shadow-orange-200', border: 'group-hover:border-orange-200' },
];

export default function BenefitsSection({ company }: BenefitsSectionProps) {
    const { benefits } = company;

    return (
        <section id="benefits" className="relative py-24 overflow-hidden bg-white">
            {/* Subtle background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-amber-50/30 pointer-events-none" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 border border-emerald-200 px-6 py-2 rounded-full font-semibold mb-4"
                    >
                        Why Go Solar
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-jakarta"
                    >
                        Benefits of Solar Energy
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto mb-5 rounded-full origin-left"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Discover how solar energy can transform your life and save money
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => {
                        const IconComponent = (Icons as any)[benefit.icon] || Icons.Star;
                        const color = accentColors[index % accentColors.length];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 ${color.border} overflow-hidden`}
                            >
                                {/* Top accent bar */}
                                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${color.from} ${color.to} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${color.from} ${color.to} rounded-2xl mb-6 shadow-lg ${color.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 font-jakarta">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
