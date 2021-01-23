import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../shared/enums/Navigation";

const Home: React.FC = () => {
  return (
    <div>
      <Link to={Navigation.Login}>Logowanie</Link>
      <br />
      <br />
      <Link to={Navigation.Register}>Rejestracja</Link>
    </div>
  );
};

export default Home;
