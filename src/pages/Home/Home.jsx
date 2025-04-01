import React from 'react'
// import CourseList from '../../components/CourseList/CourseList'
import Voyti from '../Sign in/SignIn'
import Register from '../Sign up/SignUp'
import Products from '../../components/products/Products'
import Block1 from '../../components/Block-1/Block1'
import Block2 from '../../components/Block2/Block2'
// import CourseChat from '../../components/CoursesChat/CourseChat'
import Author from '../../components/Author/Author'
import Chat from '../../components/Chat/Chat'

function Home() {
  return (
    <div>
      {/* <Voyti/>
      <Register/> */}
      <Block1/>
      <Block2/>
      <Author/>
      <Chat/>
      <Voyti/>
      <Register/>
      {/* <CourseChat/> */}
    </div>
  )
}

export default Home
