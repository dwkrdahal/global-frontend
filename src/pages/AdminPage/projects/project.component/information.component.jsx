import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function InformationComponent({ project, projectURL, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [originalInformation, setOriginalInformation] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [information, setInformation] = useState({
    title: "",
    description: "",
    architectureStyle: "",
    isFeatured: "",
    isActive: "",
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setInformation({ ...information, [name]: checked });
    } else {
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

  const handleSave = async () => {
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

      if (data.status) {
        toast.success("Information Updated");
        setInformation(data.result);
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
        <Card.Header
          as="h5"
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <span>Project Information</span>
          </div>
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
                <Form.Group controlId="isFeaturedCheckbox" className="me-3">
                  <Form.Check
                    type="checkbox"
                    label="Featured"
                    name="isFeatured"
                    checked={information.isFeatured}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="isActiveCheckbox" className="me-3">
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    name="isActive"
                    checked={information.isActive}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="projectTitle">
                  <Form.Label>
                    <strong>Title</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={information.title}
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
                    defaultValue={information.projectStatus}
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

            {/* Description Field with CKEditor */}
            <Row>
              <Col className="mb-3">
                <Form.Group controlId="projectDescription">
                  <Form.Label>
                    <strong>Description</strong>
                  </Form.Label>
                  {isEditing ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={information.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setInformation((prevInformation) => ({
                          ...prevInformation,
                          description: data,
                        }));
                      }}
                    />
                  ) : (
                    <div
                      className="form-control"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          information.description || ""
                        ),
                      }}
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <Form.Group controlId="architectureStyle">
                  <Form.Label>
                    <strong>Architecture Style</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="architectureStyle"
                    defaultValue={information.architectureStyle || ""}
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
                    defaultValue={information.projectType}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="mixed-use">Mixed-use</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Site and Built-up Area Details */}
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
                          defaultValue={information.siteArea.value || ""}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="siteAreaUnit"
                          placeholder="Unit"
                          defaultValue={information.siteArea.unit || ""}
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
                          type="text"
                          name="builtUpAreaValue"
                          placeholder="value"
                          defaultValue={information.builtUpArea.value || ""}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="builtUpAreaUnit"
                          placeholder="Unit"
                          defaultValue={information.builtUpArea.unit || ""}
                          readOnly={!isEditing}
                          disabled={!isEditing}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Form>
        </Card.Body>

        {isEditing && (
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="primary" className="me-2" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleDiscard}>
              Discard
            </Button>
          </Card.Footer>
        )}
      </Card>
    </>
  );
}
