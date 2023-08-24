import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Order() {
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
  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/order/${id}`
      );
      console.log("Success", response.data);
      fetch();
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
            </tr>
          </thead>
          <tbody className="text-center">
            {order.map(
              (item) =>
                item.isconfirm === true && (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.user.fullname}</td>
                    <td>{item.orderDate}</td>
                    <td>{item.totalAmount} $</td>
                    {/* <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => deleteOrder(item.id)}
                      >
                        <i class="fas fa-arrow-right"></i> Xác nhận đơn
                      </button>
                    </td> */}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
