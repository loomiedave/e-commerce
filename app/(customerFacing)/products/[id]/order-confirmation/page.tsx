import Image from 'next/image'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/formatters'
import { Button } from '@/components/ui/button'

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;
  const productId = resolvedSearchParams?.productId;

  const product = await prisma.product.findUnique({
      where: { id: productId }
  })

  if (!product) {
    return notFound()
  }

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          We have received your order for <strong>{product.name}</strong>.
          <br />
          You will be contacted soon by our stylist to confirm measurements and payment details.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="aspect-square flex-shrink-0 w-1/3 relative">
          <Image
            className="object-cover rounded-md"
            src={product.imagePath}
            alt={product.name}
            fill
          />
        </div>
        <div>
          <div className="font-bold text-2xl">
            {formatCurrency(product.price)}
          </div>
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="line-clamp-4 text-muted-foreground">
            {product.description}
          </div>
          <Button className="mt-4" size="lg" asChild >
            <a href={`/products/download/${await createDownloadVerification(product.id)}`}>
              Download Your Order
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

async function createDownloadVerification(productId: string) {
  return (await prisma.downloadVerification.create({
     data: { productId, expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
   })).id
}