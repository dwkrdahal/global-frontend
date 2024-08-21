import { PageTitle } from "../../../components/admin";
import TeamFormComponent from "./team-form.component";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTeam() {
  const params = useParams();
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_APP_URL;
  const fetchURL = URL + "/team/" + params.id;

  const token = localStorage.getItem("user_token");
  let [teamData, setTeamData] = useState();

  const editTeam = async (team) => {
    try {
      const formData = new FormData();
      formData.append("name", team?.name);
      formData.append("position", team?.position);
      formData.append("bio", team?.bio);
      formData.append("phone", team?.phone);
      formData.append("email", team?.email);

      // Check if avatar or cover is null, if so, send a flag or omit them
      if (team.avatar) {
        formData.append("avatar", team.avatar);
      } else {
        formData.append("avatar", ""); // Use an empty string or a specific flag to indicate removal
      }

      if (team.cover) {
        formData.append("cover", team.cover);
      } else {
        formData.append("cover", ""); // Use an empty string or a specific flag to indicate removal
      }

      formData.append("socialLinks.facebook", team?.socialLinks?.facebook);
      formData.append("socialLinks.instagram", team?.socialLinks?.instagram);
      formData.append("socialLinks.linkedin", team?.socialLinks?.linkedin);

      const response = await fetch(fetchURL, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        toast.success(data.msg);
        navigate("/admin/team");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeam = async () => {
    try {
      const result = await fetch(fetchURL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();

      if (data.status) {
        setTeamData(data.result);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Error! Cannot find data");
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <>
      <PageTitle
        title="Edit Team Page"
        breadCrumbs={[
          { name: "Teams", path: "/admin/team" },
          { name: "Edit Team" },
        ]}
        link={{ to: "/admin/team", label: "List Team", icon: "fas fa-eye" }}
      />

      <TeamFormComponent onHandleSubmit={editTeam} data={teamData} />
    </>
  );
}

export default EditTeam;
