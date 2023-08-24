import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ProductContext } from "./Home";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart(props) {
  const navigate = useNavigate();
  const { cart, deleteCart, handleQuantity, handleQuantityTru } =
    useContext(ProductContext);
  console.log("cart", cart);
  const notify = () => {
    toast("❌ Đã xóa sản phẩm !");
  };
  const totalAmount = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg bg-dark">
          <div class="modal-content bg-muted">
            <div class="modal-header bg-success">
              <h5 class="modal-title" id="exampleModalLabel">
                Giỏ hàng
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product.id}</td>
                        <td>{item.product.name}</td>
                        <td>
                          <img
                            src={`http://localhost:8080/api/products/get-image/${item.product.image}`}
                            alt=""
                            width={60}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              if (item.quantity === 1) {
                                Swal.fire({
                                  title: "Bạn có muốn xóa sản phẩm không?",
                                  icon: "question",
                                  showCancelButton: true,
                                  confirmButtonText: "Có",
                                  cancelButtonText: "Không",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    deleteCart(item.id);
                                  }
                                });
                              } else {
                                handleQuantityTru(item.product);
                              }
                            }}
                          >
                            -
                          </button>
                          <span> {item.quantity} </span>
                          <button
                            className="btn btn-info"
                            onClick={() => handleQuantity(item.product)}
                          >
                            +
                          </button>
                        </td>
                        <td>{item.product.price}</td>
                        <td>{item.product.price * item.quantity} $</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteCart(item.id);
                              notify();
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <div>
                <b>
                  Tổng tiền: <span className="text-success">{totalAmount}</span>{" "}
                  $
                </b>
              </div>
            </div>
            {cart.length > 0 && (
              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                onClick={() => {
                  navigate("/pay");
                }}
              >
                Thanh Toán
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
