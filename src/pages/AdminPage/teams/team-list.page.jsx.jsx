import { useEffect, useState } from "react";
import { Table, Container, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { NavLink } from "react-router-dom";
import URL from "../../../config";

export default function ListTeam() {
  const token = localStorage.getItem("user_token");

  const teamURL = URL + "/team";

  const [teams, setTeams] = useState([]);

  //fetch team while opening page
  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const teams = await fetch(teamURL, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await teams.json();
    if (data.status) {
      setTeams(data.result);
    }
  };

  const deleteOne = async (id) => {
    try {
      const response = await fetch(`${teamURL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      //refresh after deletion
      fetchTeam();

      const data = await response.json();
      if (data.status) {
        toast.success(data?.msg);
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editOne = async (id) => {
    // Scroll to the form section
    window.scrollTo({
      top: document.querySelector("#form"),
      behavior: "smooth",
    });

    try {
      const response = await fetch(`${URL}/team/${id}`, {
        method: "GET",
        header: {
          Authorization: token,
        },
      });
      const data = await response.json();
      // console.log(data);

      if (data.status) {
        setTeams(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHelmet
        title="Teams"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/team"
      />
      <PageTitle
        title="List Team Page"
        breadCrumbs={[
          { name: "Teams", path: "/admin/team" },
          { name: "List Team" },
        ]}
        link={{
          to: "/admin/team/create",
          label: "Create Team",
          icon: "fas fa-paper-plane",
        }}
      />
      {/* // Card section for displaying team members */}
      <section id="team-cards" className="mb-4">
        {teams && teams.length > 0 ? (
          <Row>
            {teams.map((user, i) => (
              <Col key={i} md={6} lg={4} className="mb-4">
                <Card className="text-center h-100">
                  {/* Display avatar image */}
                  <Card.Img
                    variant="top"
                    src={user?.avatar?.url || "/path/to/default-image.jpg"}
                    alt={user?.avatar?.caption || "No Image"}
                    className="card-img-top p-3"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      Swal.fire({
                        title: user?.name,
                        text: user?.position,
                        imageUrl: user?.avatar?.url,
                        imageHeight: 400,
                        imageAlt: "Custom image",
                      })
                    }
                  />

                  {/* Display user details */}
                  <Card.Body>
                    <Card.Title>{user?.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {user?.position}
                    </Card.Text>
                    <Card.Text>{user?.email}</Card.Text>
                    <Card.Text>{user?.phone}</Card.Text>
                  </Card.Body>

                  {/* Edit and Delete Buttons */}
                  <Card.Footer className="d-flex justify-content-center">
                    <NavLink
                      to={`/admin/team/${user._id}`}
                      className="btn btn-primary me-2"
                    >
                      Edit
                    </NavLink>
                    <Button
                      variant="danger"
                      onClick={() => deleteOne(user._id)}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <h3 className="text-center">No Data Found</h3>
        )}
      </section>
    </>
  );
}
