import { Nav, NavLink } from "@/app/(customerFacing)/_components/navigation/Nav";

export const dynamic = "force-dynamic"

export default function Adminlayout({ children,}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <>
         <Nav>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/users">Customers</NavLink>
            <NavLink href="/admin/orders">Orders</NavLink>
         </Nav>
         <div className="container m-6">{children}</div>
      </>
    );
  }