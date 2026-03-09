'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { CompanyData } from '@/lib/types';

interface WhatsAppButtonProps {
    company: CompanyData;
}

export default function WhatsAppButton({ company }: WhatsAppButtonProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        const message = encodeURIComponent(
            `Hi ${company.name}, I'm interested in solar installation. Please provide more details.`
        );
        const whatsappUrl = `https://wa.me/${company.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/* WhatsApp Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 right-6 z-40"
            >
                <div className="relative">
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="absolute bottom-full right-0 mb-4 bg-white text-gray-900 px-4 py-3 rounded-xl shadow-xl whitespace-nowrap"
                            >
                                <p className="font-semibold">Need help? Chat with us!</p>
                                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Button */}
                    <button
                        onClick={handleClick}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="group relative bg-[#25D366] hover:bg-[#20BD5C] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
                        aria-label="Chat on WhatsApp"
                    >
                        {/* Pulse Animation */}
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>

                        {/* Real WhatsApp Icon from react-icons */}
                        <FaWhatsapp className="w-9 h-9 relative z-10" />
                    </button>
                </div>
            </motion.div>
        </>
    );
}
