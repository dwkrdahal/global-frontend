import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function LocationComponent({ project, projectURL }) {
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    state: "",
    city: "",
    country: "",
    district: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  });
  const [originalLocation, setOriginalLocation] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const token = localStorage.getItem("user_token");

  useEffect(() => {
    if (project.location) {
      setLocation(project?.location);
      setOriginalLocation(project?.location);
    }
  }, [project]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setIsFormChanged(true);
    let { name, value } = e.target;
    if (name in location.coordinates) {
      setLocation({
        ...location,
        coordinates: {
          ...location.coordinates,
          [name]: value,
        },
      });
    } else {
      setLocation({
        ...location,
        [name]: value,
      });
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
        // console.log("refresh: ", data.result);

        if (data.status) {
          // console.log("Setting location state: ", data.result.location);

          setLocation(data.result.location);
          setOriginalLocation(data.result.location);
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
      setLocation(originalLocation);
    }
  };

  // update data in db
  const handleSave = async (e) => {
    // console.log("location: ",location);

    try {
      const result = await fetch(projectURL, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location }),
      });
      const data = await result.json();
      // console.log(data.result);

      // if success
      if (data.status) {
        toast.success("Location Info Updated");
        setLocation(data.result.location);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error! Check your network and try again");
      console.log(error);
    }
    // console.log("project: ", location);
    setIsEditing(!isEditing);
  };

  const handleDiscard = () => {
    // Revert back to the original data
    setLocation(originalLocation);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="project-detail-card mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="section-title">Location Details</h5>
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
                <Form.Group controlId="locationAddress">
                  <Form.Label>
                    <strong>Address</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    defaultValue={location?.address}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group controlId="locationCity">
                  <Form.Label>
                    <strong>City</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    defaultValue={location?.city}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group controlId="locationDistrict">
                  <Form.Label>
                    <strong>District</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    defaultValue={location?.district}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="locationState">
                  <Form.Label>
                    <strong>State</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    defaultValue={location?.state}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group controlId="locationCountry">
                  <Form.Label>
                    <strong>Country</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    defaultValue={location?.country}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group controlId="locationCoordinates">
                  <Form.Label>
                    <strong>Coordinates</strong>
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="text"
                        name="latitude"
                        placeholder="Latitude"
                        defaultValue={location?.coordinates?.latitude || ""}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name="longitude"
                        placeholder="Longitude"
                        defaultValue={location?.coordinates?.longitude || ""}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
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
