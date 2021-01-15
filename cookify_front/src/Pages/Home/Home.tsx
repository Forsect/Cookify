import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navigation } from "../../shared/enums/Navigation";

const Home: React.FC = () => {
  const history = useHistory();
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
