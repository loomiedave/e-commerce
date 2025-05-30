import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock, Scissors, Award, Users } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-white to-slate-200 rounded-lg flex items-center justify-center shadow-lg">
                                    <span className="text-slate-800 font-bold text-lg">CE</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">CHYME EMENIKE</h3>
                                    <p className="text-slate-300 text-sm tracking-wider">BESPOKE TAILORING</p>
                                </div>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Crafting exceptional menswear with precision, style, and attention to detail. 
                                Where tradition meets contemporary elegance.
                            </p>
                        </div>
                        
                        {/* Social Links */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-200">Follow Us</h4>
                            <div className="flex space-x-3">
                                {[
                                    { icon: Facebook, href: "#", label: "Facebook" },
                                    { icon: Instagram, href: "#", label: "Instagram" },
                                    { icon: Twitter, href: "#", label: "Twitter" }
                                ].map(({ icon: Icon, href, label }) => (
                                    <Button
                                        key={label}
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                        className="h-10 w-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:scale-105"
                                    >
                                        <Link href={href} aria-label={label}>
                                            <Icon className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <nav className="space-y-3">
                            {[
                                { name: "All Outfits", href: "/products" },
                                { name: "About Us", href: "/about" },
                                { name: "Contact Us", href: "/contact" }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white">Contact Info</h4>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: MapPin,
                                    title: "Visit Our Store",
                                    content: "123 Fashion District\nLagos, Nigeria"
                                },
                                {
                                    icon: Phone,
                                    title: "Call Us",
                                    content: "+234 xxx xxx xxxx"
                                },
                                {
                                    icon: Mail,
                                    title: "Email Us",
                                    content: "chymeemenike@gmail.com"
                                },
                                {
                                    icon: Clock,
                                    title: "Business Hours",
                                    content: "Mon-Fri: 9AM-6PM\nSat: 10AM-4PM"
                                }
                            ].map(({ icon: Icon, title, content }) => (
                                <div key={title} className="flex space-x-3">
                                    <Icon className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-200">{title}</p>
                                        <p className="text-sm text-slate-300 whitespace-pre-line">{content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        {/* Features */}
                        <div className="space-y-3 pt-4 border-t border-slate-700">
                            {[
                                { icon: Scissors, text: "Expert Craftsmanship" },
                                { icon: Award, text: "Premium Quality" },
                                { icon: Users, text: "Personal Service" }
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center space-x-2">
                                    <Icon className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm text-slate-300">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-center sm:text-left">
                            <p className="text-slate-400 text-sm">
                                © 2025 Chyme Emenike. All rights reserved.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-6 text-sm">
                            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors duration-200">
                                Terms of Service
                            </Link>
                            <Link href="/shipping" className="text-slate-400 hover:text-white transition-colors duration-200">
                                Shipping Info
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}