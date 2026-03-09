'use client';

import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanyData } from '@/lib/types';

interface NavbarProps {
    company: CompanyData;
}

export default function Navbar({ company }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { label: 'Home', id: 'hero' },
        { label: 'PM Yojana', id: 'pm-yojana' },
        { label: 'Products', id: 'products' },
        { label: 'Calculator', id: 'calculator' },
        { label: 'Testimonials', id: 'testimonials' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-[#080c18]/80 backdrop-blur-xl border-b border-white/10"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20 md:h-[88px]">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-white tracking-wide">
                                {company.name}
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="font-medium text-white/90 hover:text-amber-400 transition-colors tracking-wide text-sm"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <a
                                href={`tel:${company.contact.phone}`}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2.5 rounded-full font-semibold hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg hover:shadow-orange-500/25"
                            >
                                <Phone className="w-4 h-4" />
                                Call Now
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2.5 rounded-xl transition-all duration-300 text-white bg-white/5 hover:bg-white/15 border border-white/10"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] md:hidden transition-opacity"
                        />

                        {/* Sliding Menu */}
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#080c18]/95 backdrop-blur-xl border-r border-white/10 z-[120] md:hidden flex flex-col shadow-2xl"
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 h-20 md:h-[88px]">
                                <h2 className="text-xl font-bold text-white tracking-wide">{company.name}</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => scrollToSection(link.id)}
                                        className="block w-full text-left px-5 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-200 font-medium tracking-wide"
                                    >
                                        {link.label}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Bottom CTA */}
                            <div className="p-6 border-t border-white/10">
                                <a
                                    href={`tel:${company.contact.phone}`}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:from-orange-400 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-orange-500/25 group"
                                >
                                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Call Now
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
