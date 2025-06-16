import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { Link } from "react-router";



export function SideBar() {
  return (
    <Sidebar    style={{ height: "100vh",   position: "fixed", background: "#FDFBF7 !important" }} aria-label="Sidebar with multi-level dropdown example">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}  as={Link} to="/admin">
            Dashboard
          </SidebarItem>
          <SidebarCollapse icon={HiShoppingBag} label="E-commerce">
            <SidebarItem href="#">Products</SidebarItem>
            <SidebarItem href="#">Sales</SidebarItem>
            <SidebarItem href="#">Refunds</SidebarItem>
            <SidebarItem href="#">Shipping</SidebarItem>
          </SidebarCollapse>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}  as={Link} to="/admin/users">
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable} as={Link} to="/admin/profile">
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>

  )
}

export default SideBar
