import { Col, Row } from "react-bootstrap";
import "./team.css";
import { useEffect, useState } from "react";
import Service from "../../../service/ImageService";
import { Helmet } from "react-helmet";
const myService = new Service();

const URL = import.meta.env.VITE_APP_URL;
const teamURL = URL + "/team";

function Team() {
  useEffect(() => {
    fetchTeam();
  }, []);
  const [teams, setTeams] = useState([]);

  const fetchTeam = async () => {
    try {
      const response = await fetch(teamURL, {
        method: "GET",
      });

      const data = await response.json();
      if (data.status) {
        // Filter out items where 'display' is 0
        const filteredTeams = data.result.filter((team) => team.display !== 0);

        // Sort the remaining items based on the 'display' field
        const sortedTeams = filteredTeams.sort((a, b) => {
          if (a.display < b.display) {
            return -1;
          }
          if (a.display > b.display) {
            return 1;
          }
          return 0;
        });

        // Set the sorted data to the state
        setTeams(sortedTeams);
      }
    } catch (error) {
      Toast.error("Network Error!");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Meet the talented team behind Global Construction & Engineering. Our experts bring innovation, expertise, and commitment to every project."
        />
        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="our team, construction professionals, engineering experts, project managers, architects, skilled workers, construction team, Nepal construction, team expertise, construction solutions, About Global Construction, Construction Company Nepal, Engineering Services Nepal, Quality Construction Nepal, Residential Projects Nepal, Commercial Projects Nepal, Infrastructure Development Nepal, building the future in Nepal, Global Construction team, construction experts Nepal, innovative engineering Nepal"
        />
      </Helmet>

      <section className="team-section">
        <Row>
          {teams.map((member, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <div className="team-card">
                <div className="team-image-wrapper">
                  <img
                    src={myService.getRelativePath(member?.avatar?.url)}
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
