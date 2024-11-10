import { Button, Table, Modal, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { toast } from "react-toastify";
import Service from "../../../service/ImageService";
import Swal from "sweetalert2";
import URL from "../../../config";

const myService = new Service();

const ClientLogoPage = () => {
  const [logos, setLogos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // To track add/edit mode
  const [imagePreview, setImagePreview] = useState(null); // For handling image preview

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const result = await fetch(`${URL}/logo`, {
        method: "GET",
      });
      const data = await result.json();
      if (data.status) {
        setLogos(data.result);
      }
    } catch (error) {
      // console.error("Error fetching logos:", error);
      toast.error("Error fetching logos");
    }
  };

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setCurrentLogo({
        ...currentLogo,
        [name]: files[0], // Store the selected file
      });

      // Preview image using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 encoded image
      };
      reader.readAsDataURL(file); // Read file as data URL
    } else {
      setCurrentLogo({
        ...currentLogo,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle save (both add and edit)
  const handleSave = async () => {
    const method = currentLogo?._id ? "PATCH" : "POST";
    const endpoint = currentLogo?._id
      ? `${URL}/logo/${currentLogo._id}`
      : `${URL}/logo`;

    const formData = new FormData();
    formData.append("companyName", currentLogo?.companyName || "");
    formData.append("link", currentLogo?.link || "");
    formData.append("isActive", currentLogo?.isActive ? "true" : "false");
    if (currentLogo?.image) {
      formData.append("image", currentLogo?.image);
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
      // console.log(data);

      if (data.status) {
        fetchLogos(); // Refresh the logo list after save
        setShowModal(false);
        toast.success("Logo saved successfully!");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      // console.error("Error saving logo:", error);
      toast.error("Error saving logo");
    }
  };

  // Handle logo deletion
  const handleDelete = async (id) => {
    try {
      const result = await fetch(`${URL}/logo/${id}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (data.status) {
        setLogos(logos.filter((logo) => logo._id !== id));
        toast.success("Logo deleted successfully!");
      } else {
        toast.error("Failed to delete logo");
      }
    } catch (error) {
      // console.error("Error deleting logo:", error);
      toast.error("Error deleting logo");
    }
  };

  // Open modal for editing
  const handleEdit = (logo) => {
    setCurrentLogo(logo);
    setIsEditMode(true);
    setShowModal(true);
    setImagePreview((logo?.image?.url)); // Set image preview for existing logo
  };

  // Open modal for adding new logo
  const handleAdd = () => {
    setCurrentLogo({ companyName: "", link: "", isActive: false });
    setIsEditMode(false);
    setShowModal(true);
    setImagePreview(null); // Reset image preview
  };

  const renderImagePreview = () => {
    if (imagePreview) {
      return <img src={imagePreview} alt="logo-preview" width="100px" />;
    }
    return null;
  };

  return (
    <>
      <AdminHelmet
        title="Logo Slider"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/about/logo"
      />

      <PageTitle
        title="Client Logo Page"
        breadCrumbs={[
          { name: "About", path: "/admin/logo" },
          { name: "Client Logo" },
        ]}
        link={{
          to: "#",
          label: "Add Logo",
          icon: "fas fa-paper-plane",
          onClick: handleAdd,
        }}
      />

      <section id="table" className="card mb-4">
        {logos && logos.length > 0 ? (
          <Table striped="columns" responsive hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Company Name</th>
                <th>Image</th>
                <th>Link</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logos.map((logo, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{logo?.companyName}</td>
                  <td>
                    <img
                      src={(logo?.image?.url)}
                      height="auto"
                      width="100px"
                      alt={logo?.image?.caption || "no-image"}
                      onClick={() => {
                        Swal.fire({
                          title: logo?.companyName,
                          text: logo?.link,
                          imageUrl: (logo?.image?.url),
                          imageHeight: 400,
                          imageAlt: "Custom image",
                        });
                      }}
                    />
                  </td>
                  <td>{logo?.link}</td>
                  <td>{logo?.isActive ? "Yes" : "No"}</td>
                  <td className="d-flex justify-content-center">
                    <Button
                      className="btn-primary me-2"
                      onClick={() => handleEdit(logo)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={() => handleDelete(logo._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3 className="text-center">No Data Found</h3>
        )}
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Logo" : "Add Logo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={currentLogo?.companyName || ""}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="link">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  name="link"
                  value={currentLogo?.link || ""}
                  onChange={handleChange}
                  placeholder="Enter company link"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="logo">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
                {renderImagePreview()}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="isActive">
                <Form.Check
                  type="checkbox"
                  name="isActive"
                  label="Active"
                  checked={currentLogo?.isActive || false}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClientLogoPage;
