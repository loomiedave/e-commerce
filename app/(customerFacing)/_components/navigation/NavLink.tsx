'use client'

import { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; 

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
