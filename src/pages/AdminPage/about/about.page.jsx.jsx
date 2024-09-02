import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AboutPage() {
  return (
    <>
      <div className="container px-4">
        {/* <h1 className='mt-4'>About Page</h1> */}
        <Outlet/>
      </div>
      
    </>
  )
}
