'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface TestimonialsCarouselProps {
    company: CompanyData;
}

export default function TestimonialsCarousel({ company }: TestimonialsCarouselProps) {
    const { testimonials } = company;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const goToPrevious = () => { setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length); setIsAutoPlaying(false); };
    const goToNext = () => { setCurrentIndex((prev) => (prev + 1) % testimonials.length); setIsAutoPlaying(false); };
    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50/50">
            {/* Floating accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[80px] pointer-events-none animate-float" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-100/40 rounded-full blur-[60px] pointer-events-none animate-float-delayed" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 border border-emerald-200 px-6 py-2 rounded-full font-semibold mb-4"
                    >
                        Customer Reviews
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-jakarta"
                    >
                        What Our Customers Say
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
                        Real experiences from real customers who made the switch to solar
                    </motion.p>
                </div>

                {/* Carousel */}
                <div className="max-w-5xl mx-auto">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
                            >
                                {/* Quote Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="bg-emerald-100 p-4 rounded-full border border-emerald-200">
                                        <Quote className="w-8 h-8 text-emerald-600" />
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex justify-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 ${i < currentTestimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
                                    &quot;{currentTestimonial.comment}&quot;
                                </p>

                                {/* Customer Info */}
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2 font-jakarta">
                                        {currentTestimonial.name}
                                    </h4>
                                    <p className="text-gray-500 mb-4">{currentTestimonial.location}</p>

                                    <div className="flex flex-wrap justify-center gap-4">
                                        <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-full">
                                            <span className="text-sm font-semibold text-amber-800">System: {currentTestimonial.systemSize}</span>
                                        </div>
                                        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
                                            <span className="text-sm font-semibold text-emerald-800">Savings: {currentTestimonial.savings}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white p-4 rounded-full shadow-xl hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 transition-all"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6 text-emerald-600" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white p-4 rounded-full shadow-xl hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 transition-all"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6 text-emerald-600" />
                        </button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
                                className={`transition-all ${index === currentIndex ? 'w-10 h-3 bg-emerald-600' : 'w-3 h-3 bg-gray-200 hover:bg-emerald-300'} rounded-full`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
