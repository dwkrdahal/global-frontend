import { Col, Row } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import "./team.css";

const teamMembers = [
  {
    name: "Bibek Khadka",
    position: "Chairman / CEO",
    image: "/images/team2.jpg",
  },
  // {
  //   name: "Alisha Basnet Khadka",
  //   position: "Account Head",
  //   image: "/images/team7.jpg",
  // },
  { name: "Diwakar Dahal", position: "Managing Director", image: "/images/team1.jpg" },
  {
    name: "Ishwor Budhathokii",
    position: "Procurement Head",
    image: "/images/team3.jpg",
  },
  {
    name: "Binod Khadka",
    position: "Project Manager",
    image: "/images/team4.jpg",
  },
  {
    name: "Rupesh Limbu",
    position: "Structural Engineer",
    image: "/images/team5.jpg",
  },
  {
    name: "Rajesh Khadka",
    position: "Site Manager",
    image: "/images/team6.jpg",
  },
];

function Team() {
  return (
    <>
      <section className="team-section">
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <div className="team-card">
                <div className="team-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                  />
                  <div className="team-info">
                    <h5 className="member-name">{member.name}</h5>
                    <p>{member.position}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}

export default Team;
