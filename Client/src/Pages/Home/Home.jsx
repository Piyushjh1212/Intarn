import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container" >
        <Link to="/transection-dashboard">
          <button>Transection Dashboard</button>{" "}
        </Link>
        <Link to="/dashboard">
          <button>Styled Dashboard</button>{" "}
        </Link>
      </div>
    </>
  );
};

export default Home;
