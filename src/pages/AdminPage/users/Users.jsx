import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState([]);
  const URL = "http://localhost:3000";
  const UserURL = URL + "/user";
  const token = localStorage.getItem("user_token");

  //fetch user list at first when page load
  useEffect(() => {
    fetchUsers();
  }, [token]);

  //fetchUsers
  const fetchUsers = async () => {
    try {
      const response = await fetch(UserURL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();

      if (data.status) {
        setUsers(data.result);
      }
    } catch (error) {
      toast.error("frontend error");
      console.log(error);
    }
  };

  //editOne
  const editOne = async (id) => {
    //TODO: edit logic
  };

  const deleteOne = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then( async (result) => {
        if (result.isConfirmed) {
          const result = await fetch(`${URL}/user/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          })
          const data = await result.json();
          console.log(data);
          

          if(data.status){
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: data.msg,
              icon: "success",
            });
            fetchUsers();
          } else{
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: data.msg,
              icon: "error",
            });
          }  
                    
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your file is safe :)",
            icon: "error",
          });
        }
      });

      //changed with sweet alert
    // try {
    //   const response = await fetch(`${URL}/user/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: token,
    //     },
    //   });
    //   const data = await response.json();

    //   if (data.status) {
    //     toast.success(data?.msg);
    //   } else {
    //     toast.error(data?.msg);
    //   }

    //   //refresh list
    //   fetchUsers();
    // } catch (error) {
    //   toast.error("frontend error");
    //   console.log(error);
    // }
  };

  return (
    <div className="container">
      <h1 className="text-center m-3 ">User Info</h1>
      {users && users.length > 0 ? (
        <Table striped responsive hover>
          <thead>
            <tr>
              <th rowSpan={2}>#</th>
              <th rowSpan={2}>Username</th>
              <th rowSpan={2}>Email</th>
              <th rowSpan={2}>Status</th>
              <th rowSpan={2}>Role</th>
              <th colSpan={3} className="text-center">
                Profile
              </th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{user?.status}</td>
                <td>{user?.role}</td>
                <td>{user?.profile.fullName}</td>
                <td>{user?.profile.contactNumber}</td>
                <td>{user?.profile.address}</td>

                <td>
                  <Button
                    className="btn-primary"
                    onClick={() => {
                      editOne(user?._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn-danger"
                    onClick={() => {
                      deleteOne(user?._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>No users found</h3>
      )}
    </div>
  );
}
