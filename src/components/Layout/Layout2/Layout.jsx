import React from 'react'
import Header from '../../Header/Header'
import { Outlet } from 'react-router-dom'
import PersonBlock from '../../../pages/Personalbock/PersonBlock'

function Layout3() {
  return (
    <div>
      <Header/>
      <div style={{ margin: 'auto',maxWidth: '1400px' ,display: 'flex', justifyContent: 'space-between'}}>
        <PersonBlock/>
      <Outlet/>
        </div>
    </div>
  )
}

export default Layout3
