import React, { useState } from "react";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const URL = import.meta.env.VITE_APP_URL;
  const projectURL = URL + "/project";

  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    location: "",
    architectureStyle: "",
    projectStatus: "",
    projectType: "",
    siteArea: {
      value: "",
      unit: "sq. ft.",
    },
    builtUpArea: {
      value: "",
      unit: "sq. ft.",
    },
    client: {
      name: "",
      contact: [],
    },
    designer: "",
    year: {
      started: "",
      expected: "",
      completion: "",
    },
    images: [],
    isFeatured: "false",
    isActive: "false",
  });

  const architectureStyles = [
    "Modern",
    "Classical",
    "Contemporary",
    "Industrial",
  ];
  const projectTypes = ["residential", "commercial", "industrial", "mixed-use"];
  const status = [
    "planned",
    "in-progress",
    "completed",
    "on-hold",
    "cancelled",
  ];

  const handleDescriptionChange = (e, editor) => {
    const data = editor.getData();
    setProjectData({ ...projectData, description: data });
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (name in projectData.year) {
      setProjectData({
        ...projectData,
        year: {
          ...projectData.year,
          [name]: value,
        },
      });
    } else if (name === "siteArea") {
      setProjectData({
        ...projectData,
        siteArea: {
          ...projectData.siteArea,
          value: value,
        },
      });
    } else if (name === "builtUpArea") {
      setProjectData({
        ...projectData,
        builtUpArea: {
          ...projectData?.builtUpArea,
          value: value,
        },
      });
    } else if (name === "clientName") {
      setProjectData({
        ...projectData,
        client: {
          ...projectData?.client,
          name: value,
        },
      });
    } else if (name === "clientContact") {
      setProjectData({
        ...projectData,
        client: {
          ...projectData?.client,
          contact: value,
        },
      });
    } else if (type === "file") {
      const selectedFiles = Array.from(e.target.files);
      setProjectData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...selectedFiles],
      }));
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(projectData);

    const formData = new FormData();
    try {
      //append the data
      for (const key in projectData) {
        if (
          typeof projectData[key] === "object" &&
          !Array.isArray(projectData[key])
        ) {
          // Handle nested objects (like client or siteArea)
          for (const nestedKey in projectData[key]) {
            formData.append(
              `${key}[${nestedKey}]`,
              projectData[key][nestedKey]
            );
          }
        } else if (Array.isArray(projectData[key])) {
          // Handle file arrays (images)
          if (key === "images") {
            projectData.images.forEach((file) => {
              formData.append("images", file);
            });
          } else {
            projectData[key].forEach((value, index) => {
              formData.append(`${key}[${index}]`, value);
            });
          }
        } else {
          formData.append(key, projectData[key]);
        }
      }

      //submit the form data
      const response = await fetch(projectURL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("user_token"),
        },
      });

      const data = await response.json();
      // console.log(data);

      if (data.status) {
        toast.success(data.msg);
        navigate(`/admin/project/${data.result._id}`);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      // console.log(error);

      toast.error(error.message);
    }
  };

  return (
    <>
      <AdminHelmet
        title="Create Project"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/project/create"
      />
      <PageTitle
        title="Create Project Page"
        breadCrumbs={[
          { name: "Projects", path: "/admin/project" },
          { name: "Create Project" },
        ]}
        link={{
          to: "/admin/project",
          label: "List Project",
          icon: "fas fa-eye",
        }}
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formFeatured">
          <Col sm="2"></Col>
          <Col sm="3">
            <Form.Check
              type="checkbox"
              name="isFeatured"
              label=" Featured"
              checked={projectData.isFeatured}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  isFeatured: e.target.checked, // Update the boolean value
                })
              }
            />
          </Col>
          <Col sm="3">
            <Form.Check
              type="checkbox"
              name="isActive"
              label=" Active"
              checked={projectData.isActive}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  isActive: e.target.checked, // Update the boolean value
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="title"
              value={projectData.title}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDescription">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <CKEditor
              editor={ClassicEditor}
              data={projectData.description}
              onChange={handleDescriptionChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formLocation">
          <Form.Label column sm="2">
            Location
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="location"
              value={projectData.location}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formProjStatus">
          <Form.Label column sm="2">
            Project Status
          </Form.Label>
          <Col sm="10">
            <select
              name="projectStatus"
              value={projectData.projectStatus}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Project Status --</option>
              {status.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDate">
          <Form.Label column sm="2">
            Start Date
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="date"
              name="started"
              value={projectData?.year?.started}
              onChange={handleChange}
              required
            />
          </Col>

          <Form.Label column sm="2">
            End Date (
            {projectData?.projectStatus === "completed"
              ? "completion"
              : "expected"}
            )
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="date"
              name={
                projectData?.projectStatus === "completed"
                  ? "completion"
                  : "expected"
              }
              value={
                projectData?.date?.[
                  projectData?.projectStatus === "completed"
                    ? "completion"
                    : "expected"
                ]
              }
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formProjType">
          <Form.Label column sm="2">
            Project Type
          </Form.Label>
          <Col sm="4">
            <select
              name="projectType"
              value={projectData.projectType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Project Type --</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formArchStyle">
          <Form.Label column sm="2">
            Architecture Style
          </Form.Label>
          <Col sm="10">
            <select
              name="architectureStyle"
              value={projectData.architectureStyle}
              onChange={handleChange}
              required
              id=""
            >
              <option value="">-- Select Architecture Style --</option>
              {architectureStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formSiteArea">
          <Form.Label column sm="2">
            Site Area
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              name="siteArea"
              value={projectData?.siteArea?.value}
              onChange={handleChange}
              min="1"
              required
            />
          </Col>

          <Form.Label column sm="2">
            Built-Up Area
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              name="builtUpArea"
              value={projectData?.builtUpArea?.value}
              onChange={handleChange}
              min="1"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formClient">
          <Form.Label column sm="2">
            Client
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="text"
              name="clientName"
              value={projectData?.client?.name}
              onChange={handleChange}
              required
              placeholder="Name"
            />
          </Col>
          <Col sm="4" className="mb-3">
            <Form.Control
              type="tel"
              name="clientContact"
              value={projectData?.client?.contact}
              onChange={handleChange}
              min="1"
              required
              placeholder="Number"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formImage">
          <Form.Label column sm="2">
            Images
          </Form.Label>
          <Col sm="7">
            <Form.Control
              name="images"
              type="file"
              multiple
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Project
        </Button>
      </Form>
    </>
  );
}
