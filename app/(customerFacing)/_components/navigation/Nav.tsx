'use client'
import { ComponentProps, ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDropdown from "@/components/SearchDropdown";
import { Logo } from "./Logo";

export function Nav({ children }: {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;

            if (showSearch && target.closest('.search-dropdown, .search-button')) {
                return;
            }
            setIsOpen(false);
            setShowSearch(false);
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen, showSearch]);

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
                            <div className="hidden sm:block relative">
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="search-button hover:bg-slate-100 transition-colors duration-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowSearch(!showSearch);
                                    }}
                                    aria-label="Search"
                                >
                                    <Search className="h-5 w-5 text-slate-600" />
                                </Button>
                                
                                {/* Desktop Search Dropdown */}
                                {showSearch && (
                                    <div className="search-dropdown">
                                        <SearchDropdown onClose={() => setShowSearch(false)} />
                                    </div>
                                )}
                            </div>
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
                            
                            {/* Mobile-only links */}
                            <div className="pt-4 mt-4 border-t border-slate-200/50 space-y-2">
                                <div className="relative">
                                    <button 
                                        className="flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 text-slate-600 w-full text-left"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowSearch(!showSearch);
                                        }}
                                    >
                                        <Search className="w-4 h-4" />
                                        <span>Search</span>
                                    </button>
                                    
                                    {/* Mobile Search Dropdown */}
                                    {showSearch && (
                                        <div className="search-dropdown mt-2">
                                            <SearchDropdown onClose={() => setShowSearch(false)} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className"> & { onClick?: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === props.href;
    const { onClick, ...linkProps } = props;
    
    return (
        <Link 
            {...linkProps} 
            onClick={onClick}
            className={cn(
                "relative px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium transition-all duration-300 ease-in-out rounded-lg group",
                "hover:bg-slate-100 hover:text-slate-900 focus-visible:bg-slate-100 focus-visible:text-slate-900",
                "before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-slate-800 before:transition-all before:duration-300 before:-translate-x-1/2",
                "hover:before:w-3/4 focus-visible:before:w-3/4",
                isActive 
                    ? "bg-slate-100 text-slate-900 before:w-3/4" 
                    : "text-slate-600",
                // Mobile styles
                "block lg:inline-block w-full lg:w-auto text-left"
            )}
        />
    );
}

function MobileNavLink({ 
    href, 
    icon, 
    children, 
    onClick 
}: { 
    href: string; 
    icon: ReactNode; 
    children: ReactNode;
    onClick?: () => void;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;
    
    return (
        <Link 
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg",
                "hover:bg-slate-100 hover:text-slate-900 focus-visible:bg-slate-100 focus-visible:text-slate-900",
                isActive 
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-600"
            )}
        >
            {icon}
            <span>{children}</span>
        </Link>
    );
}