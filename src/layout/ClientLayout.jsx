import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/client/Header'
import Footer from '../components/client/Footer';


const ClientLayout = () => {
  return (
    <div>

        <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default ClientLayout
