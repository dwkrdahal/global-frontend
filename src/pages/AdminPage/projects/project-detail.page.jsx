import { useParams } from "react-router-dom";
import { PageTitle } from "../../../components/admin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Form,
  Button,
} from "react-bootstrap";
import "./project.css";

import Service from "../../../service/ImageService";
import { InformationComponent, LocationComponent } from "./project.component";
const myService = new Service();

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const token = localStorage.getItem("user_token");

  const params = useParams();
  const id = params.id;

  const URL = import.meta.env.VITE_APP_URL;
  const projectURL = URL + "/project/" + id;

  const fetchProject = async () => {
    try {
      const result = await fetch(projectURL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await result.json();

      if (data.status) {
        setProject(data.result);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (!project) return null;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };

  const handleDiscard = () => {
    // Implement discard logic here
    setIsEditing(false);
  };

  return (
    <>
      <PageTitle
        title="Project Detail Page"
        breadCrumbs={[
          { name: "Projects", path: "/admin/project" },
          { name: "Project" },
        ]}
        link={{
          to: "/admin/project/create",
          label: "Create Project",
          icon: "fas fa-paper-plane",
        }}
      />

      <Container className="project-detail-container">
        {isEditing ? (
          <div className="mb-4 d-flex justify-content-end">
            <Button variant="success" className="me-2" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleDiscard}>
              Discard
            </Button>
          </div>
        ) : (
          <Button variant="primary" className="mb-4" onClick={handleEditToggle}>
            Edit Project
          </Button>
        )}

        {/* Sectioned Information */}
        <Row>
          <Col lg={8}>
            {/* Project Information */}
            <InformationComponent
              project={project}
              projectURL = {projectURL}
              token = {token}
            />

            {/* Location Details */}
            <LocationComponent
              project={project}
              projectURL = {projectURL}
            />

            {/* Client Information */}
            <Card className="project-detail-card mb-4">
              <Card.Header as="h5" className="section-title">
                Client Information
              </Card.Header>
              <Card.Body>
                <Form.Group controlId="clientName">
                  <Form.Label>
                    <strong>Client Name</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={project.client?.name || ""}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                  
                </Form.Group>
                <Row>
                  <Col>
                <Form.Group controlId="clientContact">
                  <Form.Label>
                    <strong>Email</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={project.client?.contact?.email || ""}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="clientContact">
                  <Form.Label>
                    <strong>Phone</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={project.client?.contact?.phone[0] || ""}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
                </Col>
                </Row>
              </Card.Body>
            </Card>
            

            {/* Sustainability Features */}
            <Card className="project-detail-card mb-4">
              <Card.Header as="h5" className="section-title">
                Sustainability Features
              </Card.Header>
              <Card.Body>
                <ul>
                  {project.sustainabilityFeatures?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Creator Information */}
          <Col lg={4}>
            <Card className="project-detail-card mb-4">
              <Card.Header as="h5" className="section-title">
                Project Images
              </Card.Header>
              <Card.Body>
                <Carousel>
                  {project.images?.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={myService.getRelativePath(image.url)}
                        alt={`Slide ${index}`}
                      />
                      <Carousel.Caption>
                        <p>{image.caption}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card.Body>
            </Card>

            {/* Created By Section */}
            <Card className="project-detail-card mb-4">
              <Card.Header as="h5" className="section-title">
                Created By
              </Card.Header>
              <Card.Body className="d-flex align-items-center">
                <i className="fas fa-user-circle fa-2x me-3"></i>
                <div>
                  <strong>{project.createdBy?.name || "John Doe"}</strong>
                  <p className="mb-0 text-muted">Project Manager</p>
                </div>
              </Card.Body>
            </Card>
            
            {/* Timestamps */}
            <Card className="project-detail-card mb-4">
              <Card.Header as="h5" className="section-title">
                Timestamps
              </Card.Header>
              <Card.Body>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(project.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(project.updatedAt).toLocaleString()}
                </p>
              </Card.Body>
            </Card>
            {/* Project Timeline */}
            <Card className="project-detail-card mb-4">
              <Card.Header as="h5" className="section-title">
                Project Timeline
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group controlId="yearStart">
                      <Form.Label>
                        <strong>Start Date</strong>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={
                          project.year?.start
                            ? project.year.start.split("T")[0]
                            : ""
                        }
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="yearExpected">
                      <Form.Label>
                        <strong>Expected Completion Date</strong>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={
                          project.year?.expected
                            ? project.year.expected.split("T")[0]
                            : ""
                        }
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="yearCompletion">
                      <Form.Label>
                        <strong>Completion Date</strong>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={
                          project.year?.completion
                            ? project.year.completion.split("T")[0]
                            : ""
                        }
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

         {/* Full-width Main Image */}
         <div className="project-main-image mb-4">
          {/* {project.images[0] && (
            <img
              src={myService.getRelativePath(project.images[0].url)}
              alt={project.images[0].caption || "Project Image"}
              className="img-fluid w-100"
            />
          )} */}
          <Card className="project-detail-card mb-4">
          <Card.Header as="h5" className="section-title">
                Images
              </Card.Header>
              <Card.Body>
                <Carousel>
                  {project.images?.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        height="auto"
                        width="auto"
                        src={myService.getRelativePath(image.url)}
                        alt={`Slide ${index}`}
                      />
                      <Carousel.Caption>
                        <p>{image.caption}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card.Body>
            </Card>
        </div>
      </Container>
    </>
  );
}
