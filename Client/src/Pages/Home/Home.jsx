import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
     return (
        <>
          home
          <Link to='/transection-dashboard'><button>Transection Dashboard</button> </Link>
        </>
     )
}

export default Home;