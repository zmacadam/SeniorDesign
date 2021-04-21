import React from "react";
import "../App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CleanHand from "../img/bob_covid_large.jpg";
import Distance from "../img/social-distancing-together-6-feet.webp";
import Doctor from "../img/cartoon-character-with-doctors-nurses-medical-staff-holding-poster-requesting-people-avoid-coronavirus-covid-19-spreading-by-staying-home-coronavirus-disease-awareness.jpg";
import Spread from "../img/spread.png";
import Touch from "../img/touch-face-hand-stones-that-point-face-eyes-nose-mouth-channels-carry-corona-virus-into-body_68708-906.jpg";
import Cover from "../img/Coronavirus-EN-2.png";
import Stayhome from "../img/download.jfif";
import Call from "../img/original.jfif";
const Symptom = () => {
  return (
    <div style={{ margin: "20px" }}>
      <Tabs>
        <TabList>
          <Tab>tab1</Tab>
          <Tab>tab2</Tab>
        </TabList>

        <TabPanel>
          <p>
            code here
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            code here
          </p>
        </TabPanel>

      </Tabs>
    </div>
  );
}

export default Symptom;
