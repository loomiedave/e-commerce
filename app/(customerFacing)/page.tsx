import prisma from "@/lib/prisma"
import { ProductGridSectionProps } from "@/types/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import ProductCardSkeleton from "@/components/ProductCardSkeleton"
import { Suspense } from "react"
import { cache } from '@/lib/cache'
import { HeroSection } from "@/app/(customerFacing)/_components/HeroSection"
import SectionSlider from "./_components/SectionSlider"

const getMostPopularProducts = cache(() => {
    return prisma.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6
    })
}, ["/", "getMostPopularProducts"], { revalidate: 60 * 60 * 24 })

const getNewestProducts = cache(() => {
    return prisma.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6
    })
}, ["/", "getNewestProducts"])

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <SectionSlider />
            
           
            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
                <ProductGridSection 
                    title="Most Popular" 
                    productsFetcher={getMostPopularProducts}
                />
                <ProductGridSection 
                    title="Newest" 
                    productsFetcher={getNewestProducts}
                />
            </div>
        </main>
    )
}

function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
    return (
        <section className="space-y-4 sm:space-y-6">
            {/* Header section with mobile-first responsive design */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                    {title}
                </h2>
                <Button variant="outline" asChild className="self-start sm:self-auto">
                    <Link href="/products" className="flex items-center gap-2">
                        <span>See all</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </div>
            
            {/* Mobile-first responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Suspense fallback={
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                }>
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>
            </div>
        </section>
    )
}
// @ts-expect-error - Prisma types not generated yet
async function ProductSuspense({ productsFetcher }: { productsFetcher: () => Promise<Product[]> }) {
    return (
        (await productsFetcher()).map(product => (
            <ProductCard key={product.id} {...product} />
        ))
    )
}