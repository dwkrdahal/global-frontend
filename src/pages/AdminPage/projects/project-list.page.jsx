import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { PageTitle } from "../../../components/admin";
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

  const fetchProjects = async () => {
    try {
      const result = await fetch(projectURL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();
      console.log(data);

      if (data.status) {
        // console.log(data.result);
        setProjects(data.result);
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
        <Row>
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <Col
                key={project._id}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={3}
                className="mb-4"
              >
                <Card className="project-card h-100">
                  <div className="image-container">
                    <Slider {...sliderSettings}>
                      {project?.images?.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={myService.getRelativePath(image?.url)} // Your image handling method
                          className="d-block w-100 project-image"
                          alt={project.title}
                        />
                      ))}
                    </Slider>
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
                      className=" btn btn-outline-info mt-auto"
                    >
                      View Details
                    </NavLink>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <>Data Not found</>
          )}
        </Row>
      </Container>
    </>
  );
}
