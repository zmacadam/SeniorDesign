import React from "react";
import "../App.css";

function About() {
  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <br />
      <h2>About Us</h2>
      <br />
      <br />
      <br />
      <div
        style={{
          padding: "20px",
          backgroundColor: "grey",
          color: "white",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <h4>We are Covid Tracker Team</h4>
        <div style={{ fontSize: "20px" }}>
          Our team aims to support users in the United States by providing accurate and timely information regarding COVID-19. We understand this issue concerns everybody in the US right now, and that’s why our primary goal is to create software that emphasizes user-friendliness and reliability. Information this important needs to be accessible for all, and that knowledge allows us to make wiser decisions. To achieve this, our software features a web dashboard which displays an interactive map of the US, along with supplementary analysis and additional news.
        </div>
        <br />
          <h4>Want to know more about us?</h4>
          <div style={{ fontSize: "20px" }}>
              {" "}
              <a
                  href="http://riogrande.cs.tcu.edu/2021CovidTracker/"
                  target="_blank"
              >
                  Click here
              </a>{" "}
          </div>
        <br />
      </div>
      <br />
    </div>
  );
}

export default About;
