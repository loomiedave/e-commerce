import PageHeader from "../../../_components/PageHeader"
import ProductForm from "../../_components/ProductForm"
import prisma from "@/lib/prisma"

export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params promise
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id }
  })

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product}/>
    </>
  )
}