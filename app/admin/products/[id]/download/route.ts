import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    // Await the params promise
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id },
        select: {filepath: true, name: true},
    })

    if (product == null ) return notFound()
    
    const { size } = await fs.stat(product.filepath)
    const file = await fs.readFile(product.filepath)
    const extension = product.filepath.split(".").pop()

    return new NextResponse(file,{headers:{
        "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
        "Content-Length": size.toString(),
    },
 })
}