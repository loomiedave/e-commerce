import { Suspense } from "react"
import ProductCardSkeleton from "@/components/ProductCardSkeleton"
import  prisma  from "@/lib/prisma"
import ProductCard from "@/components/ProductCard"
import { cache } from '@/lib/cache'
import SectionSlider from "./../_components/SectionSlider" 

const getProducts = cache (() => {
    return prisma.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { name: "asc" }})
}, ["/products", "getProducts"],
)


export default function ProductsPage() {
    return (
        <div>
            <SectionSlider />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={
                    <>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                    </>
                }>
                    <ProductsSuspense />
                </Suspense>
            </div>
        </div>
    )
}

async function ProductsSuspense(){
    const products = await getProducts()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return products.map((product: any) => (
        <ProductCard key={product.id} {...product}/>
    )) 
}