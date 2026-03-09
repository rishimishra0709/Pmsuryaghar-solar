'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Percent, TrendingDown, CheckCircle } from 'lucide-react';
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
        <section id="loans" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-green-100 text-green-600 px-6 py-2 rounded-full font-semibold mb-4"
                    >
                        Easy Financing
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Zero Down Payment Solar Loans
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
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
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedLoan(loan)}
                            className={`cursor-pointer rounded-2xl p-6 transition-all ${selectedLoan.provider === loan.provider
                                    ? 'bg-orange-600 text-white shadow-2xl scale-105'
                                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100 shadow-lg'
                                }`}
                        >
                            <h3 className="text-xl font-bold mb-4">{loan.provider}</h3>
                            <div className="mb-4">
                                <p
                                    className={`text-sm mb-1 ${selectedLoan.provider === loan.provider
                                            ? 'text-white/80'
                                            : 'text-gray-600'
                                        }`}
                                >
                                    Interest Rate
                                </p>
                                <p className="text-3xl font-bold">{loan.interestRate}% p.a.</p>
                            </div>
                            <div className="mb-4">
                                <p
                                    className={`text-sm mb-1 ${selectedLoan.provider === loan.provider
                                            ? 'text-white/80'
                                            : 'text-gray-600'
                                        }`}
                                >
                                    Processing Fee
                                </p>
                                <p className="font-semibold">{loan.processingFee}</p>
                            </div>
                            <ul className="space-y-2">
                                {loan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                        <CheckCircle
                                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${selectedLoan.provider === loan.provider
                                                    ? 'text-white'
                                                    : 'text-green-600'
                                                }`}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* EMI Calculator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-xl"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        EMI Calculator
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Loan Amount: {formatCurrency(loanAmount)}
                                </label>
                                <input
                                    type="range"
                                    min="50000"
                                    max="1000000"
                                    step="10000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                />
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    <span>₹50K</span>
                                    <span>₹10L</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tenure: {tenure} Years
                                </label>
                                <input
                                    type="range"
                                    min="3"
                                    max="10"
                                    step="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                />
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    <span>3 Years</span>
                                    <span>10 Years</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4">
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <Percent className="w-5 h-5 text-orange-600" />
                                    <span className="font-semibold">
                                        Interest Rate: {selectedLoan.interestRate}% p.a.
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Provider: {selectedLoan.provider}
                                </p>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <p className="text-sm text-gray-600 mb-2">Monthly EMI</p>
                                <p className="text-4xl font-bold text-orange-600">
                                    {formatCurrency(emi)}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <p className="text-sm text-gray-600 mb-2">Total Payment</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalPayment)}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <p className="text-sm text-gray-600 mb-2">Total Interest</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalInterest)}
                                </p>
                            </div>

                            <div className="bg-orange-600 text-white rounded-xl p-4 flex items-center gap-3">
                                <TrendingDown className="w-6 h-6" />
                                <p className="text-sm">
                                    Your solar savings will likely exceed your EMI payment!
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
