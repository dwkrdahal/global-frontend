import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function InformationComponent({ project, projectURL, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [originalInformation, setOriginalInformation] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [information, setInformation] = useState({
    title: "",
    description: "",
    architectureStyle: "",
    projectType: "",
    projectStatus: "",
    siteArea: {
      value: "",
      unit: "",
    },
    builtUpArea: {
      value: "",
      unit: "",
    },
  });

  useEffect(() => {
    if (project) {
      setInformation(project);
      setOriginalInformation(project);
    }
  }, [project]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setIsFormChanged(true);
    const { name, value } = e.target;

    switch (name) {
      case "siteAreaValue":
        setInformation({
          ...information,
          siteArea: {
            ...information.siteArea,
            value: value,
          },
        });
        break;

      case "siteAreaUnit":
        setInformation({
          ...information,
          siteArea: {
            ...information.siteArea,
            unit: value,
          },
        });
        break;

      case "builtUpAreaValue":
        setInformation({
          ...information,
          builtUpArea: {
            ...information.builtUpArea,
            value: value,
          },
        });
        break;

      case "builtUpAreaUnit":
        setInformation({
          ...information,
          builtUpArea: {
            ...information.builtUpArea,
            unit: value,
          },
        });
        break;

      default:
        setInformation({
          ...information,
          [name]: value,
        });
        break;
    }
  };

  const handleRefresh = async () => {
    if (isFormChanged) {
      try {
        const result = await fetch(projectURL, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const data = await result.json();

        if (data.status) {
          setInformation(data.result);
          // toast.success("Refreshed");
          setOriginalInformation(data.result);
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsFormChanged(false);
        setIsEditing(false);
      }
    }
  };

  const handleSave = async (e) => {
    console.log(information);
    try {
      const result = await fetch(projectURL, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
      });
      const data = await result.json();

      //if success
      if (data.status) {
        toast.success("Information Updated  ");
        setInformation(data.result);
        console.log(data);
      } else {
        toast.error(data.msg);
      }
      setIsEditing(false);
    } catch (error) {
      toast.error("Error! Updating Project Information");
      console.log(error);
    }
  };

  const handleDiscard = () => {
    setInformation(originalInformation);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="project-detail-card mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="section-title">Project Information</h5>
          <div className="ms-auto d-flex align-items-center">
            <Button variant="link" onClick={() => handleRefresh()}>
              <i className="fas fa-arrows-rotate"></i>
            </Button>
            <Button variant="link" onClick={() => handleEditToggle()}>
              <i className="fas fa-pen"></i>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onChange={handleChange}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="projectTitle">
                  <Form.Label>
                    <strong>Title</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={project?.title}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="projectStatus">
                  <Form.Label>
                    <strong>Status</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="projectStatus"
                    defaultValue={project?.projectStatus}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="projectDescription">
              <Form.Label>
                <strong>Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                defaultValue={project?.description}
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Architecture Style and Project Type */}
            <Row>
              <Col sm={6}>
                <Form.Group controlId="architectureStyle">
                  <Form.Label>
                    <strong>Architecture Style</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="architectureStyle"
                    defaultValue={project?.architectureStyle || ""}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="projectType">
                  <Form.Label>
                    <strong>Project Type</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="projectType"
                    defaultValue={project?.projectType}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  >
                    <option value="architecture">Architecture</option>
                    <option value="construction">Construction</option>
                    <option value="structure">Structure</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Card.Header as="h5" className="section-title">
              Area Details
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="siteArea">
                    <Form.Label>
                      <strong>Site Area</strong>
                    </Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          name="siteAreaValue"
                          placeholder="value"
                          defaultValue={project.siteArea?.value || ""}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="siteAreaUnit"
                          placeholder="Unit"
                          defaultValue={project.siteArea?.unit || ""}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="builtUpArea">
                    <Form.Label>
                      <strong>Built-up Area</strong>
                    </Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          name="builtUpAreaValue"
                          type="text"
                          placeholder="value"
                          defaultValue={project.builtUpArea?.value || ""}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="builtUpAreaUnit"
                          placeholder="Unit"
                          defaultValue={project.builtUpArea?.unit || ""}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>

            {isEditing && (
              <>
                <Button variant="primary" onClick={() => handleSave()}>
                  Update
                </Button>
                &nbsp;
                <Button variant="secondary" onClick={() => handleDiscard()}>
                  Discard
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}