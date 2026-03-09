'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Zap, IndianRupee, Leaf } from 'lucide-react';
import { calculateSolarSystem, formatCurrency } from '@/lib/utils';

export default function SolarCalculator() {
    const [monthlyBill, setMonthlyBill] = useState(5000);
    const [showResults, setShowResults] = useState(false);

    const results = calculateSolarSystem(monthlyBill);

    return (
        <section id="calculator" className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-800 via-green-800 to-teal-900">
            {/* Floating orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none animate-float" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[100px] pointer-events-none animate-float-delayed" />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-semibold mb-4 border border-white/20"
                        >
                            <Calculator className="w-5 h-5 text-emerald-300" />
                            Solar Savings Calculator
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-jakarta"
                        >
                            Calculate Your Solar Savings
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
                            className="text-xl text-white/80 max-w-3xl mx-auto"
                        >
                            Find out how much you can save with solar energy
                        </motion.p>
                    </div>

                    {/* Calculator Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 md:p-12">
                            {/* Input Section */}
                            <div className="mb-8">
                                <label className="block text-lg font-bold text-gray-900 mb-4 font-jakarta">
                                    What is your average monthly electricity bill?
                                </label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-emerald-500" />
                                    <input
                                        type="number"
                                        value={monthlyBill}
                                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                                        className="w-full pl-16 pr-6 py-6 text-3xl font-bold text-gray-900 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-colors"
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
                                    className="w-full mt-4 h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>₹500</span>
                                    <span>₹20,000</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowResults(true)}
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-6 rounded-2xl font-bold text-xl hover:from-emerald-500 hover:to-green-500 transition-all shadow-lg hover:shadow-emerald-300/40 flex items-center justify-center gap-3 group"
                            >
                                <Leaf className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                Calculate Savings
                            </button>

                            {/* Results Section */}
                            {showResults && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-8 pt-8 border-t-2 border-gray-100"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center font-jakarta">
                                        Your Solar Savings Breakdown
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Zap className="w-6 h-6 text-emerald-600" />
                                                <p className="text-sm font-semibold text-emerald-900">Recommended System Size</p>
                                            </div>
                                            <p className="text-4xl font-bold text-emerald-900 font-jakarta">{results.requiredCapacity} kW</p>
                                        </motion.div>

                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <IndianRupee className="w-6 h-6 text-blue-600" />
                                                <p className="text-sm font-semibold text-blue-900">Total System Cost</p>
                                            </div>
                                            <p className="text-4xl font-bold text-blue-900 font-jakarta">{formatCurrency(results.systemCost)}</p>
                                        </motion.div>

                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <TrendingUp className="w-6 h-6 text-amber-600" />
                                                <p className="text-sm font-semibold text-amber-900">Government Subsidy</p>
                                            </div>
                                            <p className="text-4xl font-bold text-amber-900 font-jakarta">{formatCurrency(results.subsidy)}</p>
                                        </motion.div>

                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <IndianRupee className="w-6 h-6 text-orange-600" />
                                                <p className="text-sm font-semibold text-orange-900">Net Cost (After Subsidy)</p>
                                            </div>
                                            <p className="text-4xl font-bold text-orange-900 font-jakarta">{formatCurrency(results.netCost)}</p>
                                        </motion.div>
                                    </div>

                                    {/* Savings Highlight */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.25 }}
                                        className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-8 text-white text-center animate-pulse-glow"
                                    >
                                        <p className="text-lg mb-2 text-white/80">Monthly Savings</p>
                                        <p className="text-5xl font-extrabold mb-4 font-jakarta">{formatCurrency(results.monthlySavings)}</p>
                                        <p className="text-lg mb-2 text-white/80">Annual Savings</p>
                                        <p className="text-3xl font-bold mb-4 font-jakarta">{formatCurrency(results.annualSavings)}</p>
                                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mt-4">
                                            <p className="text-sm mb-1 text-white/80">Return on Investment</p>
                                            <p className="text-4xl font-bold font-jakarta">{results.roiYears} Years</p>
                                        </div>
                                    </motion.div>

                                    <p className="text-center text-gray-500 mt-6 text-sm">
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
