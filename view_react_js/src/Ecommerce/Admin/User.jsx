import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //delete
  const deleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        // Nếu người dùng nhấn OK (Xác nhận xóa), thực hiện xóa
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        fetchUsers();
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
        });
      } else {
        // Nếu người dùng nhấn Cancel, không làm gì cả
        Swal.fire("Cancelled", "The user is safe :)", "info");
      }
    } catch (error) {
      console.log("Failed to delete user:", error);
    }
  };
  return (
    <div className="row">
      <div className="col-12 mx-auto">
        <table className="table bg-white rounded border">
          <thead className="text-center">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.username}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(item.id)}
                  >
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
