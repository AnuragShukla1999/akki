import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import '../styles/Layout.css'

const Layout = () => {
  return (
    <div id='layout'>

      <Sidebar />

      <div className='main-container'>
        <Navbar />
        <Outlet />
      </div>

    </div>
  )
}

export default Layout
