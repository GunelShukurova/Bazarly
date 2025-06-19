import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser,HiLogout, } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { MdReviews } from "react-icons/md";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { BsFillBoxSeamFill } from "react-icons/bs";

export function SideBar() {

    const navigate = useNavigate();

  const handleSignOut = () => {

    localStorage.removeItem("admin"); 

    navigate("/admin/login");
  };
  return (
    <Sidebar    className="custom-sidebar"  style={{ height: "100vh",  position: "fixed" }} >
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem icon={HiChartPie}>
            <Link to="/admin">Dashboard</Link>
          </SidebarItem>

          <SidebarItem icon={HiUser}>
            <Link to="/admin/users">Users</Link>
          </SidebarItem>

          <SidebarItem icon={HiShoppingBag}>
            <Link to="/admin/products">Products</Link>
          </SidebarItem>
   <SidebarItem icon={BsFillBoxSeamFill}>
            <Link to="/admin/products/orders">Products in Orders</Link>
          </SidebarItem>
          <SidebarItem icon={MdReviews}>
            <Link to="/admin/reviews">Reviews</Link>
          </SidebarItem>

          <SidebarItem icon={BiSolidMessageAltDetail}>
            <Link to="/admin/messages">Messages</Link>
          </SidebarItem>

          <SidebarItem icon={HiLogout}  onClick={handleSignOut}>
            <span>Sign Out</span>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>

  )
}

export default SideBar
