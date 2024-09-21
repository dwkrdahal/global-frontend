import { useParams } from "react-router-dom";
import { AdminHelmet, PageTitle } from "../../../components/admin";
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
const myService = new Service();
import {
  ClientComponent,
  ImageManagementComponent,
  InformationComponent,
  MainImageComponent,
  TimelineComponent,
} from "./project.component";

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
      <AdminHelmet
        title={project?.title}
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/project/create"
      />
      
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
              projectURL={projectURL}
              token={token}
            />

            {/* Client Information */}
            <ClientComponent
              project={project}
              projectURL={projectURL}
              token={token}
            />
          </Col>

          {/* Project Images */}
          <Col lg={4}>
            {/* Main Image component */}
            <MainImageComponent
              project={project}
              projectURL={projectURL}
              token={token}
            />

            {/* Project Timeline */}
            <TimelineComponent
              project={project}
              projectURL={projectURL}
              token={token}
            />

            {/* Created By Section */}
            <Card className="project-detail-card mb-4">
              <Card.Header as="h5" className="section-title">
                Created By
              </Card.Header>
              <Card.Body className="d-flex align-items-center">
                <i className="fas fa-user-circle fa-2x me-3"></i>
                <div>
                  <strong>{project.createdBy?.name || "Designer"}</strong>
                  <p className="mb-0 text-muted">Architect</p>
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
          </Col>
        </Row>

        {/* Full-width Main Image */}

        <ImageManagementComponent
          project={project}
          projectURL={projectURL}
          token={token}
        />
      </Container>
    </>
  );
}
