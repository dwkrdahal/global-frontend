import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ClientComponent({ project, projectURL, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [client, setClient] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [originalClient, setOriginalClient] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (project.client) {
      setClient(project?.client);
      setOriginalClient(project?.client);
    }
  }, [project]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setIsFormChanged(true);
    let { name, value } = e.target;
    console.log(name, value);

    setClient({
      ...client,
      [name]: value,
    });

    console.log(client);
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
          setClient(data.result.client);
          setOriginalClient(data.result.client);
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
      setClient(originalClient);
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
        body: JSON.stringify({ client }),
      });
      const data = await result.json();
      // console.log(data.result);

      // if success
      if (data.status) {
        toast.success("Client Info Updated");
        setClient(data.result.client);
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
    setClient(originalClient);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="project-detail-card mb-4">
        <Card.Header
          as="h5"
          className="d-flex justify-content-between align-items-center"
        >
          Client Information
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
            <Form.Group controlId="clientName">
              <Form.Label>
                <strong>Client Name</strong>
              </Form.Label>
              <Form.Control
                name="name"
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
                    name="email"
                    type="text"
                    defaultValue={project.client?.email || ""}
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
                    name="contact"
                    type="text"
                    defaultValue={project.client?.contact || ""}
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
