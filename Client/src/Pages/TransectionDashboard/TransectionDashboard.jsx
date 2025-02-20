import React, { useState, useEffect } from "react";
import "./TransectionDashboard.css";
import { toast } from "react-toastify";

const TransectionDashboard = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [dataLength, setDataLength] = useState(null);
  const [query, setQuery] = useState({
    search: "",
    page: 1,
    per_page: 10,
  });
  const [chartData, setChartData] = useState([]);
  const [date, setDate] = useState({
    year: "2022",
    month: "March",
  });

  const [soldItem, setSoldItem] = useState(0);
  const [notSoldItem, setNotSoldItem] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  useEffect(() => {
    let soldCount = 0;
    let notSoldCount = 0;
    let total = 0;

    chartData.forEach((singleItem) => {
      if (singleItem.sold) {
        soldCount++;
      } else {
        notSoldCount++;
      }
      total += Number(singleItem.price) || 0;
    });

    setSoldItem(soldCount);
    setNotSoldItem(notSoldCount);
    setTotalSale(total);
  }, [chartData]);

  const fetchAllData = async () => {
    try {
      const queryParams = new URLSearchParams(query).toString();
      const response = await fetch(
        `http://localhost:11007/api/v1/seed-data/get-all?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setFetchedData(data.data);
      setDataLength(data.dataLength);
      toast.success("Data fetched successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const selectedMonthData = async () => {
    try {
      const queryParams = new URLSearchParams(date).toString();
      const response = await fetch(
        `http://localhost:11007/api/v1/seed-data/monthly-data?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setChartData(data.data);
      toast.success("Data fetched successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [query]);

  useEffect(() => {
    selectedMonthData();
  }, [date]);

  return (
    <div className="transection-dashboard">
      <div className="top">
        <select
          value={date.year}
          onChange={(e) => setDate({ ...date, year: e.target.value })}
        >
          <option value="">Select year</option>
          {[2021, 2022, 2023, 2024].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={date.month}
          onChange={(e) => setDate({ ...date, month: e.target.value })}
        >
          <option>Select Option</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by title, description, or price"
          value={query.search}
          onChange={(e) => setQuery({ ...query, search: e.target.value })}
        />
      </div>

      <div className="bottom">
        <table border="1" colSpan="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.length > 0 ? (
              fetchedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.sold ? "Yes" : "No"}</td>
                  <td>
                    <img src={item.image} alt={item.title} width="50" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="page-details">
          <div>Page No: {query.page}</div>
          <div>
            <button
              onClick={() =>
                setQuery((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={query.page <= 1}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setQuery((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={Math.ceil(dataLength / 10) === query.page}
            >
              Next
            </button>
          </div>
          <div>Per Page: {Math.ceil(dataLength / 10)}</div>
        </div>
      </div>
      <div className="box">
        <h2>Selected Date : {date.month + " " + date.year}</h2>
        <div>Sold item: {soldItem}</div>
        <div>Not sold item: {notSoldItem}</div>
        <div>Total price: {totalSale}</div>
      </div>
    </div>
  );
};

export default TransectionDashboard;
