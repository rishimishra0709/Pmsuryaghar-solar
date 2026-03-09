'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Percent, TrendingDown, CheckCircle, Leaf } from 'lucide-react';
import { CompanyData } from '@/lib/types';
import { calculateEMI, formatCurrency } from '@/lib/utils';

interface LoanSectionProps {
    company: CompanyData;
}

export default function LoanSection({ company }: LoanSectionProps) {
    const { loanOptions } = company;
    const [selectedLoan, setSelectedLoan] = useState(loanOptions[0]);
    const [loanAmount, setLoanAmount] = useState(200000);
    const [tenure, setTenure] = useState(5);

    const emi = calculateEMI(loanAmount, selectedLoan.interestRate, tenure);
    const totalPayment = emi * tenure * 12;
    const totalInterest = totalPayment - loanAmount;

    return (
        <section id="loans" className="relative py-24 overflow-hidden bg-white">
            {/* Subtle bg accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/20 to-amber-50/20 pointer-events-none" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 border border-emerald-200 px-6 py-2 rounded-full font-semibold mb-4"
                    >
                        Easy Financing
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-jakarta"
                    >
                        Zero Down Payment Solar Loans
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
                        Get instant approval for solar financing with competitive interest rates
                    </motion.p>
                </div>

                {/* Loan Provider Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {loanOptions.map((loan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedLoan(loan)}
                            className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${selectedLoan.provider === loan.provider
                                ? 'bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-2xl scale-105 shadow-emerald-200'
                                : 'bg-gray-50 text-gray-900 hover:bg-emerald-50 shadow-sm hover:shadow-md border border-gray-100 hover:border-emerald-200'
                                }`}
                        >
                            <h3 className="text-xl font-bold mb-4 font-jakarta">{loan.provider}</h3>
                            <div className="mb-4">
                                <p className={`text-sm mb-1 ${selectedLoan.provider === loan.provider ? 'text-white/70' : 'text-gray-500'}`}>Interest Rate</p>
                                <p className="text-3xl font-bold font-jakarta">{loan.interestRate}% p.a.</p>
                            </div>
                            <div className="mb-4">
                                <p className={`text-sm mb-1 ${selectedLoan.provider === loan.provider ? 'text-white/70' : 'text-gray-500'}`}>Processing Fee</p>
                                <p className="font-semibold">{loan.processingFee}</p>
                            </div>
                            <ul className="space-y-2">
                                {loan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${selectedLoan.provider === loan.provider ? 'text-white' : 'text-emerald-600'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* EMI Calculator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-emerald-50 to-green-50/50 border border-emerald-100 rounded-2xl p-8 shadow-sm"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center font-jakarta">EMI Calculator</h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Loan Amount: {formatCurrency(loanAmount)}
                                </label>
                                <input
                                    type="range" min="50000" max="1000000" step="10000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>₹50K</span><span>₹10L</span></div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tenure: {tenure} Years
                                </label>
                                <input
                                    type="range" min="3" max="10" step="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>3 Years</span><span>10 Years</span></div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-emerald-100">
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <Percent className="w-5 h-5 text-emerald-600" />
                                    <span className="font-semibold">Interest Rate: {selectedLoan.interestRate}% p.a.</span>
                                </div>
                                <p className="text-sm text-gray-500">Provider: {selectedLoan.provider}</p>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
                                <p className="text-sm text-gray-500 mb-2">Monthly EMI</p>
                                <p className="text-4xl font-bold text-emerald-600 font-jakarta">{formatCurrency(emi)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500 mb-2">Total Payment</p>
                                <p className="text-2xl font-bold text-gray-900 font-jakarta">{formatCurrency(totalPayment)}</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500 mb-2">Total Interest</p>
                                <p className="text-2xl font-bold text-gray-900 font-jakarta">{formatCurrency(totalInterest)}</p>
                            </div>
                            <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl p-4 flex items-center gap-3">
                                <Leaf className="w-6 h-6 flex-shrink-0" />
                                <p className="text-sm">Your solar savings will likely exceed your EMI payment!</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
