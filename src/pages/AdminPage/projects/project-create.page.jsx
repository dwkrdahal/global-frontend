import React from 'react'
import { PageTitle } from '../../../components/admin'

export default function CreateProject() {
  return (
    <>
      <PageTitle
        title="Create Project Page"
        breadCrumbs={[
          { name: "Projects", path: "/admin/project" },
          { name: "Create Project" },
        ]}
        link={{ to: "/admin/project", label: "List Project", icon: "fas fa-eye" }}
      />
    </>
  )
}
