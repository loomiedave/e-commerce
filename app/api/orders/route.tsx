import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import OrderReceiptEmail from "@/email/OrderReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, measurements, message, productId } = await req.json();

    const user = await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });

    // Store the created order in a variable
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        productId,
        phone,
        measurements,
        message,
        name,
      },
    });

    // You'll also need to fetch the product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (product == null) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const downloadVerification = await prisma.downloadVerification.create({
      data: {
        productId,
        expiredAt: new Date(Date.now() + 1000 * 60 * 24),
      },
    });

    await resend.emails.send({
      from: `Chyme Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Your order Confirmation",
      react: (
        <OrderReceiptEmail
          order={{
            ...order,
            message: order.message || "" // Convert null to empty string
          }}
          product={product}
          downloadVerificationId={downloadVerification.id}
        />
      ),
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error('Order processing failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to process order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}