import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

function DoanhThu() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedMonth]);

  const fetchData = async () => {
    try {
      if (selectedYear && selectedMonth) {
        const response = await axios.get(
          `http://localhost:8080/api/statistics/total-amount/${selectedYear}/${selectedMonth}`
        );
        setData(response.data);
      } else {
        setData([]); // Không có dữ liệu, đặt data thành mảng rỗng
      }
    } catch (error) {
      setData([]); // Không có dữ liệu, đặt data thành mảng rỗng
    }
  };

  const chartData = {
    labels: Array.from(
      { length: new Date(selectedYear, selectedMonth, 0).getDate() },
      (_, i) => i + 1
    ),
    datasets: [
      {
        label: "Doanh Thu",
        data: Array.from(
          { length: new Date(selectedYear, selectedMonth, 0).getDate() },
          (_, i) => data.find((item) => item.day === i + 1)?.totalAmount || 0
        ),
        backgroundColor: "#f51206",
      },
    ],
  };

  return (
    <div className="App">
      <div className="input-container">
        <label className="input-label">Year:</label>
        <input
          className="input-field ml-3"
          type="number"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <label className="input-label">Month:</label>
        <input
          className="input-field"
          type="number"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
          }}
        />
      </div>
      <div className="chart-container">
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default DoanhThu;
