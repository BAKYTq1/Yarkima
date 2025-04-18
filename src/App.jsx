import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { myRouter } from './router'
import './App.css'
function App() {
  return (    // тийишпегиле 
<div>         
      <RouterProvider router={myRouter} />
    </div>
  )
}

export default App
