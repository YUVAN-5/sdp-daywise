import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../assets/css/AdminUser.css'

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/users/all");
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/all/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container-fluid w-full h-full pt-2">
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table table-bordered table-striped shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/admin/viewuser/${user.id}`}>
                      View
                    </Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/admin/edituser/${user.id}`}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}