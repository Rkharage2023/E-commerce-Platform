import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("jwtToken");

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/admin/employees",
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchEmployees();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchEmployees();
  };

  const sendInvite = async () => {
    await axios.post(
      "http://localhost:5000/api/admin/employees/invite",
      { name, email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Invitation email sent");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Manage Employees
      </h1>

      {/* ADD EMPLOYEE FORM */}

      <form
        onSubmit={addEmployee}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Add Employee
        </button>
      </form>

      {/* EMPLOYEE TABLE */}

      <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b">
                <td className="p-3 dark:text-white">{emp.name}</td>

                <td className="p-3 dark:text-white">{emp.email}</td>

                <td className="p-3">
                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={sendInvite}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Send Invite
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

export default AdminEmployees;
