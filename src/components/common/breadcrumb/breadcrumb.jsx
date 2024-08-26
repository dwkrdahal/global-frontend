import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./breadcrumb.css";

function BreadCrumb({ args }) {
  return (
    <div className="breadcrumb-wrapper">
      <Breadcrumb className="breadcrumb-container">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <span className="breadcrumb-divider">/</span>
        <Breadcrumb.Item active>{args}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
