import React from 'react';
import {Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return 'Loading...';
  }

  // let whichButton = null;

  return (
    <div className={styles.container}>
        {/*<Typography gutterBottom variant="h4" component="h2">Covid Tracker</Typography>*/}
      <Grid container spacing={1} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          cardSubtitle="Total number of active cases"
          buttonTitle="Infected"
          buttFunction= { () => buttClickInfected() }
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          cardSubtitle="Total number of recoveries"
          buttonTitle="Recovered"
          buttFunction= { () => buttClickRecovered() }
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          cardSubtitle="Total number of deaths"
          buttonTitle="Deaths"
          buttFunction= { () => buttClickDeaths() }
        />
        <CardComponent
            className={styles.vaccinated}
            cardTitle="Vaccinations"
//             value={vaccinated.value}
            value={0}
            cardSubtitle="Total number of vaccinations"
            buttonTitle="Vaccinations"
            buttFunction= {() => buttClickVacc()}
        />
        <CardComponent
            className={styles.hospitalized}
            cardTitle="Hospitalizations"
//             value={hospitalized.value}
            value={0}
            cardSubtitle="Total number of hospitalizations"
            buttonTitle="Hospitalizations"
            buttFunction= {() => buttClickHosp()}
        />

      </Grid>
    </div>
  );
};

function buttClickInfected() {
    document.getElementById("states").style.fill = 'blue';
//     whichButton = 'infected';
}
function buttClickRecovered() {
    document.getElementById("states").style.fill = 'green';
//     whichButton = 'recovered';
}
function buttClickDeaths() {
    document.getElementById("states").style.fill = 'red';
//     whichButton = 'deaths';
}
function buttClickVacc() {
    document.getElementById("states").style.fill = 'purple';
//     whichButton = 'vaccinated';
}
function buttClickHosp() {
    document.getElementById("states").style.fill = 'pink';
//     whichButton = 'hospitalized';
}

export default Info;
