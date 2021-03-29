import React from 'react';
import {Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';


let cond = 'cases';



const Info = ({ data: { confirmed, recovered, deaths, vaccinations, hospitalizations, lastUpdate } }) => {
  if (!confirmed) {
    return 'Loading...';
  }

  // let whichButton = null;
//     let props = 'cases';


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
          buttFunction= { (cond) => buttClickInfected() }
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          cardSubtitle="Total number of recoveries"
          buttonTitle="Recovered"
          buttFunction= { (cond) => buttClickRecovered() }
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          cardSubtitle="Total number of deaths"
          buttonTitle="Deaths"
          buttFunction= { (cond) => buttClickDeaths() }
        />
        <CardComponent
            className={styles.vaccinated}
            cardTitle="Vaccinations"
//             value={vaccinated.value}
            value={0}
            cardSubtitle="Total number of vaccinations"
            buttonTitle="Vaccinations"
            buttFunction= {(cond) => buttClickVacc()}
        />
        <CardComponent
            className={styles.hospitalized}
            cardTitle="Hospitalizations"
//             value={hospitalized.value}
            value={0}
            cardSubtitle="Total number of hospitalizations"
            buttonTitle="Hospitalizations"
            buttFunction= {(cond) => buttClickHosp()}
        />

      </Grid>
    </div>
  );

};

// const Cond = function() {
// //     console.log(cond);
//     return cond;
// };
const Cond = getCond();

// console.log(Cond.cond);
function getCond() {
    return cond
}





function buttClickInfected() {
//     document.getElementById("states").style.fill = 'blue';
//     console.log("cases");
     let cond = 'cases';
    console.log(cond);
//     let stateColor = 'blue';

    return(cond)
}
function buttClickRecovered() {
//     document.getElementById("states").style.fill = 'green';
//     whichButton = 'recovered';
    let cond = 'recovered';
    return (cond);
}
function buttClickDeaths() {
//     document.getElementById("states").style.fill = 'red';
//     whichButton = 'deaths';
    let cond = 'deaths';
    return (cond);

}
function buttClickVacc() {
//     document.getElementById("states").style.fill = 'purple';
//     whichButton = 'vaccinated';
    let cond = 'vaccinations';
    return (cond);
}
function buttClickHosp() {
//     document.getElementById("states").style.fill = 'pink';
//     whichButton = 'hospitalized';
    let cond = 'hospitalizations';
    return (cond);
}

// export default Info;
export {
    Info,
    Cond
};
