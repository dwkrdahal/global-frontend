import { useState, useEffect } from "react";
import { Container, Col, Row, Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Service from "../../../service/ImageService";
const myService = new Service();

import axios from "axios";

function Services() {
  const URL = "http://localhost:3000";
  const token = localStorage.getItem("user_token");
  const [services, setServices] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const fetchServices = async () => {
    try {
      const serviceURL = `${URL}/service`;
      const response = await fetch(serviceURL, {
        method: "GET",
        header: {
          Authorization: token,
        },
      });

      const data = await response.json();
      if (data.status) {
        setServices(data.result);
      }
    } catch (error) {
      toast.error("Error");
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleView = (id) => setShow(true);

  const handleEdit = (id) => setShow(true);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL}/service/${id}`);

      console.log(response);
      
      if(response.data.status){
        toast.success(response?.data?.msg)
      } else{
        toast.error(response?.data?.msg)
      }
      fetchServices();
    } catch (error) {
      toast.error("Cannot Delete ")
      console.log(error);
      
    }
  };

  return (
    <Container className="px-4">
      <h1 className="text-center">Services</h1>
      <Row xs={1} md={2} lg ={3} xxl ={4} className="g-4">
        {/* {console.log(services)} */}
        {services && services.length > 0 ? (
          services.map((service, key) => (
            <Col key={key}>
              <Card border="dark">
                <Card.Img
                  variant="top"
                  src={myService.getRelativePath(service?.image.url)}
                />
                <Card.Body>
                  <Card.Title className="text-center">
                    {service.title}
                  </Card.Title>
                  <Card.Text>{service?.description}</Card.Text>
                  <div className="text-right">
                    category: {service?.category}
                  </div>
                  <div className="d-flex justify-content-between p-3">
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        handleView(service?._id);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      className="btn btn-secondary"
                      onClick={() => {
                        handleEdit(service?._id)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(service?._id)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No service in the list</p>
        )}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default Services;
