import React from "react";
import { PageTitle } from "../../../components/admin";

export default function Dashboard() {

  return (
    <main>
      <div className="container px-4">
        <PageTitle
        title="Diwar Estate Admin Dashboard"
        breadCrumbs={[    ]}
      />
        <div className="card mb-4">
          <div className="card-body">
            <p className="mb-0">
              This page is an example of using static navigation. By removing
              the
              <code>.sb-nav-fixed</code>
              class from the
              <code>body</code>, the top navigation and side navigation will
              become static on scroll. Scroll down this page to see an example.
            </p>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <p className="mb-0">
              This page is an example of using static navigation. By removing
              the
              <code>.sb-nav-fixed</code>
              class from the
              <code>body</code>, the top navigation and side navigation will
              become static on scroll. Scroll down this page to see an example.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
