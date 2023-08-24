import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductContext } from "./Home";
export default function Profile() {
  const [user, setUser] = useState({});
  const [order, setOrder] = useState([]);
  const { getOrderDetail } = useContext(ProductContext);
  useEffect(() => {
    formik.setValues({
      username: user.username || "",
      fullname: user.fullname || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      password: user.password || "",
    });
  }, [user]);
  const formik = useFormik({
    initialValues: {
      username: user.username || "",
      fullname: user.fullname || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      password: user.password || "",
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
      phone: Yup.string()
        .required("* Vui lòng nhập")
        .matches(
          /^((\+84)|0)(3[2-9]|5[689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
          "The phone number is not in the correct format"
        ),
      address: Yup.string().required("* Vui lòng nhập"),
    }),
    onSubmit: async () => {
      const updatedUser = {
        ...user,
        username: formik.values.username,
        fullname: formik.values.fullname,
        email: formik.values.email,
        phone: formik.values.phone,
        address: formik.values.address,
        password: formik.values.password,
      };
      axios
        .put(`http://localhost:8080/api/users`, updatedUser)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Update Profile Successful",
            text: "Bạn đã update thành công !",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          setUser(response.data);
          console.log("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    },
  });
  useEffect(() => {
    getUserProfile(localStorage.getItem("key"));
    getOrder();
  }, []);
  const getUserProfile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`);
      console.log("Get user success", response.data);
      setUser(response.data);
    } catch (error) {
      console.log("Get user failed");
    }
  };
  const getOrder = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/order");
      console.log("get order success", response.data);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOrder = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        // Nếu người dùng nhấn OK (Xác nhận xóa), thực hiện xóa
        await axios.delete(`http://localhost:8080/api/order/${id}`);
        getOrder();
        Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted.",
          icon: "success",
        });
      } else {
        // Nếu người dùng nhấn Cancel, không làm gì cả
        Swal.fire("Cancelled", "The product is safe :)", "info");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete the product.",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="content_nav">
        <nav className="mt-3 container">
          <div
            class="nav nav-tabs"
            id="nav-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              class="nav-link active bg-success"
              id="nav-home-tab"
              data-toggle="tab"
              data-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              <h5 className="text-warning">Profile</h5>
            </button>
            <button
              class="nav-link"
              id="nav-profile-tab"
              data-toggle="tab"
              data-target="#nav-donhang"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Đơn hàng
            </button>
            <button
              class="nav-link"
              id="nav-profile-tab"
              data-toggle="tab"
              data-target="#nav-confirm"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Đơn hàng đã xác nhận
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div className="container rounded bg-white mt-5 profile">
              <div className="row">
                <div className="col-md-4 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img
                      className="rounded-circle mt-5"
                      src="https://tse1.mm.bing.net/th?id=OIP.SEb16b9s2aJkSStpWzwTbgHaHa&pid=Api&P=0&h=180"
                      width="90"
                      alt="Profile Avatar"
                    />
                    <span className="font-weight-bold">{user.username}</span>
                    <span className="text-black-50">{user.email}</span>
                    <span>ID: {user.id}</span>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex flex-row align-items-center back">
                        <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                        <h6>Back to home</h6>
                      </div>
                      <h6 className="text-right">Edit Profile</h6>
                    </div>
                    <form onClick={formik.handleSubmit}>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label>UserName</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            {...formik.getFieldProps("username")} 
                          />
                          {formik.errors.username && (
                            <p className="errorMsg">{formik.errors.username}</p>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label>FullName</label>
                          <input
                            type="text"
                            className="form-control"
                            name="fullname"
                            placeholder="HieuNV65"
                            {...formik.getFieldProps("fullname")}
                          />
                          {formik.errors.fullname && (
                            <p className="errorMsg">{formik.errors.fullname}</p>
                          )}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            {...formik.getFieldProps("email")}
                          />
                          {formik.errors.email && (
                            <p className="errorMsg">{formik.errors.email}</p>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label>Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            {...formik.getFieldProps("phone")}
                            placeholder="Phone number"
                          />
                          {formik.errors.phone && (
                            <p className="errorMsg">{formik.errors.phone}</p>
                          )}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="address"
                            name="address"
                            {...formik.getFieldProps("address")}
                          />
                          {formik.errors.address && (
                            <p className="errorMsg">{formik.errors.address}</p>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label>Password</label>
                          <input
                            type="text"
                            className="form-control"
                            name="password"
                            {...formik.getFieldProps("password")}
                            placeholder="Country"
                          />
                          {formik.errors.password && (
                            <p className="errorMsg">{formik.errors.password}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-5 text-right">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          Save Profile
                        </button>
                        <button
                          className="btn btn-warning profile-button ml-3"
                          type="button"
                        >
                          <NavLink to="/">
                            {" "}
                            <i class="fas fa-backward"></i> Back
                          </NavLink>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade order-pay"
            id="nav-donhang"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="modal-body container">
              <table className="table bg-white rounded border">
                <thead className="text-center">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Ngày Mua Hàng</th>
                    <th scope="col">Tổng Tiền</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {order.map(
                    (item) =>
                      item.isconfirm === false && (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.orderDate}</td>
                          <td>{item.totalAmount} $</td>
                          <td>
                            <NavLink to="/orderdetail">
                              <button
                                className="btn btn-warning mr-2"
                                onClick={() => getOrderDetail(item.id)}
                              >
                                <i class="fas fa-arrow-right"></i> CHI TIẾT ĐƠN
                                HÀNG
                              </button>
                            </NavLink>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteOrder(item.id)}
                            >
                              <i class="fas fa-trash-alt"></i> HỦY ĐƠN HÀNG
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-confirm"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div class="modal-body container">
              <div className="container">
                <nav aria-label="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    <h4>
                      <i class="fab fa-product-hunt"></i> ĐƠN HÀNG ĐÃ XÁC NHẬN
                    </h4>{" "}
                    <br />
                    <table className="table">
                      <thead>
                        <tr className="bg-success text-center">
                          <th scope="col">ID</th>
                          <th scope="col">Ngày Mua Hàng</th>
                          <th scope="col">Tổng Tiền</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {order.map(
                          (item) =>
                            item.isconfirm === true && (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.orderDate}</td>
                                <td>{item.totalAmount} $</td>
                                <td>
                                  <NavLink to="/orderdetail">
                                    <button
                                      className="btn btn-warning mr-2"
                                      onClick={() => getOrderDetail(item.id)}
                                    >
                                      <i class="fas fa-arrow-right"></i> CHI
                                      TIẾT ĐƠN HÀNG
                                    </button>
                                  </NavLink>
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </li>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart />
      <Footer />
    </div>
  );
}
