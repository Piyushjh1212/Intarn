import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container" style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}} >
        <Link to="/transection-dashboard">
          <button style={{padding: '7px 20px', cursor: 'pointer'}}>Transection Dashboard</button>{" "}
        </Link>
        <Link to="/dashboard">
          <button style={{padding: '8px 30px', border: '1px solid rgb(0, 109, 164)', background: 'rgb(0, 109, 164)', color: '#fff', cursor: 'pointer'}}>Styled Dashboard</button>{" "}
        </Link>
      </div>
    </>
  );
};

export default Home;
