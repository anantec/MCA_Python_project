import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // For redirecting the user after logout

  // Fetch and display data in the table
  const fetchUsers = async () => {
    const apiURL = "http://127.0.0.1:8000/api/records/";

    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error('Failed to fetch data');

      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete user function
  const deleteUser = async (id) => {
    const deleteURL = `http://127.0.0.1:8000/api/records/${id}/`;

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(deleteURL, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("User deleted successfully!");
          fetchUsers(); // Refresh the table after deletion
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Handle logout
  const logoutUser = () => {
    // Clear any authentication token or session data if necessary
    localStorage.removeItem("authToken"); // Example: removing auth token from localStorage

    // Redirect to login page
    navigate("/"); // Redirect to login page
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users Table</h1>

      <button className="logout-btn" onClick={logoutUser}>Logout</button>

      <table id="usersTable">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.weight}</td>
              <td>{user.mobileNo}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
        .delete-btn {
          color: red;
          cursor: pointer;
        }
        .logout-btn {
          margin-top: 20px;
          padding: 10px 15px;
          background-color: #f44336;
          color: white;
          border: none;
          cursor: pointer;
        }
        .logout-btn:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </div>
  );
}

export default UsersTable;
