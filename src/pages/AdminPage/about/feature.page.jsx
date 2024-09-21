import { Button, Table, Modal, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { toast } from "react-toastify";

const FeaturePage = () => {
  const URL = import.meta.env.VITE_APP_URL;
  const [features, setFeatures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const result = await fetch(`${URL}/feature`, {
        method: "GET",
      });
      const data = await result.json();
      if (data.status) {
        setFeatures(data.result);
      }
    } catch (error) {
      console.error("Error fetching features:", error);
      toast.error("Error fetching features");
    }
  };

  const handleSave = async () => {
    const method = currentFeature?._id ? "PATCH" : "POST";
    const endpoint = currentFeature?._id
      ? `${URL}/feature/edit/${currentFeature._id}`
      : `${URL}/feature`;

    try {
      const result = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentFeature),
      });
      const data = await result.json();
      if (data.status) {
        fetchFeatures();
        setShowModal(false);
        toast.success("Success!");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Error saving feature:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await fetch(`${URL}/feature/delete/${id}`, {
        method: "DELETE",
      });
      const data = await result.json();
      if (data.status) {
        setFeatures(features.filter((feature) => feature._id !== id));
        toast.success("deleted");
      } else {
        toast.error("Failed to delete feature");
        console.error("Failed to delete feature:", data.message);
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
      toast.error("Error deleting feature");
    }
  };

  const handleEdit = (feature) => {
    setCurrentFeature(feature);
    setShowModal(true);
  };

  const handleAdd = () => {
    console.log("i reached here");

    setCurrentFeature(null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentFeature({
      ...currentFeature,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <AdminHelmet
        title="Features"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/about/feature"
      />
      <PageTitle
        title="Feature Page"
        breadCrumbs={[
          { name: "About", path: "/admin/about" },
          { name: "features" },
        ]}
        link={{
          to: "#",
          label: "Add Feature",
          icon: "fas fa-paper-plane",
          onClick: handleAdd,
        }}
      />

      <section id="table" className="card mb-4">
        {/* {console.log(features)} */}
        {features && features.length > 0 ? (
          <Table striped="columns" responsive hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Title</th>
                <th>Count</th>
                <th>+</th>
                <th>Unit</th>
                <th>Active</th>
                <th>Rank</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{feature?.title}</td>
                  <td>{feature?.number}</td>
                  <td>{feature?.addPlus ? "+" : ""}</td>
                  <td>{feature?.unit}</td>{" "}
                  <td>{feature?.isActive ? "Yes" : "No"}</td>
                  <td>{feature?.rank}</td>
                  <td className="d-flex justify-content-center">
                    <Button
                      className="btn-primary me-2"
                      onClick={() => handleEdit(feature)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={() => handleDelete(feature._id)}
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
          <Modal.Title>
            {currentFeature?._id ? "Edit Feature" : "Add Feature"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentFeature?.title || ""}
                  onChange={handleChange}
                  placeholder="Enter title"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="unit">
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="unit"
                  value={currentFeature?.unit || ""}
                  onChange={handleChange}
                  placeholder="Enter unit"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="number">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  name="number"
                  value={currentFeature?.number || ""}
                  onChange={handleChange}
                  placeholder="Count Ends"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="rank">
                <Form.Label>Rank</Form.Label>
                <Form.Control
                  type="number"
                  name="rank"
                  min="0"
                  value={currentFeature?.rank || ""}
                  onChange={handleChange}
                  placeholder="Enter rank"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="addPlus">
                <Form.Check
                  type="checkbox"
                  name="addPlus"
                  label="Add + sign"
                  checked={currentFeature?.addPlus || false}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="isActive">
                <Form.Check
                  type="checkbox"
                  name="isActive"
                  label="Active"
                  checked={currentFeature?.isActive || false}
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

export default FeaturePage;
