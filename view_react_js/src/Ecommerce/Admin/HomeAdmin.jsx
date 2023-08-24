import React from "react";
import "./Addmin.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function HomeAdmin() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("key_admin");

  if (!isLogin) {
    navigate("/login_admin");
    return null;
  }
  return (
    <div>
      <div id="sidebar">
        <h3>
          <i class="fas fa-phone"></i> EarPhone
        </h3>

        <ul>
          <li>
            <NavLink to="/admin/user-manager">
              <i class="fas fa-users"></i> User
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/product-manager">
              <i class="fas fa-yen-sign"></i> Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/unconfirm-order">
              <i class="fas fa-sitemap"></i> Unconfirmed Order
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/order-manager">
              <i class="fas fa-sitemap"></i> Confirm Order
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/statistics">
              <i class="fas fa-wave-square"></i> Statistics
            </NavLink>
          </li>
          {isLogin ? (
            <li>
              <button
                className="btn btn-warning"
                onClick={() => {
                  localStorage.removeItem("key_admin");
                  navigate("/login_admin");
                }}
              >
                {" "}
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div id="content">
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
