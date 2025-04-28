import React from 'react'
import Block1 from '../../components/Block-1/Block1'
import Block2 from '../../components/Block2/Block2'
// import CourseChat from '../../components/CoursesChat/CourseChat'
import Author from '../../components/Author/Author'
import Recommendation from '../../components/Recommendation/Recommendation'
import Otzyvy from '../../components/otsyvy/otzyvy'
import Trust from '../../components/trust/Trust'
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
    </div>
  )
}

export default Home
