import React from 'react'
// import CourseList from '../../components/CourseList/CourseList'
import Voyti from '../SignIn/SignIn'
import Register from '../Sign up/SignUp'
import Products from '../../components/products/Products'
import Block1 from '../../components/Block-1/Block1'
import Block2 from '../../components/Block2/Block2'
// import CourseChat from '../../components/CoursesChat/CourseChat'
import Author from '../../components/Author/Author'
import Chat from '../../components/Chat/Chat'
import Recommendation from '../../components/Recommendation/Recommendation'
import Otzyvy from '../../components/otsyvy/otzyvy'
import Trust from '../../components/trust/Trust'
import CourseCover from '../../components/CourseCover/CourseCover'
import Login from '../SignIn/SignIn'
import Profile from '../../components/Profile/Profile'
import Personal from '../../components/personal/Personal'
import Quiz from '../../components/Quiz/Quiz'

function Home() {
  return (
    <div>
      {/* <Voyti/>
      <Register/> */}
      <Block1/>
      <Block2/>
      <Recommendation/>
      <Author/>
      <Otzyvy/>
      <Trust/>
      {/* <CourseCover/> */}
      <Chat/>
      <Personal/>
      <Profile/>
      <Quiz/>
      {/* <Login/> */}
      {/* <CourseChat/> */}
    </div>
  )
}

export default Home
