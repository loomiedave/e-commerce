  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
  import prisma from "@/lib/prisma"
  import   PageHeader from "../_components/PageHeader"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
  import { MoreVertical } from "lucide-react"
  import { DeleteDropDownItem } from "./_components/OrderActions"
  
  function getOrders() {
    return prisma.order.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        message: true,
        measurements: true,
        product: { select: { name: true, price: true } },
        user: { select: { email: true } },
      },
      orderBy: { createdAt: "desc" },
    })
  }
  
  export default function OrdersPage() {
    return (
      <>
        <PageHeader>Orders</PageHeader>
        <OrdersTable />
      </>
    )
  }
  
  async function OrdersTable() {
    const orders = await getOrders()
  
    if (orders.length === 0) return <p>No sales found</p>
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Measurements</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>{order.measurements}</TableCell>
              <TableCell>{order.message}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.product.price}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropDownItem id={order.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }