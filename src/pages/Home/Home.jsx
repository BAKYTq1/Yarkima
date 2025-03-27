import React from 'react'
import CourseList from '../../components/CourseList/CourseList'
import Voyti from '../Sign in/SignIn'
import Register from '../Sign up/SignUp'
import Products from '../../components/products/Products'
import Block1 from '../../components/Block-1/Block1'

function Home() {
  return (
    <div>
      home
      <CourseList/>
      {/* <Voyti/>
      <Register/> */}
      <Block1/>
    </div>
  )
}

export default Home
