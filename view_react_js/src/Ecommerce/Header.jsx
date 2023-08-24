import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "./Home";

export default function Header() {
  const isLoggedIn = localStorage.getItem("key");
  const { cart } = useContext(ProductContext);
  return (
    <div>
      <nav class="navbar bg-dark">
        <div class="container">
          <div class="logo">
            <i class="fas fa-headphones-alt"></i>.earphone
          </div>
          <ul class="menu">
            <li>
              <NavLink to="/" class="menu-btn">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" class="menu-btn">
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" class="menu-btn">
                Contact
              </NavLink>
            </li>
            <li>
              <button
                className="btn btn-success ml-4 mb-2"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i class="fas fa-cart-plus"></i> ({cart.length})
              </button>
            </li>
          </ul>
        </div>
        <div class="dropdown mr-5 dropdown-left">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user-circle"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {isLoggedIn ? (
              // Hiển thị nút Đăng xuất khi đã đăng nhập
              <div>
                <a className="dropdown-item" href="/">
                  <button className="btn btn-warning">
                    <NavLink to="/profile">
                      <i className="fas fa-user-circle"></i> Profile
                    </NavLink>
                  </button>
                </a>

                <a className="dropdown-item" href="/">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      localStorage.removeItem("key");
                      window.location.reload(); // Tải lại trang sau khi đăng xuất
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Log out
                  </button>
                </a>
              </div>
            ) : (
              // Hiển thị nút Đăng nhập khi chưa đăng nhập
              <a className="dropdown-item" href="/">
                <button className="btn btn-success">
                  <NavLink to="/login">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </NavLink>
                </button>
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
