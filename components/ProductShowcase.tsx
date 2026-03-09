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
        <section id="products" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-orange-100 text-orange-600 px-6 py-2 rounded-full font-semibold mb-4"
                    >
                        Our Products
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Premium Solar Solutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
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
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${filter === f.value
                                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-orange-50 shadow'
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
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                            >
                                {/* Product Header */}
                                <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white">
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
                                        <p className="text-sm text-gray-600 mb-3">Key Features</p>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-2 text-sm text-gray-700"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
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
