import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
// import SideBar from './SideBar';


const  SidebarLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}


export default  SidebarLayout