import React, { useState, useEffect } from "react";
import "./TransectionDashboard.css";
import { toast } from "react-toastify";

const TransectionDashboard = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [query, setQuery] = useState({
    month: "",
    search: "",
    page: 1,
    per_page: 10,
  });

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
      toast.success("Data fetched successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [query]);

  return (
    <div className="transection-dashboard">
      <div className="top">
        <select
          value={query.month}
          onChange={(e) => setQuery({ ...query, month: e.target.value })}
        >
            <option>Select Option</option>
          {[
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
            "January",
            "February",
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
        <table border="1">
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
              disabled={query.page <= 0}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setQuery((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={query.per_page === query.page}
            >
              Next
            </button>
          </div>
          <div>Per Page: {query.per_page}</div>
        </div>
      </div>
    </div>
  );
};

export default TransectionDashboard;
