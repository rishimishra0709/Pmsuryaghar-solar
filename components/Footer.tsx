'use client';

import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { CompanyData } from '@/lib/types';

interface FooterProps {
    company: CompanyData;
}

export default function Footer({ company }: FooterProps) {
    const { contact } = company;

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-orange-400">
                            {company.name}
                        </h3>
                        <p className="text-gray-400 mb-6">{company.tagline}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {company.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
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
                                        className="text-gray-400 hover:text-orange-400 transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        {contact.address}<br />
                                        {contact.city}, {contact.state} - {contact.pincode}
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    {contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    {contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Map & Social */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Find Us</h4>
                        <div className="mb-6">
                            <iframe
                                src={contact.mapEmbedUrl}
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-xl"
                            ></iframe>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
                            <div className="flex gap-3">
                                {contact.socialMedia.facebook && (
                                    <a
                                        href={contact.socialMedia.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 p-3 rounded-full hover:bg-orange-600 transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                )}
                                {contact.socialMedia.instagram && (
                                    <a
                                        href={contact.socialMedia.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 p-3 rounded-full hover:bg-orange-600 transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                                {contact.socialMedia.linkedin && (
                                    <a
                                        href={contact.socialMedia.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 p-3 rounded-full hover:bg-orange-600 transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {contact.socialMedia.twitter && (
                                    <a
                                        href={contact.socialMedia.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 p-3 rounded-full hover:bg-orange-600 transition-colors"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} {company.name}. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <button className="text-gray-400 hover:text-orange-400 transition-colors">
                                Privacy Policy
                            </button>
                            <button className="text-gray-400 hover:text-orange-400 transition-colors">
                                Terms of Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
