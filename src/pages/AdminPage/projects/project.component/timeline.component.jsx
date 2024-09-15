import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function TimelineComponent({ project, projectURL, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [timeline, setTimeline] = useState({
    started: "",
    expected: "",
    completion: "",
  });
  const [originalTimeline, setOriginalTimeline] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (project.year) {
      setTimeline({
        started: project.year.started || "",
        expected: project.year.expected || "",
        completion: project.year.completion || "",
      });
      setOriginalTimeline({
        started: project.year.started || "",
        expected: project.year.expected || "",
        completion: project.year.completion || "",
      });
    }
  }, [project]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setIsFormChanged(true);
    const { name, value } = e.target;

    setTimeline((prevTimeline) => ({
      ...prevTimeline,
      [name]: value,
    }));

    console.log("Updated Timeline:", timeline);
  };

  const handleSave = async () => {
    try {
      const result = await fetch(projectURL, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: timeline }),
      });
      const data = await result.json();

      if (data.status) {
        toast.success("Timeline Info Updated");
        setTimeline(data.result.year);
        setOriginalTimeline(data.result.year);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error! Check your network and try again");
      console.error(error);
    }
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setTimeline(originalTimeline);
    setIsEditing(false);
  };

  return (
    <Card className="project-detail-card mb-4">
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        Project Timeline
        <div className="ms-auto d-flex align-items-center">
          <Button variant="link" onClick={handleEditToggle}>
            <i className="fas fa-pen"></i>
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="yearStart">
                <Form.Label>
                  <strong>Start Date</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="started"
                  value={timeline.started ? timeline.started.split("T")[0] : ""}
                  onChange={handleChange}
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
                  name="expected"
                  value={
                    timeline.expected ? timeline.expected.split("T")[0] : ""
                  }
                  onChange={handleChange}
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
                  name="completion"
                  value={
                    timeline.completion ? timeline.completion.split("T")[0] : ""
                  }
                  onChange={handleChange}
                  readOnly={!isEditing}
                  // Disable the field if not editing or projectStatus is not 'completed'
                  disabled={!isEditing || project?.projectStatus !== "completed"}
                />
              </Form.Group>
            </Col>
          </Row>
          {isEditing && (
            <>
              <Button variant="primary" onClick={handleSave}>
                Update
              </Button>
              &nbsp;
              <Button variant="secondary" onClick={handleDiscard}>
                Discard
              </Button>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}
