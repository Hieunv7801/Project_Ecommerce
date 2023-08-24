import axios from "axios";
import React, { useContext } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProductContext } from "./Home";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const { renderCart } = useContext(ProductContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("* Vui lòng nhập username"),
      password: Yup.string().required("*Vui lòng nhập password"),
    }),
    onSubmit: async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/login",
          formik.values
        );
        console.log("Success", response.data);
        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem("key", response.data);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Bạn đã đăng nhập thành công !",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
            renderCart();
          }
        });
      } catch (error) {
        console.log("đăng nhập thất bại");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    },
  });
  console.log(formik.values);
  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-center">
            <strong>Welcome back!</strong>
          </h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              value={formik.values.username}
              name="username"
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
                  Remember me
                </label>
              </div>
              <div>
                <a href="/" className="text-info">
                  Forgot Password
                </a>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button
              className="btn btn-success btn-block btn-info"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="form-group">
            <NavLink to="/register" className="btn btn-success  btn-block">
              Register
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
