import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function DesignerComponent({ project, projectURL, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [designer, setDesigner] = useState({
    name: "",
    email: "",
    position: "",
  });
  const [originalDesigner, setOriginalDesigner] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (project.designer) {
      setDesigner(project?.designer);
      setOriginalDesigner(project?.designer);
    }
  }, [project]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setIsFormChanged(true);
    let { name, value } = e.target;
    console.log(name, value);

    setDesigner({
      ...designer,
      [name]: value,
    });

    console.log(designer);
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
        // console.log("refresh: ", data.result);

        if (data.status) {
          setDesigner(data.result.designer);
          setOriginalDesigner(data.result.designer);
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        toast.error("Network Error!");
        console.log(error);
      } finally {
        setIsFormChanged(false);
      }
    } else {
      setDesigner(originalDesigner);
    }
  };

  // update data in db
  const handleSave = async (e) => {
    try {
      const result = await fetch(projectURL, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ designer }),
      });
      const data = await result.json();
      // console.log(data.result);

      // if success
      if (data.status) {
        toast.success("Designer Info Updated");
        setDesigner(data.result.designer);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error! Check your network and try again");
      console.log(error);
    }
    setIsEditing(!isEditing);
  };

  const handleDiscard = () => {
    // Revert back to the original data
    setDesigner(originalDesigner);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="project-detail-card mb-4">
        <Card.Header
          as="h5"
          className="d-flex justify-content-between align-items-center"
        >
          Designer Information
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
            <Form.Group controlId="designerName">
              <Form.Label>
                <strong>Designer Name</strong>
              </Form.Label>
              <Form.Control
                name="name"
                type="text"
                defaultValue={project.designer?.name || ""}
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="designerContact">
                  <Form.Label>
                    <strong>Email</strong>
                  </Form.Label>
                  <Form.Control
                    name="email"
                    type="text"
                    defaultValue={project.designer?.email || ""}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="designerContact">
                  <Form.Label>
                    <strong>Position</strong>
                  </Form.Label>
                  <Form.Control
                    name="position"
                    type="text"
                    defaultValue={project.designer?.position || ""}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>
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
