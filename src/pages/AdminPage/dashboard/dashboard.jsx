import React, { useState, useEffect } from "react";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { Card, Row, Col } from "react-bootstrap";
import {
  FaProjectDiagram,
  FaConciergeBell,
  FaUsers,
  FaComments,
  FaRegAddressCard,
} from "react-icons/fa"; // Import icons for the new cards
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import URL from "../../../config";

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [testimonyCount, setTestimonyCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);

  // Base URL from environment variables

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Make API requests to get counts from the database
        const [
          projectRes,
          serviceRes,
          userRes,
          testimonyRes,
          messageRes,
          clientRes,
        ] = await Promise.all([
          axios.get(`${URL}/project/count`),
          axios.get(`${URL}/service/count`),
          axios.get(`${URL}/team/count`),
          axios.get(`${URL}/testimony/count`),
          axios.get(`${URL}/message/count`),
          axios.get(`${URL}/logo/count`),
        ]);

        // Update state with the counts from API responses
        setProjectCount(projectRes.data.result.count || 0);
        setServiceCount(serviceRes.data.result.count || 0);
        setUserCount(userRes.data.result.count || 0); 
        setTestimonyCount(testimonyRes.data.result.count || 0);
        setMessageCount(messageRes.data.result.count || 0);
        setClientCount(clientRes.data.result.count || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, [URL]); // Include URL as a dependency

  return (
    <main>
      <AdminHelmet
        title="Dashboard"
        description="Admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin"
      />

      <div className="container px-4">
        <PageTitle title="Global Admin Dashboard" breadCrumbs={[]} />

        <div className="card mb-4">
          <div className="card-body">
            <p className="mb-0">
              Welcome to the <strong>Global Admin Dashboard</strong>. This
              dashboard provides a centralized view of essential metrics for
              efficiently managing ongoing projects, available services, and
              registered users. Information is presented through interactive
              cards, giving a quick snapshot of current project statuses,
              service offerings, and user engagement.
            </p>
          </div>
        </div>

        <Row className="mb-4">
          {/* Project Card */}
          <Col md={4}>
            <Link to="/admin/project" className="text-decoration-none">
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <FaProjectDiagram size={40} className="text-primary mb-2" />
                  <Card.Title>Projects</Card.Title>
                  <Card.Text className="display-4 fw-bold">
                    {projectCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Services Card */}
          <Col md={4}>
            <Link to="/admin/service" className="text-decoration-none">
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <FaConciergeBell size={40} className="text-success mb-2" />
                  <Card.Title>Services</Card.Title>
                  <Card.Text className="display-4 fw-bold">
                    {serviceCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Users Card */}
          <Col md={4}>
            <Link to="/admin/team" className="text-decoration-none">
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <FaUsers size={40} className="text-danger mb-2" />
                  <Card.Title>Team</Card.Title>
                  <Card.Text className="display-4 fw-bold">
                    {userCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>

        <Row className="mb-4">

          {/* Testimony Card */}
          <Col md={4}>
            <Link to="/admin/testimony" className="text-decoration-none">
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <FaComments size={40} className="text-info mb-2" />
                  <Card.Title>Testimonies</Card.Title>
                  <Card.Text className="display-4 fw-bold">
                    {testimonyCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Message Card */}
          <Col md={4}>
            <Link to="/admin/message" className="text-decoration-none">
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <FaRegAddressCard size={40} className="text-secondary mb-2" />
                  <Card.Title>Messages</Card.Title>
                  <Card.Text className="display-4 fw-bold">
                    {messageCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>

        <Row className="mb-4">
          {/* Client Card */}
          <Col md={4}>
            <Link to="/admin/about/logo" className="text-decoration-none">
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <FaUsers size={40} className="text-dark mb-2" />
                  <Card.Title>Clients</Card.Title>
                  <Card.Text className="display-4 fw-bold">
                    {clientCount}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

        </Row>
      </div>
    </main>
  );
}
