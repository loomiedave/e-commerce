 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

  import prisma from "@/lib/prisma"
  import  PageHeader  from "../_components/PageHeader"
  import { formatNumber } from "@/lib/formatters"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
  import { MoreVertical } from "lucide-react"
  import { DeleteDropDownItem } from "./_components/UserActions"
  
  function getUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        orders: { select: { phone: true } },
      },
      orderBy: { createdAt: "desc" },
    })
  }
  
  export default function UsersPage() {
    return (
      <>
        <PageHeader>Customers</PageHeader>
        <UsersTable />
      </>
    )
  }
  
  async function UsersTable() {
    const users = await getUsers()
  
    if (users.length === 0) return <p>No customers found</p>
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Contacts</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatNumber(user.orders.length)}</TableCell>
              <TableCell>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {[...new Set(user.orders.map((order: any) => order.phone))].join(", ")}
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropDownItem id={user.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }