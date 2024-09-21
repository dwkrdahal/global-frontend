import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { toast } from "react-toastify";
import Service from "../../../service/ImageService";
const myService = new Service();
const URL = import.meta.env.VITE_APP_URL;

const Testimony = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTestimony, setCurrentTestimony] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // To track add/edit mode
  const [imagePreview, setImagePreview] = useState(null); // For handling image preview

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      const result = await fetch(`${URL}/testimony`, {
        method: "GET",
      });
      const data = await result.json();
      if (data.status) {
        setTestimonies(data.result);
      }
    } catch (error) {
      toast.error("Error fetching testimonies");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setCurrentTestimony({
        ...currentTestimony,
        [name]: files[0],
      });

      // Preview image using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCurrentTestimony({
        ...currentTestimony,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSave = async () => {
    const method = currentTestimony?._id ? "PATCH" : "POST";
    const endpoint = currentTestimony?._id
      ? `${URL}/testimony/${currentTestimony._id}`
      : `${URL}/testimony`;

    const formData = new FormData();
    formData.append("name", currentTestimony?.name || "");
    formData.append("company", currentTestimony?.company || "");
    formData.append("position", currentTestimony?.position || "");
    formData.append("testimony", currentTestimony?.testimony || "");
    formData.append("isActive", currentTestimony?.isActive ? "true" : "false");

    if (currentTestimony?.image) {
      formData.append("image", currentTestimony?.image);
    } else {
      toast.error("No file selected for upload.");
      return;
    }

    try {
      const result = await fetch(endpoint, {
        method: method,
        body: formData,
      });
      const data = await result.json();
      if (data.status) {
        fetchTestimonies();
        setShowModal(false);
        toast.success("Testimony saved successfully!");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error saving testimony");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await fetch(`${URL}/testimony/${id}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (data.status) {
        setTestimonies(testimonies.filter((testimony) => testimony._id !== id));
        toast.success("Testimony deleted successfully!");
      } else {
        toast.error("Failed to delete testimony");
      }
    } catch (error) {
      toast.error("Error deleting testimony");
    }
  };

  const handleEdit = (testimony) => {
    setCurrentTestimony(testimony);
    setIsEditMode(true);
    setShowModal(true);
    setImagePreview(myService.getRelativePath(testimony?.image?.url));
  };

  const handleAdd = () => {
    setCurrentTestimony({
      name: "",
      company: "",
      position: "",
      testimony: "",
      isActive: false,
    });
    setIsEditMode(false);
    setShowModal(true);
    setImagePreview(null);
  };

  const renderImagePreview = () => {
    if (imagePreview) {
      return (
        <img
          src={imagePreview}
          alt="testimony-preview"
          width="100px"
          style={{ borderRadius: "50%" }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <AdminHelmet
        title={`Testimonials `}
        description="Admin panel for Global Construction & Engineering."
        url={`https://globalconstruction.com.np/admin/testimony`}
      />
      <div className=" px-4">
        <PageTitle
          title="Testimonials Page"
          breadCrumbs={[
            { name: "About", path: "/admin/testimony" },
            { name: "testimonials" },
          ]}
          link={{
            to: "#",
            label: "Add Testimony",
            icon: "fas fa-paper-plane",
            onClick: handleAdd,
          }}
        />
        <section id="cards" className="card mb-4">
          {testimonies && testimonies.length > 0 ? (
            <div className="row">
              {testimonies.map((testimony, i) => (
                <div key={i} className="col-md-6 mb-4">
                  <Card>
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3">
                          <img
                            src={myService.getRelativePath(
                              testimony?.image?.url
                            )}
                            alt={testimony?.image?.caption || "no-image"}
                            className="img-fluid"
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div>
                          <Card.Title>{testimony?.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {testimony?.company}
                          </Card.Subtitle>
                          <Card.Subtitle className="mb-2 text-muted">
                            {testimony?.position}
                          </Card.Subtitle>
                          {testimony?.isActive && (
                            <span className="badge bg-success">Active</span>
                          )}
                        </div>
                      </div>
                      <Card.Text className="text-highlight">
                        {testimony?.testimony}
                      </Card.Text>
                      <div className="d-flex justify-content-end">
                        <Button
                          className="btn-primary me-2"
                          onClick={() => handleEdit(testimony)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn-danger"
                          onClick={() => handleDelete(testimony._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-center">No Data Found</h3>
          )}
        </section>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditMode ? "Edit Testimony" : "Add Testimony"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="isActive">
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    label="Active"
                    checked={currentTestimony?.isActive || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label> Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentTestimony?.name || ""}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="companyName">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={currentTestimony?.company || ""}
                    onChange={handleChange}
                    placeholder="Company Name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="position">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={currentTestimony?.position || ""}
                    onChange={handleChange}
                    placeholder="Position"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group>
                  <Form.Label>Testimony</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="testimony"
                    value={currentTestimony?.testimony || ""}
                    onChange={handleChange}
                    placeholder="Enter testimony here"
                    rows={3}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="testimonyImage">
                  <Form.Label>Testimony Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {renderImagePreview()}
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Testimony;
