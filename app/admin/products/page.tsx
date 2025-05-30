import  Link  from "next/link"
import PageHeader from "../_components/PageHeader"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import prisma from "@/lib/prisma"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { DropdownMenuItem, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductAction"

export default function AdminProductsPage() {
    return (
      <>
       <div className="flex justify-between items-center gap-4">
          <PageHeader>Products</PageHeader>
          <Button asChild>
            <Link href="/admin/products/new">Add Product</Link>
          </Button>
       </div>
       <ProductsTable />
     </>
        
    )
}

async function ProductsTable() {
    const products = await prisma.product.findMany(
        {
            select : {
                id: true,
                name: true,
                price: true,
                isAvailableForPurchase: true,
                _count: { select: { orders: true } }
            },
            orderBy: { name: "asc" }
        }
    )

    if (products.length === 0) return <div className="text-muted-foreground">No products found</div>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
               </TableRow>
           </TableHeader>
           <TableBody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {products.map((product: any) => (
                    <TableRow key={product.id}>
                        <TableCell className="w-0">
                            {product.isAvailableForPurchase ? <> 
                            <span className="sr-only">Available For Purchase</span>
                            <CheckCircle2 /> 
                            </> : <> 
                            <span className="sr-only">Not Available For Purchase</span>
                            <XCircle className="stroke-destructive"/> </>}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell className="w-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                             <MoreVertical />
                             <span className="sr-only">Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                <DropdownMenuSeparator />
                                <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                            </DropdownMenuContent>
                          </DropdownMenu> 
                        </TableCell>
                    </TableRow>
                ))}
           </TableBody>
       </Table>
      
    )
}