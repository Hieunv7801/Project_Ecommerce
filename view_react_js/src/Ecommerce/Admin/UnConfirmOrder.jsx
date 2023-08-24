import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function UnConfirmOrder() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/order");
      console.log("get order success", response.data);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const confirmOrder = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Xác nhận đơn hàng?",
        text: "Bạn có chắc muốn xác nhận đơn hàng này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          `http://localhost:8080/api/order/${id}`,
          { isconfirm: true }
        );
        console.log("Set confirm success", response.data);
        fetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row">
      <div className="col-12 mx-auto">
        <table className="table bg-white rounded border">
          <thead className="text-center">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Khách Hàng</th>
              <th scope="col">Ngày Mua Hàng</th>
              <th scope="col">Tổng Tiền</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {order.map(
              (item) =>
                item.isconfirm === false && (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.user.fullname}</td>
                    <td>{item.orderDate}</td>
                    <td>{item.totalAmount} $</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => confirmOrder(item.id)}
                      >
                        <i class="fas fa-arrow-right"></i> Xác nhận đơn
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
