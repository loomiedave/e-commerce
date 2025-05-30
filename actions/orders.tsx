"use server"

import prisma from "@/lib/prisma"
import OrderHistoryEmail from "@/email/OrderHistory"
import { Resend } from "resend"
import { z } from "zod"

const emailSchema = z.string().email()
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const result = emailSchema.safeParse(formData.get("email"))

  if (result.success === false) {
    return { error: "Invalid email address" }
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          id: true,
          createdAt: true,
          name: true,           
          phone: true,          
          measurements: true,   
          message: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
              price: true,        
            },
          },
        },
      },
    },
  })

  if (user == null) {
    return {
      message:
        "Check your email to view your order history and download your products.",
    }
  }

  const orders = user.orders.map(async (order: any) => {
    return {
      ...order,
      price: order.product.price,  
      message: order.message || "", 
      downloadVerificationId: (
        await prisma.downloadVerification.create({
          data: {
            expiredAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
            productId: order.product.id,
          },
        })
      ).id,
    }
  })

  const data = await resend.emails.send({
    from: `Chyme Support <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: "Order History",
    react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
  })

  if (data.error) {
    return { error: "There was an error sending your email. Please try again." }
  }

  return {
    message:
      "Check your email to view your order history and download your products.",
  }
}