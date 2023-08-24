import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ProductContext } from "./Home";
import Cart from "./Cart";

export default function DetaiOrder() {
  const { orderDetail } = useContext(ProductContext);
  return (
    <div className="">
      <Header />
      <div class="modal-body container content_nav">
        <div className="container">
          <nav aria-label="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
              <h4>
                <i class="fab fa-product-hunt"></i> Chi tiết đơn hàng
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
                  {orderDetail &&
                    orderDetail.map((item) => (
                      <tr>
                        <td>{item.products.name}</td>
                        <td>
                          <img
                            src={`http://localhost:8080/api/products/get-image//${item.products.image}`}
                            alt=""
                            width={60}
                          />
                        </td>
                        <td>
                          <span> {item.quantity} </span>
                        </td>
                        <td>{item.products.price}</td>
                        <td>{item.products.price * item.quantity} $</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </li>
          </nav>
        </div>
      </div>
      <Cart />
      <Footer />
    </div>
  );
}
