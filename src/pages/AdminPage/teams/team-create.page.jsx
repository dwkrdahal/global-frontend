import { useNavigate } from "react-router-dom";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import TeamFormComponent from "./team-form.component";
import { toast } from "react-toastify";
import URL from "../../../config";

function CreateTeam() {
  const teamURL = URL + "/team";

  const navigate = useNavigate();

  const addTeam = async (team) => {
    try {
      const formData = new FormData();
      formData.append("name", team?.name);
      formData.append("position", team?.position);
      formData.append("bio", team?.bio);
      formData.append("phone", team?.phone);
      formData.append("email", team?.email);
      formData.append("avatar", team?.avatar);
      formData.append("cover", team?.cover);
      formData.append("display", team?.display);
      formData.append("socialLinks.facebook", team?.socialLinks?.facebook);
      formData.append("socialLinks.instagram", team?.socialLinks?.instagram);
      formData.append("socialLinks.linkedin", team?.socialLinks?.linkedin);

      const response = await fetch(teamURL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        // console.log("from db",data);
        toast.success(data.msg);
        navigate("/admin/team");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHelmet
        title="Create Team Member"
        description="admin panel for Global Construction & Engineering."
        url="https://globalconstruction.com.np/admin/team/create"
      />

      <PageTitle
        title="Create Team Page"
        breadCrumbs={[
          { name: "Teams", path: "/admin/team" },
          { name: "Create Team" },
        ]}
        link={{ to: "/admin/team", label: "List Team", icon: "fas fa-eye" }}
      />

      <TeamFormComponent onHandleSubmit={addTeam} />
    </>
  );
}

export default CreateTeam;
