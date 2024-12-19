import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const [currentId, setCurrentId] = useState("");
  const [currentTask, setCurrentTask] = useState({
    name: "",
    email: "",
    Description: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.tasks) {
      const task = location.state.tasks;
      setCurrentId(task.id);
      setCurrentTask({
        name: task.name,
        email: task.email,
        Description: task.task,
      });
    }
  }, [location.state]);
  const validationSchema = Yup.object({
    name: Yup.string().required("Enter Your Full Name"),
    email: Yup.string()
      .required("Enter Your Email Id ")
      .email("It should be valid Email Id"),
    Description: Yup.string()
      .required("Enter Description of your tasks")
      .max(100, "Must be atleast 100 character"),
  });
  const handleSubmit = async (values, { resetForm }) => {
    const taskData = {
      name: values.name,
      email: values.email,
      Description: values.Description,
    };
    try {
      if (currentId) {
        await axios.put(
          `http://localhost:5000/api/tasks/${currentId}`,
          taskData
        );
      } else {
        await axios.post(`http://localhost:5000/api/tasks`, taskData);
      }

      resetForm();
      setCurrentId("");
      setCurrentTask({ name: "", email: "", Description: "" });
      navigate("/");
    } catch (err) {
      console.log("Error saving task data", err);
    }
  };
  return (
    <div className="container-form">
      <center>
        <h1>Form</h1>
      </center>
      <Formik
        initialValues={currentTask}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-4">
          <div className="row">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <Field
                type="text"
                name="name"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                email
              </label>
              <Field
                type="email"
                name="email"
                class="form-control"
                id="exampleInputPassword1"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div class="mb-3 col-lg-12 col-md-12 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Description
              </label>
              <Field
                as="textarea"
                name="Description"
                className="form-control"
                id=""
                cols="30"
                rows="5"
              />
              <ErrorMessage
                name="Description"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              {currentId ? "Edit " : "Add "}
              Task
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
