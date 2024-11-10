import React, { useState, useEffect } from "react";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { Card, Row, Col, Form, Button, Alert } from "react-bootstrap";
import URL from "../../../config";

export default function Profile() {
  // State for user info and password fields
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch user info from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user)
      setUserId(user.id);
    }
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch(`${URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.msg || "Password changed successfully!");
        setError(null);
      } else {
        setError(result.msg || "Failed to change password.");
        setSuccess(null);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setSuccess(null);
    }
  };

  return (
    <main>
      <AdminHelmet
        title="Change Password"
        description="Admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin"
      />

      <div className="container px-4">
        <PageTitle title="Global Admin Dashboard" breadCrumbs={[]} />

        <div className="card mb-4">
          <div className="card-body">
            <p className="mb-0">
              Hi,  <strong>{user?.name}</strong>. From here
              you can update your password. <br />
              Click <a rel="stylesheet" href="" >here</a> if you forget your current password.
            </p>
          </div>
        </div>

        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Form onSubmit={handlePasswordChange}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}

                  <Form.Group controlId="currentPassword" className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="newPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Change Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
}
