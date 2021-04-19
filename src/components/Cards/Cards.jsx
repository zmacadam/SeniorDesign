import React from 'react';
import {Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';


// let cond = 'cases';
// let cond = null;



// const Info = ({ data: { confirmed, recovered, deaths, vaccinations, hospitalizations, lastUpdate } }) => {
const Info = ({data: {cases, deaths, hospitalized,newCases, peopleVaccinated}})=> {
  if (!cases) {
    //console.log('load');
    return 'Loading...';
  }

  // let whichButton = null;
//     let props = 'cases';


  return (

    <div>
        {/*<Typography gutterBottom variant="h4" component="h2">Covid Tracker</Typography>*/}
      <Grid container spacing={1} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Cases"
          value={cases}
          cardSubtitle="Total number of active cases"
//           buttonTitle="Infected"
//           buttFunction= { (cond) => buttClickInfected() }
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="New Cases"
          value={newCases}
          cardSubtitle="Total number of new cases"
//           buttonTitle="Recovered"
//           buttFunction= { (cond) => buttClickRecovered() }
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths}
          cardSubtitle="Total number of deaths"
//           buttonTitle="Deaths"
//           buttFunction= { (cond) => buttClickDeaths() }
        />
        <CardComponent
            className={styles.vaccinated}
            cardTitle="Vaccinations"
            value={peopleVaccinated}
//             value={0}
            cardSubtitle="Total number of vaccinations"
//             buttonTitle="Vaccinations"
//             buttFunction= {(cond) => buttClickVacc()}
        />
        <CardComponent
            className={styles.hospitalized}
            cardTitle="Hospitalizations"
            value={hospitalized}
//             value={0}
            cardSubtitle="Total number of hospitalizations"
//             buttonTitle="Hospitalizations"
//             buttFunction= {(cond) => buttClickHosp()}
        />
      </Grid>
    </div>
  );

};

// const Cond = function() {
// //     //console.log(cond);
//     return cond;
// };

// const Cond = getCond();
//
// // //console.log(Cond.cond);
// function getCond() {
//     return cond
// }
// function setCond(cond){
//     Cond = cond;
// }
//
//
// function buttClickInfected() {
// //     document.getElementById("states").style.fill = 'blue';
// //     //console.log("cases");
//     cond = 'cases';
//     setCond(cond);
//     //console.log(cond);
// //     let stateColor = 'blue';
//
//     return(cond)
// }
// function buttClickRecovered() {
// //     document.getElementById("states").style.fill = 'green';
// //     whichButton = 'recovered';
//     cond = 'recovered';
//     setCond(cond);
//     return (cond);
// }
// function buttClickDeaths() {
// //     document.getElementById("states").style.fill = 'red';
// //     whichButton = 'deaths';
//     cond = 'deaths';
//     setCond(cond);
//     return (cond);
//
// }
// function buttClickVacc() {
// //     document.getElementById("states").style.fill = 'purple';
// //     whichButton = 'vaccinated';
//     cond = 'vaccinations';
//     setCond(cond);
//     return (cond);
// }
// function buttClickHosp() {
// //     document.getElementById("states").style.fill = 'pink';
// //     whichButton = 'hospitalized';
//     cond = 'hospitalizations';
//     setCond(cond);
//     return (cond);
// }

export default Info;
// export {
//     Info,
//     Cond
// };
