import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string("* Vui lòng nhập").min(
        4,
        "Must be 4 characters or more"
      ),
      fullname: Yup.string()
        .required("* Vui lòng nhập")
        .min(4, "Must be 4 characters or more"),
      email: Yup.string()
        .required("* Vui lòng nhập")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("* Vui lòng nhập")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
    }),
    onSubmit: async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users",
          formik.values
        );
        navigate("/login");
        console.log("Register Success", response.data);
        Swal.fire({
          icon: "success",
          title: "Register Successful",
          text: "Bạn đã đăng ký thành công!",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.log("Register That Bai", error);
      }
    },
  });
  console.log(formik.values);
  const navigate = useNavigate();
  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-center">
            <strong>Create an Account</strong>
          </h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Username"
            />
            {formik.errors.username && (
              <p className="errorMsg">{formik.errors.username}</p>
            )}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              placeholder="Full Name"
            />
            {formik.errors.fullname && (
              <p className="errorMsg">{formik.errors.fullname}</p>
            )}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
            />
            {formik.errors.email && (
              <p className="errorMsg">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
            />
            {formik.errors.password && (
              <p className="errorMsg">{formik.errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I agree to the Terms of Use and Privacy Policy
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button
              className="btn btn-success btn-block btn-info"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <a className="already" href="/">
            Already have an account? Login here.
          </a>
        </form>
      </div>
    </div>
  );
}
