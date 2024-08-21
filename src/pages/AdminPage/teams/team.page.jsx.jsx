import React from 'react'
import { Outlet } from 'react-router-dom'

export default function TeamPage() {
  return (
    <>
      <div className="container px-4">
        {/* <h1 className='mt-4'>Team Page</h1> */}
        <Outlet/>
      </div>
      
    </>
  )
}
