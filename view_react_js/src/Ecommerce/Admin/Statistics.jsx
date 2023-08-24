import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import DoanhThu from "./DoanhThu";

export default function Statistics() {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topSellingUsers, setTopSellingUsers] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/statistics/top-selling-products")
      .then((response) => {
        setTopSellingProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top selling products:", error);
      });
    axios
      .get("http://localhost:8080/api/statistics/top-user")
      .then((response) => {
        setTopSellingUsers(response.data);
        console.log("top user: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching top selling products:", error);
      });
  }, []);

  useEffect(() => {
    if (topSellingProducts.length > 0) {
      const labels = topSellingProducts.map((product) => product.name);
      const data = topSellingProducts.map((product) => product.price);
      const ctx = document.getElementById("myChart").getContext("2d");
      if (chartInstance) {
        chartInstance.destroy();
      }
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Price",
              data: data,
              backgroundColor: ["#cc35cc"],
              borderColor: ["#6ac04b", "#e70ca1"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Top Selling Products Chart",
            },
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [topSellingProducts]);

  useEffect(() => {
    if (topSellingUsers.length > 0) {
      const labels = topSellingUsers.map((item) => item[0].username);
      const data = topSellingUsers.map((item) => item[1]);
      console.log(topSellingUsers);
      console.log("lables:", labels);
      console.log("data:", data);
      const ctx = document.getElementById("myChartUser").getContext("2d");
      if (chartInstance) {
        chartInstance.destroy();
      }
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "User",
              data: data,
              backgroundColor: ["#ee8585", "#303ebd", "#75bb3c"],
              borderColor: ["rgba(75, 192, 192, 1)", "#78ff63"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Top Selling Users Chart",
            },
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [topSellingUsers]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <canvas id="myChart" width="400" height="400" />
        </div>
        <div className="col-6">
          <canvas id="myChartUser" width="400" height="400" />
        </div>
      </div>
      <div className="row mt-5">
        <DoanhThu />
      </div>
    </>
  );
}
