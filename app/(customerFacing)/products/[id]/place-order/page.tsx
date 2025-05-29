import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import CustomOrderForm from "../_components/CustomOrderForm"



export default async function PlaceOrderPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id }
  })

  if(product == null) return notFound()

  return <CustomOrderForm product={product} />

}