import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Dropdown,
  Row,
  Col,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import URL from "../../../config";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterApprovalStatus, setFilterApprovalStatus] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const token = localStorage.getItem("user_token");
  const UserURL = `${URL}/user`;

  // Fetch user list when the page loads
  useEffect(() => {
    fetchUsers();
  }, [token]);

  // Fetch user data from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch(UserURL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();

      if (data.status) {
        setUsers(data.result);
        setFilteredUsers(data.result);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
      console.log(error);
    }
  };

  // Function to filter users
  const filterUsers = () => {
    let filtered = users;

    // Filter by role if not set to 'All'
    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    // Filter by status if not set to 'All'
    if (filterStatus !== "All") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    // Filter by approval status if not set to 'All'
    if (filterApprovalStatus !== "All") {
      filtered = filtered.filter(
        (user) => user.approvalStatus === filterApprovalStatus
      );
    }

    setFilteredUsers(filtered);
  };

  // Handle deleting a user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const result = await fetch(`${UserURL}/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
        const data = await result.json();

        if (data.status) {
          setUsers(users.filter((user) => user._id !== userId));
          setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
          toast.success("User deleted successfully");
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        toast.error("Failed to delete the user.");
      }
    }
  };

  // Handle opening the modal for editing a user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowApproveModal(true);
  };

  // Handle updating user details (modal form)
  const handleApproveUser = async () => {
    try {
      // Set approval_status to "approved" in selectedUser
      const updatedUser = {
        ...selectedUser,
        approval_status: "approved",
      };

      const response = await fetch(`${UserURL}/${selectedUser._id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();

      if (data.status) {
        fetchUsers(); // Refresh user list
        toast.success("Permission Granted!");
        setShowApproveModal(false);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Failed to update the user.");
    }
  };

  // Update filter states and apply filters
  const updateFilterRole = (role) => {
    setFilterRole(role);
    filterUsers();
  };

  const updateFilterStatus = (status) => {
    setFilterStatus(status);
    filterUsers();
  };

  const updateFilterApprovalStatus = (approvalStatus) => {
    setFilterApprovalStatus(approvalStatus);
    filterUsers();
  };

  return (
    <>
      <AdminHelmet
        title="Users"
        description="Admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/users"
      />

      <div className="container">
        <PageTitle
          title="User Management Page"
          breadCrumbs={[{ name: "User", path: "/admin/users" }]}
        />

        {/* Combined Dropdown Filters */}
        <div className="d-flex mb-3 ">
          {/* Dropdown for Role Filtering */}
          <Dropdown className="mr-2">
            <Dropdown.Toggle
              variant="light"
              id="role-dropdown"
              className="w-100"
            >
              Role: {filterRole}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => updateFilterRole("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateFilterRole("admin")}>
                Admin
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateFilterRole("customer")}>
                Customer
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => updateFilterRole("project_manager")}
              >
                Project Manager
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateFilterRole("architect")}>
                Architect
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Dropdown for Status Filtering */}
          {/* <Dropdown className="mr-2" style={{ flex: 1 }}>
            <Dropdown.Toggle
              variant={
                filterStatus === "active"
                  ? "info"
                  : filterStatus === "inactive"
                  ? "secondary"
                  : "light"
              }
              id="status-dropdown"
              className="w-100"
            >
              {filterStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => updateFilterStatus("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateFilterStatus("active")}>
                Active
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateFilterStatus("inactive")}>
                Inactive
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          {/* Dropdown for Approval Status Filtering */}
          {/* <Dropdown style={{ flex: 1 }}>
            <Dropdown.Toggle
              variant={
                filterApprovalStatus === "approved"
                  ? "success"
                  : filterApprovalStatus === "pending"
                  ? "warning"
                  : filterApprovalStatus === "rejected"
                  ? "danger"
                  : "light"
              }
              id="approval-status-dropdown"
              className="w-100"
            >
              {filterApprovalStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => updateFilterApprovalStatus("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => updateFilterApprovalStatus("pending")}
              >
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => updateFilterApprovalStatus("approved")}
              >
                Approved
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => updateFilterApprovalStatus("rejected")}
              >
                Rejected
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>

        {/* Display Users in Cards */}
        <Row className="mt-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Col key={user._id} xs={12} sm={6} md={6} lg={4} className="mb-4">
                <Card className="user-card h-100">
                  <Card.Body className="d-flex flex-column">
                    <Badge
                      pill
                      bg={user.status === "active" ? "success" : "secondary"}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {user.status === "active"
                        ? "Active"
                        : user?.approval_status}
                    </Badge>
                    <Card.Title>{user?.profile?.fullName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {user.role}
                    </Card.Subtitle>
                    <Card.Text>
                      uname: <strong>{user?.username}</strong>
                      <br />
                      email: <strong>{user?.email}</strong>
                    </Card.Text>
                    <Card.Text>{user?.profile?.address}</Card.Text>

                    {user.approval_status === "pending" ? (
                      <div className="mt-auto d-flex justify-content-between">
                        <Button
                          variant="warning"
                          onClick={() => handleEdit(user)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-auto d-flex justify-content-center">
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(user)}
                        >
                          Change Status
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No users found</p>
          )}
        </Row>
      </div>

      {/* Approve User Modal */}
      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Approve New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name Field */}
            <Form.Group controlId="userName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.profile?.fullName || ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    profile: {
                      ...selectedUser.profile,
                      fullName: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>

            {/* Role Dropdown */}
            <Form.Group controlId="userRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser?.role || ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    role: e.target.value,
                  })
                }
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="project_manager">Project Manager</option>
                <option value="architect">Architect</option>
              </Form.Control>
            </Form.Group>

            {/* Status Dropdown */}
            <Form.Group controlId="userRole">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser?.status || ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    status: e.target.value,
                  })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">In Active</option>
              </Form.Control>
            </Form.Group>

            {/* Add more form fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowApproveModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApproveUser}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
``;
