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

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-orange-100 text-orange-600 px-6 py-2 rounded-full font-semibold mb-4"
                    >
                        Customer Reviews
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
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
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                            >
                                {/* Quote Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="bg-orange-100 p-4 rounded-full">
                                        <Quote className="w-8 h-8 text-orange-600" />
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex justify-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 ${i < currentTestimonial.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
                                    "{currentTestimonial.comment}"
                                </p>

                                {/* Customer Info */}
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                        {currentTestimonial.name}
                                    </h4>
                                    <p className="text-gray-600 mb-4">{currentTestimonial.location}</p>

                                    <div className="flex flex-wrap justify-center gap-4">
                                        <div className="bg-orange-100 px-4 py-2 rounded-full">
                                            <span className="text-sm font-semibold text-orange-900">
                                                System: {currentTestimonial.systemSize}
                                            </span>
                                        </div>
                                        <div className="bg-green-100 px-4 py-2 rounded-full">
                                            <span className="text-sm font-semibold text-green-900">
                                                Savings: {currentTestimonial.savings}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white p-4 rounded-full shadow-xl hover:bg-orange-50 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6 text-orange-600" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white p-4 rounded-full shadow-xl hover:bg-orange-50 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6 text-orange-600" />
                        </button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsAutoPlaying(false);
                                }}
                                className={`transition-all ${index === currentIndex
                                        ? 'w-12 h-3 bg-orange-600'
                                        : 'w-3 h-3 bg-gray-300 hover:bg-orange-300'
                                    } rounded-full`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
