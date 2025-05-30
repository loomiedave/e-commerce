'use client'
import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export function Nav({ children }: {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
           // eslint-disable-next-line
            const target = e.target as Element;
            setIsOpen(false);
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    const handleNavClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled 
                    ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50" 
                    : "bg-white/80 backdrop-blur-sm"
            )}>
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                       <Logo onLogoClick={handleNavClick} />

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {children}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            {/* Search - Hidden on mobile */}
                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden hover:bg-slate-100 transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(!isOpen);
                                }}
                                aria-label="Toggle menu"
                            >
                                <div className="relative w-6 h-6">
                                    <Menu 
                                        className={cn(
                                            "absolute inset-0 transition-all duration-300 transform",
                                            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                        )}
                                    />
                                    <X 
                                        className={cn(
                                            "absolute inset-0 transition-all duration-300 transform",
                                            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                                        )}
                                    />
                                </div>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={cn(
                        "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen ? "max-h-full opacity-50" : "max-h-0 opacity-0"
                    )}>
                        <div className="py-4 space-y-1 border-t border-slate-200/50 bg-white/95 backdrop-blur-sm">
                            <div onClick={handleNavClick}>
                                {children}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
