import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminServicePage() {
  return (
    <>
      <div className="container px-4">
        <Outlet/>
      </div>
      
    </>
  )
}
