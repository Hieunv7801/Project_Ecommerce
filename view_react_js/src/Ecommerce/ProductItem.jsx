import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "./Home";

export default function ProductItem(props) {
  const { name, price, image, description } = props.prod;
  const { addToCart, renderProduct } = useContext(ProductContext);
  return (
    <div>
      <div class="justify-content-center align-items-center m-2">
        <div class="container d-flex justify-content-center">
          <div class="card">
            <div class="p-info px-3 py-3">
              <div>
                <h5 class="mb-0">{name}</h5>
                <span>HieuNV65</span>
              </div>
              <div class="p-price d-flex flex-row">
                <span style={{ color: "red" }}>$</span>
                <h1 style={{ color: "green" }}>{price}</h1>
              </div>
              <div class="heart">
                <i class="bx bx-heart"></i>
              </div>
            </div>
            <div class="text-center p-image">
              <img
                src={`http://localhost:8080/api/products/get-image/${image}`}
                alt=""
              />
            </div>
            <div class="p-about">
              <p>{description}</p>
            </div>
            <div class="buttons d-flex flex-row gap-3 px-3">
              <NavLink to="/detail">
                <button
                  class="btn btn-danger w-100 btnn"
                  onClick={() => renderProduct(props.prod)}
                >
                  View
                </button>
              </NavLink>
              <button
                class="btn btn-outline-danger w-100 btnn"
                onClick={() => {
                  addToCart(props.prod);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
