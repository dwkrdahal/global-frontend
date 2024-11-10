import { Button, Card, Modal, Form, Row, Col, NavLink } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { toast } from "react-toastify";
import URL from "../../../config";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const result = await fetch(`${URL}/banner`, {
        method: "GET",
      });
      const data = await result.json();
      if (data.status) {
        setBanners(data.result);
      }
    } catch (error) {
      toast.error("Error fetching banners");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "image" || name === "video") {
      if (files.length > 0) {
        const file = files[0];
        setCurrentBanner({
          ...currentBanner,
          [name]: file,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCurrentBanner({
        ...currentBanner,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSave = async () => {
    const method = currentBanner?._id ? "PATCH" : "POST";
    let endpoint = "";

    if (currentBanner?.media === "image") {
      endpoint = currentBanner?._id
        ? `${URL}/banner/image/${currentBanner._id}`
        : `${URL}/banner/image`;
    } else if (currentBanner?.media === "video") {
      endpoint = currentBanner?._id
        ? `${URL}/banner/video/${currentBanner._id}`
        : `${URL}/banner/video`;
    } else {
      toast.error("Invalid media type.");
      return;
    }

    const formData = new FormData();
    formData.append("title", currentBanner?.title || "");
    formData.append("subtitle", currentBanner?.subtitle || "");
    formData.append("isActive", currentBanner?.isActive ? "true" : "false");
    formData.append("media", currentBanner?.media || ""); // Include mediaType

    if (currentBanner?.media === "image" && currentBanner?.image) {
      formData.append("image", currentBanner?.image);
    } else if (currentBanner?.media === "video" && currentBanner?.video) {
      formData.append("video", currentBanner?.video);
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
        fetchBanners();
        setShowModal(false);
        toast.success("Banner saved successfully!");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error saving banner");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await fetch(`${URL}/banner/${id}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (data.status) {
        setBanners(banners.filter((banner) => banner._id !== id));
        toast.success("Banner deleted successfully!");
      } else {
        toast.error("Failed to delete banner");
      }
    } catch (error) {
      toast.error("Error deleting banner");
    }
  };

  const handleEdit = (banner) => {
    setCurrentBanner(banner);
    setIsEditMode(true);
    setShowModal(true);
    setMediaPreview(
      banner.media === "image"
        ? (banner?.image?.url)
        : (banner?.video?.url) || null
    );
  };

  const handleAdd = () => {
    setCurrentBanner({
      title: "",
      subtitle: "",
      isActive: false,
      media: "", // Default to image
    });
    setIsEditMode(false);
    setShowModal(true);
    setMediaPreview(null);
  };

  const renderMediaPreview = () => {
    if (currentBanner?.media === "image" && mediaPreview) {
      return (
        <img
          src={mediaPreview}
          alt="banner-preview"
          style={{ width: "100%", borderRadius: "5px" }}
        />
      );
    } else if (currentBanner?.media === "video" && mediaPreview) {
      return (
        <video
          src={mediaPreview}
          controls
          style={{ width: "100%", borderRadius: "5px" }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <AdminHelmet
        title="Home Banner"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/banner"
      />

      <div className="px-4">
        <PageTitle
          title="Banners Page"
          breadCrumbs={[
            { name: "Content", path: "/admin/banner" },
            { name: "Banners" },
          ]}
          link={{
            to: "#",
            label: "Add Banner",
            icon: "fas fa-paper-plane",
            onClick: handleAdd,
          }}
        />

        <Row>
          {banners && banners.length > 0 ? (
            banners.map((banner, index) => (
              <Col
                key={banner._id}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={4}
                className="mb-4"
              >
                <Card className="banner-card h-100">
                  <div className="image-container">
                    {/* Display mainImage if available, otherwise display the first image from the list */}
                    {banner.image ? (
                      <img
                        src={(banner?.image?.url)}
                        className="d-block w-100 banner-image"
                        alt={banner.title}
                      />
                    ) : (
                      <video
                        src={(banner?.video?.url)}
                        controls
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "5px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    {/* Conditional "Active" tag */}
                    {banner.isActive && (
                      <span className="active-tag">Active</span>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="banner-title">
                      {banner?.title}
                    </Card.Title>

                    <div className="banner-meta">
                      <span>{banner?.subtitle}</span>
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button
                        className="btn-primary me-2"
                        onClick={() => handleEdit(banner)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-danger"
                        onClick={() => handleDelete(banner._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <>Data Not Found</>
          )}
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditMode ? "Edit Banner" : "Add Banner"}
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
                    checked={currentBanner?.isActive || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="mediaImage">
                  <Form.Check
                    type="radio"
                    name="media"
                    value="image"
                    label="Image"
                    checked={currentBanner?.media === "image"}
                    onChange={handleChange}
                    disabled={isEditMode && currentBanner?.media !== "image"}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="mediaVideo">
                  <Form.Check
                    type="radio"
                    name="media"
                    value="video"
                    label="Video"
                    checked={currentBanner?.media === "video"}
                    onChange={handleChange}
                    disabled={isEditMode && currentBanner?.media !== "video"}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={currentBanner?.title || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="subtitle">
                  <Form.Label>Subtitle</Form.Label>
                  <Form.Control
                    type="text"
                    name="subtitle"
                    value={currentBanner?.subtitle || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="mediaFile">
                  <Form.Label>
                    {currentBanner?.media === "image" ? "Image" : "Video"}
                  </Form.Label>
                  <Form.Control
                    type={currentBanner?.media === "image" ? "file" : "file"}
                    name={currentBanner?.media}
                    onChange={handleChange}
                    accept={
                      currentBanner?.media === "image" ? "image/*" : "video/*"
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Col>{renderMediaPreview()}</Col>
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
      </div>
    </>
  );
};

export default Banner;
