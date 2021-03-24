import React from 'react';
import {Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return 'Loading...';
  }

  return (
    <div className={styles.container}>
        {/*<Typography gutterBottom variant="h4" component="h2">Covid Tracker</Typography>*/}
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          cardSubtitle="Total number of active cases"
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          cardSubtitle="Total number of recoveries"
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          cardSubtitle="Total number of deaths"
        />
      </Grid>
    </div>
  );
};

export default Info;
