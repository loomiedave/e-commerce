import prisma from "@/lib/prisma"
import fs from "fs/promises"
import { NextResponse, NextRequest } from "next/server"

export async function GET(
    req: NextRequest, 
    { params: { downloadVerificationId } }: { params: { downloadVerificationId: string } }
) {
    const data = await prisma.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiredAt: { gt: new Date() } },
        select: { product: { select: { filepath: true, name: true }} }
    })

    if (data == null ) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    } 

    const { size } = await fs.stat(data.product.filepath)
    const file = await fs.readFile(data.product.filepath)
    const extension = data.product.filepath.split(".").pop()

    return new NextResponse(file,{headers:{
        "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
        "Content-Length": size.toString(),
    },
 })
}