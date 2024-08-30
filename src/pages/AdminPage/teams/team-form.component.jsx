import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Service from "../../../service/ImageService";
const myService = new Service();

export default function TeamFormComponent({ onHandleSubmit, data }) {
  const [team, setTeam] = useState({
    avatar: data?.avatar || null,
    cover: data?.cover || null,
    name: "",
    email: "",
    bio: "",
    position: "",
    phone: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: ""
    }
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  if (team.avatar) {
    const avatarURL = myService.getRelativePath(team.avatar.url);
  }

  useEffect(() => {
    if (data) {
      setTeam(data);
    }
  }, [data]);

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    console.log(name ,"", value);
    

    if (name === "avatar") {
      setTeam({
        ...team,
        avatar: files[0],
      });
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else if (name === "cover") {
      setTeam({
        ...team,
        cover: files[0],
      });
      setCoverPreview(URL.createObjectURL(files[0]));
    } else if (team.socialLinks && name in team.socialLinks) {
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

  // while removing image from preview
  const handleRemove = (type) => {
    if (type == "avatar") {
      setAvatarPreview(null);
      setTeam({
        ...team,
        avatar: null,
      });
    }

    if (type == "cover") {
      setCoverPreview(null);
      setTeam({
        ...team,
        cover: null,
      });
    }
  };

  // Clean up object URLs when component unmounts or previews change
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [team.avatar, team.cover]);

  // handle submit
  const handleSubmit = async (e) => {
    console.log(team);
    
    e.preventDefault();

    onHandleSubmit(team);
  };

  return (
    <>
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
              defaultValue={team?.name}
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
              defaultValue={team?.email}
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
              defaultValue={team?.bio}
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
              defaultValue={team?.position}
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
              defaultValue={team?.phone}
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
              placeholder="linkedin link"
              required
              defaultValue={team?.socialLinks?.linkedin}
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
              placeholder="facebook link"
              required
              defaultValue={team?.socialLinks?.facebook}
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
              placeholder="instagram link"
              required
              defaultValue={team?.socialLinks?.instagram}
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
        </Row>

        <Row>
          <Col className="md-6">
            {avatarPreview || team?.avatar?.url ? (
              <div className="position-relative">
                <img
                  className="img img-fluid"
                  src={
                    avatarPreview
                      ? avatarPreview
                      : myService.getRelativePath(team?.avatar?.url)
                  }
                  alt="Avatar Preview"
                  height="500px"
                />
                <Button
                  variant="danger"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemove("avatar")}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </div>
            ) : (
              !team.avatar && <p>No Avatar Selected</p>
            )}
          </Col>

          <Col className="md-6">
            {coverPreview || team?.cover?.url ? (
              <div className="position-relative">
                <img
                  className="img img-fluid"
                  src={
                    coverPreview
                      ? coverPreview
                      : myService.getRelativePath(team?.cover?.url)
                  }
                  alt="Cover Preview"
                  height="500px"
                />
                <Button
                  variant="danger"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemove("cover")}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </div>
            ) : (
              !team.cover && <p>No Cover Selected</p>
            )}
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
