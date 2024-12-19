import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Display = () => {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const fetchTask = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTask(response.data);
    } catch (err) {
      console.log("Error while fetching Data", err);
    }
  };
  useEffect(() => {
    fetchTask();
  });
  const handleDelete = async (id) => {
    if (Window.confirm("Are you sure want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTask();
      } catch (err) {
        console.log("Error Deleting Data", err);
      }
    }
  };

  const handleEdit = (tasks) => {
    navigate("/form", { state: { tasks } });
  };
  return (
    <div className="mt-5">
      <div className="container">
        <div className="add-btn mt-2">
          <button className="btn btn-primary">Add Data</button>
        </div>
        <br />
        <table class="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Task</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {task.map((tasks) => (
              <tr key={task._id}>
                <th scope="row">{task._id}1</th>
                <td>{task.name}</td>
                <td>{task.email}</td>
                <td>{task.Description}</td>
                <td
                  className="d-flex justify-content-between"
                  style={{ marginInline: "30%" }}
                >
                  <button className="btn btn-success">Show</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(tasks)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(tasks)}
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
  );
};

export default Display;
