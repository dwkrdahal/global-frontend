import React from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const PageTitle = ({ title, breadCrumbs=[], link }) => {
  const location = useLocation();

  return (
    <>
         <div className="d-flex justify-content-between align-items-center">
        <h1 className="mt-4">{title}</h1>
        {link && (
          <>
            {link.onClick ? (
              <Button
                variant="info"
                size="sm"
                onClick={link.onClick}
                className="d-flex align-items-center"
              >
                {link.icon && <i className={`${link.icon} me-2`}></i>}
                {link.label}
              </Button>
            ) : (
              <NavLink to={link.to} className="btn btn-sm btn-info d-flex align-items-center">
                {link.icon && <i className={`${link.icon} me-2`}></i>}
                {link.label}
              </NavLink>
            )}
          </>
        )}
      </div>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <NavLink to="/admin">Dashboard</NavLink>
        </li>
        {breadCrumbs.map(({ name, path }, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === breadCrumbs.length - 1 ? "active" : ""
            }`}
          >
            {index === breadCrumbs.length - 1 ? (
              name
            ) : (
              <NavLink to={path}>{name}</NavLink>
            )}
          </li>
        ))}
      </ol>
    </>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  breadCrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ).isRequired,
  link: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
  }),
};


export default PageTitle;
