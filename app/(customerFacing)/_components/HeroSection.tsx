'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 100); 
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Background Pattern */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ease-out ${
                    animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                    {/* Badge */}
                    <div className={`inline-flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-700 delay-200 ${
                        animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                        <Sparkles className="w-4 h-4" />
                        <span>Bespoke Tailoring Excellence</span>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-tight transition-all duration-1000 delay-300 ${
                            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            Crafted for the
                            <span className="block bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
                                Modern Gentleman
                            </span>
                        </h1>
                        
                        <p className={`text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
                            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            Discover exceptional menswear where traditional craftsmanship meets contemporary style. 
                            Each piece is meticulously tailored to perfection.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 transition-all duration-1000 delay-700 ${
                        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <Button 
                            size="lg" 
                            asChild
                            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                        >
                            <Link href="/products" className="flex items-center space-x-2">
                                <span>Shop Collection</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-slate-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-300 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </section>
    );
}
