'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, Sun, Package } from 'lucide-react';
import { CompanyData, SolarProduct } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ProductShowcaseProps {
    company: CompanyData;
}

const typeIcons = {
    panel: Sun,
    inverter: Zap,
    battery: Battery,
    'complete-system': Package,
};

export default function ProductShowcase({ company }: ProductShowcaseProps) {
    const { products } = company;
    const [filter, setFilter] = useState<string>('all');

    const filteredProducts =
        filter === 'all'
            ? products
            : products.filter((p) => p.type === filter);

    const filters = [
        { value: 'all', label: 'All Products' },
        { value: 'complete-system', label: 'Complete Systems' },
        { value: 'panel', label: 'Solar Panels' },
        { value: 'inverter', label: 'Inverters' },
        { value: 'battery', label: 'Batteries' },
    ];

    return (
        <section id="products" className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Subtle bg */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none animate-float-slow" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 border border-emerald-200 px-6 py-2 rounded-full font-semibold mb-4"
                    >
                        Our Products
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-jakarta"
                    >
                        Premium Solar Solutions
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
                        High-quality solar products with industry-leading warranties
                    </motion.p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${filter === f.value
                                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-200 scale-105'
                                : 'bg-white text-gray-700 hover:bg-emerald-50 shadow border border-gray-100 hover:border-emerald-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, index) => {
                        const Icon = typeIcons[product.type];
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-emerald-100 group"
                            >
                                {/* Product Header */}
                                <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white group-hover:from-emerald-400 group-hover:to-green-500 transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm opacity-90">Starting from</p>
                                            <p className="text-2xl font-bold">
                                                {formatCurrency(product.price)}
                                            </p>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-white/90 font-semibold">
                                        {product.capacity}
                                    </p>
                                </div>

                                {/* Product Details */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-1">Warranty</p>
                                        <p className="font-semibold text-gray-900">
                                            {product.warranty}
                                        </p>
                                    </div>

                                    {product.efficiency && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-1">Efficiency</p>
                                            <p className="font-semibold text-gray-900">
                                                {product.efficiency}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 mb-3">Key Features</p>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-500 hover:to-green-500 transition-all shadow-sm hover:shadow-emerald-200">
                                        Get Quote
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
