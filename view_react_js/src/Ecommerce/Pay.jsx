import React, { useContext, useEffect, useState } from "react";
import "./Pay.css";
import { ProductContext } from "./Home";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";

export default function Pay() {
  const [users, setUsers] = useState([]);
  const { cart, renderCart } = useContext(ProductContext);

  const [selectPayMentMethod, setSelectPayMentMethod] = useState(null);
  //tổng tiền
  const totalAmount = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  // get thông tin user
  const getUser = async (cartId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/${cartId}/user`
      );
      const user = response.data;
      setUsers((prevUsers) => [...prevUsers, user]);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    // Chỉ lấy thông tin người dùng cho mục đầu tiên trong mảng "cart"
    if (cart.length > 0) {
      getUser(cart[0].id);
    }
  }, [cart]);
  const addOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/order/${users[0].id}/${totalAmount}`
      );
      console.log("Thanh toán thành công", response.data);
      Swal.fire({
        icon: "success",
        title: "Thanh toán thành công!",
        text: "Cảm ơn bạn đã mua hàng!",
      });
      navigate("/");
      renderCart();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Thanh toán thất bại!",
        text: "Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại sau.",
      });
      console.log("Thanh toán thất bại");
    }
  };
  const OnSubmitPay = async () => {
    const dataPayment = {
      amount: totalAmount,
      vnpOrderInfo: "information",
      vnpReturnUrl: "http://localhost:3000/pay",
    };
    const responsePayment = await axios.post(
      "http://localhost:8080/create-payment",
      dataPayment
    );
    const linkPayment = await responsePayment.data;
    window.location.href = linkPayment;
  };

  //check ressult payment
  useEffect(() => {
    const paramResponseCode = new URL(window.location).searchParams.get(
      "vnp_ResponseCode"
    );
    if (
      paramResponseCode &&
      Number(paramResponseCode) === 0 &&
      users.length > 0
    ) {
      addOrder();
    }
  }, [users]);

  const handlePayMent = async () => {
    if (selectPayMentMethod === "cash") {
      addOrder();
    } else if (selectPayMentMethod === "vnpay") {
      OnSubmitPay();
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fas fa-phone"></i> Thanh toán EarPhone
            </h4>
          </li>
        </ol>
      </nav>
      <div className="container">
        <nav aria-label="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fas fa-location-arrow"></i> Địa chỉ nhận hàng
            </h4>{" "}
            <br />
            <div className="d-flex">
              <p className="mr-auto">
                {" "}
                {users.length > 0 && (
                  <p>
                    {users[0].fullname} (+84, {users[0].phone}){" "}
                    {users[0].address}, {users[0].city}
                  </p>
                )}
              </p>
              <button className="btn btn-warning thaydoi">
                <NavLink to="/profile">Thay đổi</NavLink>
              </button>
            </div>
          </li>
        </nav>
      </div>
      <div className="container">
        <nav aria-label="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fab fa-product-hunt"></i> Sản phẩm
            </h4>{" "}
            <br />
            <table className="table">
              <thead>
                <tr className="bg-success">
                  <th>Name</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.map((item) => (
                    <tr>
                      <td>{item.product.name}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/api/products/get-image//${item.product.image}`}
                          alt=""
                          width={60}
                        />
                      </td>
                      <td>
                        <span> {item.quantity} </span>
                      </td>
                      <td>{item.product.price}</td>
                      <td>{item.product.price * item.quantity} $</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </li>
        </nav>
      </div>
      <div className="container">
        <nav aria-label="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <h4>
              <i class="fas fa-window-maximize"></i> Phương thức thanh toán
            </h4>{" "}
            <br />
            <div className="d-flex row">
              <h3 className="mr-auto text-success col-5">
                Chọn phương thức thanh toán:
              </h3>{" "}
              <select
                className="form-control ml-3 col-4 mr-2"
                onChange={(e) => setSelectPayMentMethod(e.target.value)}
              >
                <option value="cash">Thanh toán khi nhận hàng</option>
                <option value="vnpay">Thanh toán VN PAY</option>
              </select>
            </div>
            <hr />
            <div className="d-flex row">
              <div className="col-10">
                <h3>Tổng Tiền: {totalAmount} $</h3>
              </div>
              <button className="btn btn-danger ml-3" onClick={handlePayMent}>
                ĐẶT HÀNG
              </button>
            </div>
          </li>
        </nav>
      </div>
      <Footer />
      <Cart />
    </div>
  );
}
