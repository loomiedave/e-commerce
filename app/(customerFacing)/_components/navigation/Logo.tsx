import Link from "next/link";

interface LogoProps {
    onLogoClick?: () => void;
}

export function Logo({ onLogoClick }: LogoProps) {
    return (
        <div className="flex-shrink-0">
            <Link 
                href="/" 
                className="group flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
                onClick={onLogoClick}
            >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-slate-800 to-slate-600 rounded-md flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                    <span className="text-white font-bold text-sm lg:text-base">CE</span>
                </div>
                <div className="hidden sm:block">
                    <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        CHYME EMENIKE
                    </span>
                    <p className="text-xs text-slate-500 -mt-1 tracking-wider">BESPOKE TAILORING</p>
                </div>
            </Link>
        </div>
    );
}
