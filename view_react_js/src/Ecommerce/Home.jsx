import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Detail from "./Detail";
import Register from "./Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import HomeAdmin from "./Admin/HomeAdmin";
import Contact from "./Contact";
import axios from "axios";
import View from "./View";
import Profile from "./Profile";
import { toast } from "react-toastify";
import User from "./Admin/User";
import Pay from "./Pay";
import Product from "./Admin/Product";
import Order from "./Admin/Order";
import DetaiOrder from "./DetaiOrder";
import UnConfirmOrder from "./Admin/UnConfirmOrder";
import Login_Admin from "./Admin/Login_Admin";
import Statistics from "./Admin/Statistics";
import DoanhThu from "./Admin/DoanhThu";
export const ProductContext = React.createContext();

export default function Home() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);
  const [product, setProduct] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const navigate = useNavigate();
  const notify = () => {
    toast("🙌 Thêm sản phẩm thành công !");
  };
  useEffect(() => {
    getProduct();
    renderCart();
  }, []);
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProduct(response.data);
      console.log("Get dữ liệu thành công" + response.data);
    } catch (error) {
      console.log("không thể get data");
    }
  };
  const renderProduct = (prod) => {
    setSelected(prod);
  };
  const addToCart = async (prod, quantity = 1) => {
    const isLoggedIn = localStorage.getItem("key");
    if (isLoggedIn) {
      try {
        const response = await axios.post("http://localhost:8080/api/cart", {
          ...prod,
          user: isLoggedIn,
          quantity: quantity,
        });
        notify();
        console.log("Thêm vào giỏ hàng thành công", response.data);
        renderCart();
      } catch (error) {
        console.log("Lôi khi thêm giỏ hàng");
      }
    } else {
      console.log("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
      navigate("/login");
    }
  };
  const renderCart = async () => {
    const isLoggedIn = localStorage.getItem("key");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/${isLoggedIn}/cart`
      );
      console.log("get cart sucess");

      setCart(response.data);
      console.log(cart);
    } catch (error) {
      console.log("get cart that bai");
    }
  };
  const deleteCart = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/cart/${id}`
      );
      renderCart();
      console.log("xóa cart thành công", response.data);
    } catch (error) {
      console.log("xóa không thành công");
    }
  };
  const handleQuantity = async (prod) => {
    const isLoggedIn = localStorage.getItem("key");

    try {
      const response = await axios.post("http://localhost:8080/api/cart", {
        ...prod,
        user: isLoggedIn,
        quantity: 1,
      });
      renderCart();
      console.log("quantity success", response.data);
    } catch (error) {
      console.log("error quantity");
    }
  };
  const handleQuantityTru = async (prod) => {
    const isLoggedIn = localStorage.getItem("key");
    try {
      const response = await axios.post("http://localhost:8080/api/cart", {
        ...prod,
        user: isLoggedIn,
        quantity: -1,
      });
      renderCart();
      console.log("quantity success", response.data);
    } catch (error) {
      console.log("error quantity");
    }
  };
  const getOrderDetail = async (id) => {
    await axios
      .get(`http://localhost:8080/api/orderDetail/${id}`)
      .then((resp) => {
        setOrderDetail(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const contextValues = {
    cart,
    selected,
    product,
    addToCart,
    handleQuantity,
    renderProduct,
    deleteCart,
    handleQuantityTru,
    renderCart,
    orderDetail,
    getOrderDetail,
  };

  return (
    <ProductContext.Provider value={contextValues}>
      <div>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/orderdetail" element={<DetaiOrder />} />
          <Route path="/admin" element={<HomeAdmin />}>
            <Route path="user-manager" element={<User />} />
            <Route path="product-manager" element={<Product />} />
            <Route path="order-manager" element={<Order />} />
            <Route path="unconfirm-order" element={<UnConfirmOrder />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="doanhthu" element={<DoanhThu />} />
          </Route>
          <Route path="login_admin" element={<Login_Admin />} />
        </Routes>
      </div>
    </ProductContext.Provider>
  );
}
