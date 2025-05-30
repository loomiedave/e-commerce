  
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
      <div className="w-full">
      {/* Mobile view - Card layout */}
      <div className="block md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-900">{order.product.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Customer</span>
                <span className="text-sm text-gray-900">{order.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className="text-sm text-gray-900 truncate ml-2">{order.user.email}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Phone</span>
                <span className="text-sm text-gray-900">{order.phone}</span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Unit Price</span>
                <span className="text-sm font-semibold text-gray-900">{order.product.price}</span>
              </div>
              
              {order.measurements && (
                <div className="pt-2 border-t border-gray-400">
                  <span className="text-sm font-medium text-gray-500">Measurements</span>
                  <p className="text-sm text-gray-900 mt-1">{order.measurements}</p>
                </div>
              )}
              
              {order.message && (
                <div className="pt-2 border-t border-gray-400">
                  <span className="text-sm font-medium text-gray-500">Message</span>
                  <p className="text-sm text-gray-900 mt-1">{order.message}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }