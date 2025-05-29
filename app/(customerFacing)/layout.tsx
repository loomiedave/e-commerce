import { Footer } from "@/app/(customerFacing)/_components/Footer";
import { Nav, NavLink } from "@/app/(customerFacing)/_components/navigation/Nav";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Shop</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
        <NavLink href="/contact">Contact Us</NavLink>
      </Nav>

      <main className="p-2">{children}</main>

      <Footer />
      </>
  );
}
