"use server"
import { z } from "zod"
import fs from "fs/promises"
import  prisma  from "@/lib/prisma"
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"

const fileSchema = z.instanceof(File, {message: "File is required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().int().min(1),
    description: z.string().min(1),
    file: fileSchema.refine(file => file.size > 0, "File is required"),
    image: imageSchema.refine(file => file.size > 0, "File is required")
})

export async function addProduct(prevState: unknown,formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
     if (result.success === false) {
        return result.error.formErrors.fieldErrors
     }

     const data =  result.data

     await fs.mkdir("products", {recursive: true})
     const filepath = `products/${crypto.randomUUID()}-${data.file.name}`
     await fs.writeFile(filepath, Buffer.from(await data.file.arrayBuffer()))

     await fs.mkdir("public/products", {recursive: true})
     const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
     await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

     await prisma.product.create({
        data: {
            isAvailableForPurchase: false,
            name: data.name,
            price: data.price,
            description: data.description,
            filepath,
            imagePath,
        }
     })
    
     revalidatePath("/")
     revalidatePath("/products")
     redirect("/admin/products")
}


const editSchema = addSchema.extend({
     file: fileSchema.optional(),
     image: imageSchema.optional() 
})
 
export async function updateProduct(id: string, prevState: unknown,formData: FormData) {
const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
    return result.error.formErrors.fieldErrors
    }

    const data =  result.data
    const product = await prisma.product.findUnique({
        where: { id }
    })

    if(product == null) return notFound()
    
    let filepath = product.filepath
    if (data.file != null && data.file.size > 0) {
        await fs.unlink(product.filepath)
        filepath = `products/${crypto.randomUUID()}-${data.file.name}`
        await fs.writeFile(filepath, Buffer.from(await data.file.arrayBuffer()))
    }
    let imagePath = product.imagePath
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${product.imagePath}`)
        imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
        
    }

    await prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            filepath,
            imagePath,
          }
    })

    revalidatePath("/")
    revalidatePath("/products")
    redirect("/admin/products")
}

        
export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
    await prisma.product.update({
        where: { id },
        data: { isAvailableForPurchase }
    })

     revalidatePath("/")
     revalidatePath("/products")
}

export async function deleteProduct(id: string) {
    const product = await prisma.product.delete({
        where: { id }
    })
    if(product == null) return notFound()

    fs.unlink(product.filepath)
    fs.unlink(`public${product.imagePath}`)

     revalidatePath("/")
     revalidatePath("/products")
}