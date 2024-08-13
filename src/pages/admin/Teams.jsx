import { useEffect, useState } from "react";
import { Table, Container, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Service from "../../service/ImageService";
const myService = new Service();

import Swal from "sweetalert2";

function Teams() {
  const token = localStorage.getItem("user_token");

  const URL = "http://localhost:3000";
  const teamURL = URL + "/team";

  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({
    name: "",
    position: "",
    bio: "",
    email: "",
    phone: "",
    avatar: null,
    cover: null,
    socialLinks: {
      linkedin: "",
      facebook: "",
      instagram: "",
    },
  });

  let avatarPreview = null;
  let coverPreview = null;

  const handleChange = (e) => {
    let { name, value, files, type } = e.target;

    // console.log(files);

    if (name === "avatar") {
      setTeam({
        ...team,
        avatar: files[0],
      });
    } else if (name === "cover") {
      setTeam({
        ...team,
        cover: files[0],
      });
    } else if (name in team.socialLinks) {
      setTeam({
        ...team,
        socialLinks: {
          ...team.socialLinks,
          [name]: value,
        },
      });
    } else {
      setTeam({
        ...team,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", team?.name);
      formData.append("position", team?.position);
      formData.append("bio", team?.bio);
      formData.append("phone", team?.phone);
      formData.append("email", team?.email);
      formData.append("avatar", team?.avatar);
      formData.append("cover", team?.cover);
      formData.append("socialLinks.facebook", team?.socialLinks?.facebook);
      formData.append("socialLinks.instagram", team?.socialLinks?.instagram);
      formData.append("socialLinks.linkedin", team?.socialLinks?.linkedin);

      const response = await fetch(teamURL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        toast.success(data.msg);
        fetchTeam();

        // Scroll to the table section
        window.scrollTo({
          top: document.querySelector("#table").offsetBottom,
          behavior: "smooth",
        });
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(data);

      if (data.status) {
        setTeam(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {/* form */}
      <section id="form">
        <Form onSubmit={handleSubmit} className="mb-3" id="#form">
          <h1 className="text-center m-3">Add Team Page</h1>

          <Row>
            <Form.Group
              className="mb-3"
              controlId="formGridName"
              as={Col}
              md={6}
              sm={12}
            >
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                required
                value={team?.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGridEmail"
              as={Col}
              md={6}
              sm={12}
            >
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={team?.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group
              className="mb-3"
              as={Col}
              xs={12}
              md={12}
              controlId="formGridBio"
            >
              <Form.Label>Bio *</Form.Label>
              <Form.Control
                type="text"
                name="bio"
                required
                value={team?.bio}
                placeholder="BIO"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group
              className="mb-3"
              as={Col}
              xs={12}
              md={6}
              controlId="formGridPosition"
            >
              <Form.Label>Position *</Form.Label>
              <Form.Control
                type="text"
                name="position"
                placeholder="position"
                value={team?.position}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Col}
              xs={12}
              md={6}
              controlId="formGridPhone"
            >
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone"
                required
                value={team?.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group
              className="mb-3"
              controlId="formLink01"
              as={Col}
              xs={6}
              md={4}
            >
              <Form.Label>linkedin *</Form.Label>
              <Form.Control
                type="text"
                name="linkedin"
                placeholder="Enter linkedin"
                required
                value={team?.socialLinks?.linkedin}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formLink02"
              as={Col}
              xs={6}
              md={4}
            >
              <Form.Label>facebook *</Form.Label>
              <Form.Control
                type="text"
                name="facebook"
                placeholder="Enter facebook"
                required
                value={team?.socialLinks?.facebook}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formLink03"
              as={Col}
              xs={6}
              md={4}
            >
              <Form.Label>instagram *</Form.Label>
              <Form.Control
                type="text"
                name="instagram"
                placeholder="Enter instagram"
                required
                value={team?.socialLinks?.instagram}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group
              controlId="formFile01"
              className="mb-3"
              as={Col}
              xs={12}
              md={6}
            >
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" name="avatar" onChange={handleChange} />
            </Form.Group>

            <Col className="md-6">
              {/* {console.log( team.avatar)} */}
              {avatarPreview ? (
                <img
                  className="img img-fluid"
                  src={URL.createObjectURL(team.avatar)}
                ></img>
              ) : (
                <p> thumbnail </p>
              )}
            </Col>

            <Form.Group
              controlId="formFile02"
              className="mb-3"
              as={Col}
              xs={12}
              md={6}
            >
              <Form.Label>Cover</Form.Label>
              <Form.Control type="file" name="cover" onChange={handleChange} />
            </Form.Group>

            <Col className="md-6">
              {/* {console.log( coverPreview)} */}
              {coverPreview ? (
                <img
                  className="img img-fluid"
                  src={URL.createObjectURL(coverPreview)}
                ></img>
              ) : (
                <p>thumbnail</p>
              )}
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </section>

      {/* table */}
      <section id="table">
        <h1 className="text-center m-3 ">Teams Info</h1>
        {teams && teams.length > 0 ? (
          <Table striped="columns" responsive hover>
            <thead>
              <tr className="text-center">
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Email</th>
                <th rowSpan={2}>Position</th>
                <th rowSpan={2}>Bio</th>
                <th rowSpan={2}>Phone</th>
                <th colSpan={3}>Social Media</th>
                <th colSpan={1}>Avatar</th>
                <th colSpan={1}>Cover</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Instagram</th>
                <th>Facebook</th>
                <th>Linkedin</th>
                <th>img</th>
                <th>url</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.position}</td>
                  <td>{user?.bio}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.socialLinks?.instagram}</td>
                  <td>{user?.socialLinks?.facebook}</td>
                  <td>{user?.socialLinks?.linkedin}</td>
                  <td>
                    <img
                      src={myService.getRelativePath(user?.avatar?.url)}
                      height="auto"
                      width="100px"
                      alt={user?.avatar?.caption || "no-image"}
                      onClick={() => {
                        Swal.fire({
                          title: user?.name,
                          text: user?.position,
                          imageUrl: myService.getRelativePath(
                            user?.avatar?.url
                          ),
                          imageHeight: 400,
                          imageAlt: "Custom image",
                        });
                      }}
                    />
                  </td>
                  <td>
                    <img
                      src={myService.getRelativePath(user?.cover?.url)}
                      alt={user?.cover?.caption || "no image"}
                      height="auto"
                      width="100px"
                      onClick={() => {
                        Swal.fire({
                          title: user?.name,
                          text: user?.position,
                          imageUrl: myService.getRelativePath(user?.cover?.url),
                          imageWidth: 400,
                          imageAlt: "Custom image",
                        });
                      }}
                    />
                  </td>

                  <td>
                    <Button
                      className="btn-primary"
                      onClick={() => editOne(user._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={() => deleteOne(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3>No teams found</h3>
        )}
      </section>
    </Container>
  );
}

export default Teams;
