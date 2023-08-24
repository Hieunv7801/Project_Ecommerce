import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
export default function Detail(props) {
  const { selected, addToCart } = useContext(ProductContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    // Lấy giá trị số lượng từ input
    let value = parseInt(e.target.value);
    // Nếu giá trị là số âm hoặc bằng 0, đặt giá trị mặc định là 1
    value = Math.max(value, 1);
    setQuantity(value);
  };

  return (
    <div>
      <Header />
      <div className="justify-content-center">
        <div className="col-md-7 site-section-heading text-center pt-4">
          <h2>Detail Products</h2>
        </div>
      </div>
      <div class="container py-4 my-4 mx-auto">
        <div class="header">
          <div class="row r1">
            <div class="col-md-9 abc">
              <h1>{selected.name}</h1>
            </div>
            <div class="col-md-3 text-right pqr">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>
            <p class="text-right para">Based on 250 Review</p>
          </div>
        </div>
        <div class="container-body mt-4">
          <div class="row r3">
            <div class="col-md-5 p-0 klo">
              <ul>
                <li>100% Quality</li>
                <li>Free Shipping</li>
                <li>Easy Returns</li>
                <li>12 Months Warranty</li>
                <li>{selected.description}</li>
                <li>
                  Quantity :{" "}
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                  />
                </li>
                <li>Price : {selected.price}</li>
              </ul>
            </div>
            <div class="col-md-5">
              <img
                src={`http://localhost:8080/api/products/get-image/${selected.image}`}
                alt=""
                srcset=""
                width={400}
              />
            </div>
          </div>
        </div>
        <div class="footer d-flex flex-column mt-5">
          <div class="row r4">
            <div class="col-md-2 myt ">
              <button
                type="button"
                class="btn btn-outline-warning"
                onClick={() => addToCart(selected, quantity)}
              >
                ADD TO CART
              </button>
            </div>
            <div class="col-md-2 myt ">
              <NavLink to="/">
                <button type="button" class="btn btn-outline-warning">
                  <i class="fas fa-undo-alt"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Cart />
    </div>
  );
}
