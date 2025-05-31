"use server"
import { z } from "zod"
import  prisma  from "@/lib/prisma"
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const fileSchema = z.instanceof(File, {message: "File is required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().int().min(1),
    description: z.string().min(1),
    file: fileSchema.refine(file => file.size > 0, "File is required"),
    image: imageSchema.refine(file => file.size > 0, "File is required")
})

export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
      return result.error.formErrors.fieldErrors;
    }
  
    const data = result.data;
  
    const fileBuffer = Buffer.from(await data.file.arrayBuffer()).toString("base64");
    const imageBuffer = Buffer.from(await data.image.arrayBuffer()).toString("base64");
  
    const fileUpload = await cloudinary.uploader.upload(
      `data:${data.file.type};base64,${fileBuffer}`,
      {
        resource_type: "auto",
        folder: "products/files",
      }
    );
  
    const imageUpload = await cloudinary.uploader.upload(
      `data:${data.image.type};base64,${imageBuffer}`,
      {
        resource_type: "image",
        folder: "products/images",
      }
    );
  
    await prisma.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        price: data.price,
        description: data.description,
        filepath: fileUpload.secure_url,
        imagePath: imageUpload.secure_url,
      },
    });
  
    revalidatePath("/");
    revalidatePath("/products");
    redirect("/admin/products");
  }

const editSchema = addSchema.extend({
     file: fileSchema.optional(),
     image: imageSchema.optional() 
})
 
export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
      return result.error.formErrors.fieldErrors;
    }
  
    const data = result.data;
    const product = await prisma.product.findUnique({ where: { id } });
  
    if (!product) return notFound();
  
    let filepath = product.filepath;
    if (data.file && data.file.size > 0) {
      const fileBuffer = Buffer.from(await data.file.arrayBuffer()).toString("base64");
  
      const fileUpload = await cloudinary.uploader.upload(
        `data:${data.file.type};base64,${fileBuffer}`,
        {
          resource_type: "auto",
          folder: "products/files",
        }
      );
  
      filepath = fileUpload.secure_url;
    }
  
    let imagePath = product.imagePath;
    if (data.image && data.image.size > 0) {
      const imageBuffer = Buffer.from(await data.image.arrayBuffer()).toString("base64");
  
      const imageUpload = await cloudinary.uploader.upload(
        `data:${data.image.type};base64,${imageBuffer}`,
        {
          resource_type: "image",
          folder: "products/images",
        }
      );
  
      imagePath = imageUpload.secure_url;
    }
  
    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        filepath,
        imagePath,
      },
    });
  
    revalidatePath("/");
    revalidatePath("/products");
    redirect("/admin/products");
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

     revalidatePath("/")
     revalidatePath("/products")
}