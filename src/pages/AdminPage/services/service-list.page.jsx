// list-service.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Dropdown } from "react-bootstrap";
import { PageTitle } from "../../../components/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ServiceEdit from "./service-edit";

export default function ListService() {
  const token = localStorage.getItem("user_token");
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_APP_URL;
  const serviceURL = URL + "/service";

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false); 
  const [currentService, setCurrentService] = useState(null);

  const fetchServices = async () => {
    try {
      const result = await fetch(serviceURL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();

      if (data.status) {
        setServices(data.result);
        setFilteredServices(data.result); 
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Network problem!");
    }
  };

  useEffect(() => {
    fetchServices();
  }, [token]);

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const result = await fetch(`${serviceURL}/${serviceId}`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
        const data = await result.json();

        if (data.status) {
          setServices(services.filter((service) => service._id !== serviceId));
          toast.success("Service deleted successfully");
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        toast.error("Failed to delete the service.");
      }
    }
  };

  const filterServices = (status) => {
    setFilterStatus(status);
    if (status === "All") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) => (status === "Active" && service.status) || (status === "Inactive" && !service.status)
      );
      setFilteredServices(filtered);
    }
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setShowModal(true);
  };

  return (
    <>
      <PageTitle
        title="List Service Page"
        breadCrumbs={[
          { name: "Services", path: "/admin/service" },
          { name: "List Service" },
        ]}
        link={{
          to: "/admin/service/create",
          label: "Create Service",
          icon: "fas fa-paper-plane",
        }}
      />

      <Container>
        <div className="d-flex justify-content-end mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Filter: {filterStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filterServices("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => filterServices("Active")}>Active</Dropdown.Item>
              <Dropdown.Item onClick={() => filterServices("Inactive")}>Inactive</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Row>
          {filteredServices && filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Col key={service._id} xs={12} sm={12} md={6} lg={6} xl={3} className="mb-4">
                <Card className="service-card h-100 position-relative">
                  <Card.Body className="d-flex flex-column">
                    <Badge pill bg={service?.status ? "success" : "secondary"} className="position-absolute top-0 end-0 m-2">
                      {service?.status ? "Active" : "Inactive"}
                    </Badge>
                    <div className="icon-container mb-2">
                      {service?.icon && <i className={`${service.icon} fa-2x`}></i>}
                    </div>
                    <Card.Title className="service-title">
                      {service?.title}
                    </Card.Title>
                    <Card.Text>{service?.description}</Card.Text>
                    <div className="mt-auto d-flex justify-content-between">
                      <Button variant="warning" onClick={() => handleEdit(service)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(service._id)}>
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <>No services found</>
          )}
        </Row>
      </Container>

      {currentService && (
        <ServiceEdit
          show={showModal}
          handleClose={() => setShowModal(false)}
          service={currentService}
          token={token}
          fetchServices={fetchServices}
        />
      )}
    </>
  );
}
