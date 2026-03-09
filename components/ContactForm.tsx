'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface ContactFormProps {
    company: CompanyData;
}

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
    city: z.string().min(2, 'City is required'),
    systemSize: z.string().optional(),
    message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm({ company }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    companySlug: company.slug,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block bg-orange-100 text-orange-600 px-6 py-2 rounded-full font-semibold mb-4"
                        >
                            Get in Touch
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                        >
                            Request a Free Quote
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600"
                        >
                            Fill out the form and our team will contact you within 24 hours
                        </motion.p>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    id="name"
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.name
                                            ? 'border-red-500 focus:border-red-600'
                                            : 'border-gray-200 focus:border-orange-600'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email and Phone */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        id="email"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.email
                                                ? 'border-red-500 focus:border-red-600'
                                                : 'border-gray-200 focus:border-orange-600'
                                            }`}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        id="phone"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.phone
                                                ? 'border-red-500 focus:border-red-600'
                                                : 'border-gray-200 focus:border-orange-600'
                                            }`}
                                        placeholder="9876543210"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* City and System Size */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        {...register('city')}
                                        type="text"
                                        id="city"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.city
                                                ? 'border-red-500 focus:border-red-600'
                                                : 'border-gray-200 focus:border-orange-600'
                                            }`}
                                        placeholder="Your city"
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="systemSize" className="block text-sm font-semibold text-gray-700 mb-2">
                                        System Size (Optional)
                                    </label>
                                    <select
                                        {...register('systemSize')}
                                        id="systemSize"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-600 transition-colors"
                                    >
                                        <option value="">Select system size</option>
                                        <option value="1-3kw">1-3 kW</option>
                                        <option value="3-5kw">3-5 kW</option>
                                        <option value="5-10kw">5-10 kW</option>
                                        <option value="10kw+">10 kW+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message (Optional)
                                </label>
                                <textarea
                                    {...register('message')}
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-600 transition-colors resize-none"
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Get Free Quote
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 bg-green-50 border-2 border-green-500 text-green-700 px-6 py-4 rounded-xl"
                                >
                                    <CheckCircle className="w-6 h-6" />
                                    <p className="font-semibold">
                                        Thank you! We'll contact you within 24 hours.
                                    </p>
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 bg-red-50 border-2 border-red-500 text-red-700 px-6 py-4 rounded-xl"
                                >
                                    <AlertCircle className="w-6 h-6" />
                                    <p className="font-semibold">
                                        Something went wrong. Please try again or call us directly.
                                    </p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
