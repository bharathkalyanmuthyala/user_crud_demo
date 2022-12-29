import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar/Navigationbar'


function RootLayout() {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default RootLayout