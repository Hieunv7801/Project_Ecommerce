import React from "react";
import "./Login.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login_Admin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("*Vui lòng nhập username"),
      password: Yup.string().required("* Vui lòng nhập password"),
    }),
    onSubmit: async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/login_admin",
          formik.values
        );
        console.log(response.data);
        localStorage.setItem("key_admin", response.data);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Bạn đã đăng nhập thành công !",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/user-manager");
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
  return (
    <div>
      <div className="page">
        <div className="row riu">
          <div className="col-sm-8 text-center signin">
            <form className="form_login" onSubmit={formik.handleSubmit}>
              <p className="h4 mb-4 text-center signintext top">
                <strong>Sign Admin</strong>
              </p>
              <p className="text-center signintext">
                ENTER YOUR CREDENTIALS AND PRESS THE SIGN IN BUTTON
              </p>
              <input
                className="form-control mb-4"
                placeholder="Username"
                style={{ fontFamily: "Arial, FontAwesome" }}
                value={formik.values.username}
                name="username"
                onChange={formik.handleChange}
              />
              {formik.errors.username && (
                <h1 className="errorMsg mgerror">{formik.errors.username}</h1>
              )}
              <input
                type="password"
                className="form-control mb-4"
                placeholder="Password"
                name="password"
                style={{ fontFamily: "Arial, FontAwesome" }}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && (
                <h1 className="errorMsg mgerror">{formik.errors.password}</h1>
              )}
              <button
                className="btn btn-info btn-block LoginBtn btu"
                type="submit"
              >
                SIGN IN
              </button>
            </form>
          </div>
          <div className="col-sm-4 signup text-center">
            <h2 className="HelloFriend">Hello, Friend!</h2>
            <h4 className="SignupText">You may be deceived</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
