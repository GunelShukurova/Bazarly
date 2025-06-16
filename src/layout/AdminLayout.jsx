import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/admin/SideBar';


const AdminLayout = () => {
  return (
    <div>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
