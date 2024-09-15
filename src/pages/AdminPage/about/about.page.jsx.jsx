import React from 'react'
import { Outlet } from 'react-router-dom'
import { PageTitle } from '../../../components/admin'

export default function AboutPage() {
  return (
    <>
      <div className="container px-4">
        <Outlet/>
      </div>
      
    </>
  )
}
