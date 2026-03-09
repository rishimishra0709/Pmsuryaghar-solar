'use client';

import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, Leaf, Sun } from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface FooterProps {
    company: CompanyData;
}

export default function Footer({ company }: FooterProps) {
    const { contact } = company;

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#080c18] text-white pt-16 pb-8 relative overflow-hidden">
            {/* Subtle background orb */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-orange-900/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 relative">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
                                <Sun className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-emerald-400 font-jakarta">
                                {company.name}
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-4 text-sm">{company.tagline}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{company.description}</p>
                        <div className="flex items-center gap-2 mt-6 text-emerald-400/70 text-xs">
                            <Leaf className="w-3 h-3" />
                            <span>Powered by clean renewable energy</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-5 font-jakarta">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', id: 'hero' },
                                { label: 'PM Yojana', id: 'pm-yojana' },
                                { label: 'Products', id: 'products' },
                                { label: 'Calculator', id: 'calculator' },
                                { label: 'Testimonials', id: 'testimonials' },
                                { label: 'Contact', id: 'contact' },
                            ].map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm group flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-5 font-jakarta">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                                <p className="text-gray-400 text-sm">
                                    {contact.address}<br />
                                    {contact.city}, {contact.state} - {contact.pincode}
                                </p>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">{contact.phone}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">{contact.email}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Map & Social */}
                    <div>
                        <h4 className="text-lg font-bold mb-5 font-jakarta">Find Us</h4>
                        <div className="mb-6 rounded-xl overflow-hidden border border-white/5">
                            <iframe
                                src={contact.mapEmbedUrl}
                                width="100%"
                                height="180"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-3 text-gray-400">Follow Us</h4>
                            <div className="flex gap-3">
                                {contact.socialMedia.facebook && (
                                    <a href={contact.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-2.5 rounded-full hover:bg-emerald-600 hover:border-emerald-600 transition-all" aria-label="Facebook">
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                )}
                                {contact.socialMedia.instagram && (
                                    <a href={contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 pَ-2.5 rounded-full hover:bg-emerald-600 hover:border-emerald-600 transition-all" aria-label="Instagram">
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                )}
                                {contact.socialMedia.linkedin && (
                                    <a href={contact.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-2.5 rounded-full hover:bg-emerald-600 hover:border-emerald-600 transition-all" aria-label="LinkedIn">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}
                                {contact.socialMedia.twitter && (
                                    <a href={contact.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-2.5 rounded-full hover:bg-emerald-600 hover:border-emerald-600 transition-all" aria-label="Twitter">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} {company.name}. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <button className="text-gray-500 hover:text-emerald-400 transition-colors">Privacy Policy</button>
                            <button className="text-gray-500 hover:text-emerald-400 transition-colors">Terms of Service</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
