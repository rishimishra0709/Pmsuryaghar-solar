'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Zap, IndianRupee } from 'lucide-react';
import { calculateSolarSystem, formatCurrency } from '@/lib/utils';

export default function SolarCalculator() {
    const [monthlyBill, setMonthlyBill] = useState(5000);
    const [showResults, setShowResults] = useState(false);

    const results = calculateSolarSystem(monthlyBill);

    const handleCalculate = () => {
        setShowResults(true);
    };

    return (
        <section id="calculator" className="py-20 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-semibold mb-4"
                        >
                            <Calculator className="w-5 h-5" />
                            Solar Savings Calculator
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Calculate Your Solar Savings
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/90 max-w-3xl mx-auto"
                        >
                            Find out how much you can save with solar energy
                        </motion.p>
                    </div>

                    {/* Calculator Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 md:p-12">
                            {/* Input Section */}
                            <div className="mb-8">
                                <label className="block text-lg font-bold text-gray-900 mb-4">
                                    What is your average monthly electricity bill?
                                </label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                                    <input
                                        type="number"
                                        value={monthlyBill}
                                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                                        className="w-full pl-16 pr-6 py-6 text-3xl font-bold text-gray-900 border-2 border-gray-200 rounded-2xl focus:border-orange-600 focus:outline-none"
                                        min="500"
                                        max="100000"
                                        step="100"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="20000"
                                    step="100"
                                    value={monthlyBill}
                                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                                    className="w-full mt-4 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                />
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>₹500</span>
                                    <span>₹20,000</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full bg-orange-600 text-white py-6 rounded-2xl font-bold text-xl hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                            >
                                <Calculator className="w-6 h-6" />
                                Calculate Savings
                            </button>

                            {/* Results Section */}
                            {showResults && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-8 pt-8 border-t-2 border-gray-200"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                        Your Solar Savings Breakdown
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        {/* Required System Size */}
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Zap className="w-6 h-6 text-blue-600" />
                                                <p className="text-sm font-semibold text-blue-900">
                                                    Recommended System Size
                                                </p>
                                            </div>
                                            <p className="text-4xl font-bold text-blue-900">
                                                {results.requiredCapacity} kW
                                            </p>
                                        </div>

                                        {/* System Cost */}
                                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <IndianRupee className="w-6 h-6 text-purple-600" />
                                                <p className="text-sm font-semibold text-purple-900">
                                                    Total System Cost
                                                </p>
                                            </div>
                                            <p className="text-4xl font-bold text-purple-900">
                                                {formatCurrency(results.systemCost)}
                                            </p>
                                        </div>

                                        {/* Subsidy */}
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <TrendingUp className="w-6 h-6 text-green-600" />
                                                <p className="text-sm font-semibold text-green-900">
                                                    Government Subsidy
                                                </p>
                                            </div>
                                            <p className="text-4xl font-bold text-green-900">
                                                {formatCurrency(results.subsidy)}
                                            </p>
                                        </div>

                                        {/* Net Cost */}
                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <IndianRupee className="w-6 h-6 text-orange-600" />
                                                <p className="text-sm font-semibold text-orange-900">
                                                    Net Cost (After Subsidy)
                                                </p>
                                            </div>
                                            <p className="text-4xl font-bold text-orange-900">
                                                {formatCurrency(results.netCost)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Savings Highlight */}
                                    <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl p-8 text-white text-center">
                                        <p className="text-lg mb-2">Monthly Savings</p>
                                        <p className="text-5xl font-bold mb-4">
                                            {formatCurrency(results.monthlySavings)}
                                        </p>
                                        <p className="text-lg mb-2">Annual Savings</p>
                                        <p className="text-3xl font-bold mb-4">
                                            {formatCurrency(results.annualSavings)}
                                        </p>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
                                            <p className="text-sm mb-1">Return on Investment</p>
                                            <p className="text-4xl font-bold">
                                                {results.roiYears} Years
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-center text-gray-600 mt-6 text-sm">
                                        * Calculations are estimates based on average electricity rates and solar generation. Actual savings may vary.
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
