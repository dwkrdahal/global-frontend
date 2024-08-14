import { useState } from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function AddTeams() {
  const URL = "http://localhost:3000";
  const teamURL = URL + "/team";

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
    let { name, value, files } = e.target;

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
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="px-4">
      <h1 className="mt-4">Add Team Member</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <NavLink className="breadcrumb-item" to="/admin">Dashboard</NavLink>
        </li>
        <li className="breadcrumb-item active">
          <NavLink className="breadcrumb-item" to="/admin/team">Team</NavLink>
        </li>
        <li className="breadcrumb-item">add</li>
      </ol>
      <Form onSubmit={handleSubmit} className="mb-3" id="#form">
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
    </Container>
  );
}

export default AddTeams;
