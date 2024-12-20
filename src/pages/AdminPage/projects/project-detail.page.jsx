import { useParams } from "react-router-dom";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import "./project.css";
import {
  ClientComponent,
  ImageManagementComponent,
  InformationComponent,
  MainImageComponent,
  TimelineComponent,
} from "./project.component";
import URL from "../../../config";
import DesignerComponent from "./project.component/designer.component";

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [createdByUser, setCreatedByUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const token = localStorage.getItem("user_token");

  const params = useParams();
  const id = params.id;

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

      if(data.result?.createdBy){
        fetchCreater(data.result.createdBy);
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const fetchCreater = async (userId) => {
    try {
      const result = await fetch(`${URL}/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await result.json();

      if (data.status) {
        setCreatedByUser(data.result);        
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${projectURL}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Project deleted successfully.");
        // Optionally, redirect to the projects list page or handle other actions after deletion
        // e.g., navigate to the main projects page
        window.location.href = "/admin/project"; // or use a React router redirect if available
      } else {
        toast.error(data.message || "Failed to delete the project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("An error occurred while deleting the project.");
    }
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
          <div className="mb-4 d-flex justify-content-between">
            <Button variant="primary" onClick={handleEditToggle}>
              Edit Project
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete} // Make sure this calls the delete function
            >
              Delete Project
            </Button>
          </div>
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

            {/* Designer Information */}
            <DesignerComponent
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
                    <strong>{createdByUser?.username || "Designer"}</strong>
                    <p className="mb-0 text-muted">{createdByUser?.role || "Architect"}</p>
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
