import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHelmet } from '../../../components/admin'

export default function ProjectPage() {
  return (
    <>
    <AdminHelmet
        title="Project"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/project"
      />
      <div className="container px-4">
        <Outlet/>
      </div>
      
    </>
  )
}
