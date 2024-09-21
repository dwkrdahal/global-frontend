import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./project.css"; // Custom CSS file for additional styles
import Service from "../../../service/ImageService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const myService = new Service();

export default function ListProject() {
  const token = localStorage.getItem("user_token");
  const URL = import.meta.env.VITE_APP_URL;
  const projectURL = URL + "/project";

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("");

  // Status options
  const statusOptions = [
    "planned",
    "in-progress",
    "completed",
    "on-hold",
    "cancelled",
  ];

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const result = await fetch(projectURL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();

      if (data.status) {
        setProjects(data.result);
        setFilteredProjects(data.result);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Network problem!");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  // Sorting Function
  const sortProjects = (criteria) => {
    let sortedProjects = [...filteredProjects];
    if (criteria === "title") {
      sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "time") {
      sortedProjects.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (criteria === "style") {
      sortedProjects.sort((a, b) =>
        a.architectureStyle.localeCompare(b.architectureStyle)
      );
    } else if (criteria === "status") {
      sortedProjects.sort((a, b) =>
        a.projectStatus.localeCompare(b.projectStatus)
      );
    }
    setFilteredProjects(sortedProjects);
    setSortCriteria(criteria);
  };

  // Filter Projects by status and featured flag
  const filterProjects = (status, featured) => {
    let filtered = [...projects];

    // Filter by project status
    if (status !== "") {
      filtered = filtered.filter((project) => project.projectStatus === status);
    }

    // Filter by featured status
    if (featured === "featured") {
      filtered = filtered.filter((project) => project.isFeatured === true);
    } else if (featured === "not-featured") {
      filtered = filtered.filter((project) => project.isFeatured === false);
    } else if (featured === "active") {
      filtered = filtered.filter((project) => project.isActive === true);
    } else if (featured === "inactive") {
      filtered = filtered.filter((project) => project.isActive === false);
    }

    setFilteredProjects(filtered);
    setFilterStatus(status);
    setFilterFeatured(featured);
  };

  // Update filtering whenever status or featured changes
  useEffect(() => {
    filterProjects(filterStatus, filterFeatured);
  }, [filterStatus, filterFeatured, projects]);

  // Search Function
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const searchedProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(term) ||
        project.architectureStyle.toLowerCase().includes(term) ||
        project.projectStatus.toLowerCase().includes(term)
    );
    setFilteredProjects(searchedProjects);
  };

  // Slider settings for image carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <AdminHelmet
        title="Projects"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/project"
      />

      <PageTitle
        title="List Project Page"
        breadCrumbs={[
          { name: "Projects", path: "/admin/project" },
          { name: "List Project" },
        ]}
        link={{
          to: "/admin/project/create",
          label: "Create Project",
          icon: "fas fa-paper-plane",
        }}
      />

      <Container>
        {/* Sorting and Filtering Controls */}
        <Row className="mb-4">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>

          <Col md={3}>
            <Form.Select
              onChange={(e) => sortProjects(e.target.value)}
              value={sortCriteria}
            >
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="time">Time</option>
              <option value="style">Style</option>
              <option value="status">Status</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              onChange={(e) => filterProjects(e.target.value, filterFeatured)}
              value={filterStatus}
            >
              <option value="">All Projects</option>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              onChange={(e) => setFilterFeatured(e.target.value)}
              value={filterFeatured}
            >
              <option value="">All Projects</option>
              <option value="featured">Featured Projects</option>
              <option value="not-featured">Not Featured</option>
              <option value="active">Active</option>
              <option value="inactive">In Active</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Project Listing */}
        <Row>
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Col
                key={project._id}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="mb-4"
              >
                <Card className="project-card h-100">
                  <div className="image-container">
                    {/* Display mainImage if available, otherwise display the first image from the list */}
                    {project.mainImage ? (
                      <img
                        src={myService.getRelativePath(project.mainImage.url)}
                        className="d-block w-100 project-image"
                        alt={project.title}
                      />
                    ) : project.images && project.images.length > 0 ? (
                      <img
                        src={myService.getRelativePath(project.images[0].url)}
                        className="d-block w-100 project-image"
                        alt={project.title}
                      />
                    ) : (
                      <p>No images available</p>
                    )}

                    {/* Conditional "Featured" tag */}
                    {project.isFeatured && (
                      <span className="featured-tag">Featured</span>
                    )}

                    {/* Conditional "Active" tag */}
                    {project.isActive && (
                      <span className="active-tag">Active</span>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="project-title">
                      {project?.title}
                    </Card.Title>

                    <div className="project-meta">
                      <span>
                        <strong>Location:</strong> {project?.location}
                      </span>
                      <span>
                        <strong>Style:</strong> {project?.architectureStyle}
                      </span>
                      <span>
                        <strong>Status:</strong> {project?.projectStatus}
                      </span>
                    </div>
                    <NavLink
                      to={project?._id}
                      variant="primary"
                      className="btn btn-outline-info mt-auto"
                    >
                      View Details
                    </NavLink>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <>Data Not Found</>
          )}
        </Row>
      </Container>
    </>
  );
}
