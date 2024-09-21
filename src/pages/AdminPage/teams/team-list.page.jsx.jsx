import { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Service from "../../../service/ImageService";
const myService = new Service();

import Swal from "sweetalert2";
import { AdminHelmet, PageTitle } from "../../../components/admin";
import { NavLink } from "react-router-dom";

export default function ListTeam() {
  const token = localStorage.getItem("user_token");

  const URL = import.meta.env.VITE_APP_URL;
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

      {/* table */}
      <section id="table" className="card mb-4">
        {teams && teams.length > 0 ? (
          <Table striped="columns" responsive hover>
            <thead>
              <tr className="text-center">
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Email</th>
                <th rowSpan={2}>Position</th>
                <th rowSpan={2}>Phone</th>
                <th colSpan={1}>Avatar</th>
                <th colSpan={1}>Cover</th>
                <th rowSpan={2}>Display</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teams.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.position}</td>
                  <td>{user?.phone}</td>
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
                  <td>{user?.display}</td>
                  <td>
                    <NavLink
                      to={"/admin/team/" + user._id}
                      className="btn btn-primary"
                    >
                      Edit
                    </NavLink>
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
          <h3 className="text-center">No Data Found</h3>
        )}
      </section>
    </>
  );
}
