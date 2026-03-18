'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Leaf, Zap, Calculator, Phone, HelpCircle, Bot } from 'lucide-react';
import { useChat } from './ChatProvider';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function SolarChat() {
    const { isOpen, setIsOpen, messages, addMessage, isTyping, setIsTyping } = useChat();
    const [inputValue, setInputValue] = useState('');
    const [showPeek, setShowPeek] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Show peek after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowPeek(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    // Initial welcome message
    useEffect(() => {
        if (messages.length === 0) {
            addMessage({
                role: 'assistant',
                content: "☀️ Namaste! Welcome to Braj Mohan Solar.\n\nMain aapko solar system choose karne me help kar sakta hu.\n\nAgar aap chahen to main 30 seconds me solar estimate calculate karke bata sakta hu.",
            });
        }
    }, [messages.length, addMessage]);

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        setShowPeek(false);
        addMessage({ role: 'user', content: text });
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history: messages }),
            });
            
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                console.error('Chat API Error Details:', {
                    status: response.status,
                    statusText: response.statusText,
                    data: errData
                });
                throw new Error(errData.details || errData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            let replyText = data.reply || "Maaf kijiyega, system response nahi mil raha. Please try again.";
            
            // Handle Structured Lead Capture
            if (replyText.includes('[LEAD_DATA]')) {
                const dataMatch = replyText.match(/\[LEAD_DATA\]([\s\S]*?)\[\/LEAD_DATA\]/);
                if (dataMatch && dataMatch[1]) {
                    try {
                        const leadInfo = JSON.parse(dataMatch[1].trim());
                        fetch('/api/leads', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(leadInfo)
                        }).then(res => res.json()).then(d => console.log('Lead sync result:', d));
                    } catch (e) {
                        console.error('Failed to parse lead data:', e);
                    }
                }
                // Clean the tag from the UI message
                replyText = replyText.replace(/\[LEAD_DATA\][\s\S]*?\[\/LEAD_DATA\]/, '').trim();
            }

            addMessage({ role: 'assistant', content: replyText });
        } catch {
            addMessage({ role: 'assistant', content: "Maaf kijiyega, kuch error aa gaya. Please dubara try karein." });
        } finally {
            setIsTyping(false);
        }
    };

    const startEstimateFlow = () => {
        addMessage({ role: 'assistant', content: "Chaliye, aapka solar estimate calculate karte hain! Sabse pehle, aap kis Shehar (City) se hain?" });
    };

    const handleQuickAction = (action: string) => {
        if (action === 'estimate') startEstimateFlow();
        else if (action === 'subsidy') handleSendMessage("Tell me about government subsidy");
        else if (action === 'expert') window.open('https://wa.me/919876543210', '_blank'); // Replace with real number
        else if (action === 'installation') handleSendMessage("What is the installation process?");
    };

    return (
        <div className="fixed bottom-32 right-6 z-[9999] flex flex-col items-end">
            <AnimatePresence>
                {showPeek && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        onClick={() => { setIsOpen(true); setShowPeek(false); }}
                        className="mb-4 bg-white px-4 py-2 rounded-2xl shadow-xl border border-emerald-100 cursor-pointer flex items-center gap-2 group whitespace-nowrap"
                    >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-sm font-medium text-gray-700">Need help with Solar? Ask me!</p>
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-emerald-50 rotate-45" />
                    </motion.div>
                )}

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Zap className="w-6 h-6 text-amber-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">Solar Advisor</h3>
                                    <p className="text-xs opacity-80 mt-1">Online | Always here to help</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "max-w-[85%] p-3 rounded-2xl text-sm shadow-sm",
                                        msg.role === 'user' 
                                            ? "bg-emerald-600 text-white rounded-tr-none" 
                                            : "bg-white text-gray-800 border border-emerald-50 rounded-tl-none"
                                    )}>
                                        <div className="whitespace-pre-wrap">{msg.content}</div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-emerald-50 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {messages.length === 1 && (
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <button onClick={() => handleQuickAction('estimate')} className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-100">
                                        <Calculator className="w-4 h-4" /> Start Estimate
                                    </button>
                                    <button onClick={() => handleQuickAction('subsidy')} className="flex items-center gap-2 p-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-semibold hover:bg-amber-100 transition-colors border border-amber-100">
                                        <Leaf className="w-4 h-4" /> Subsidy Info
                                    </button>
                                    <button onClick={() => handleQuickAction('expert')} className="flex items-center gap-2 p-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-100">
                                        <Phone className="w-4 h-4" /> Talk to Expert
                                    </button>
                                    <button onClick={() => handleQuickAction('installation')} className="flex items-center gap-2 p-2 bg-purple-50 text-purple-700 rounded-xl text-xs font-semibold hover:bg-purple-100 transition-colors border border-purple-100">
                                        <HelpCircle className="w-4 h-4" /> Installation Cost
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                />
                                <button type="submit" disabled={!inputValue.trim()} className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-500 disabled:opacity-50 transition-all">
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsOpen(!isOpen); setShowPeek(false); }}
                className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform",
                    isOpen ? "bg-red-500 rotate-90" : "bg-emerald-600 md:w-20 md:h-20"
                )}
            >
                {isOpen ? <X className="w-8 h-8 text-white" /> : <Bot className="w-10 h-10 text-white md:w-12 md:h-12" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
