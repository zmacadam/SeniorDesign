import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        <div style={{ fontSize: "30px" }}>Covid Tracker</div>
      </Link>
      <ul className="nav-links">
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px",
          }}
          to="/symptom"
        >
          <li>Symptom</li>
        </Link>
        <Link
          style={{ color: "white", textDecoration: "none", marginTop: "10px" }}
          to="/about"
        >
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
