// /app/products/[id]/page.tsx
import  prisma  from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProductPage({ params }: { params: { id: string } }) {

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <img
        src={product.imagePath}
        alt={product.name}
        className="w-full h-auto rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>
      
      <Button asChild size="lg" className="w-full">
         <Link href={`/products/${product.id}/place-order`}>Place Order</Link>
      </Button>
    </div>
  );
}
