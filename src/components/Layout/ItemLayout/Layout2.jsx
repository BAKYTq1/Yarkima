import React from 'react'
import { Outlet } from 'react-router-dom'
import Infoblock from '../../infoblock/Infoblock'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

function Layout2() {
  return (
    <>
    <Header/>
    <div style={{display: 'flex', justifyContent: 'space-between', paddingLeft: '60px'}}>
       <Outlet/>
        <Infoblock/>
    </div>
        <Footer/>
    </>
  )
}

export default Layout2
