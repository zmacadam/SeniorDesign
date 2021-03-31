import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData, fetchUSByDate, fetchUSByDateRange, fetchStateNoCountiesByDateRange } from '../../api';

import styles from './Chart.module.css';

// Temporary var for state name, should be changed from const to var later
const stateName = 'Texas';
let test = new Date();
let test1 = new Date();
let test2 = new Date();
// const { date } = this.props;
test = '2021-03-20';
test1 = '2020-03-20';
test2 = '2021-03-22';

const Chart = ({ data: { confirmed, recovered, deaths }, country, nbdate }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();
      const nbData = await fetchUSByDate(test);
      const nbDataRange = await fetchUSByDateRange(test1, test2);
      const nbStateData = await fetchStateNoCountiesByDateRange(test, test2, stateName);
      // const nbOneStateData = await fetchOneStateByDateRange(test2, stateName);
      // console.log(initialDailyData);
      // console.log(nbData);
      // console.log(nbData.date);
      // console.log(nbData.stats[0]);
      // console.log(nbData.stats[0].cases);
      // console.log(nbDataRange);
      // console.log(nbStateData);
      /* console.log(nbOneStateData);
      console.log(nbOneStateData[0].data.date);
      console.log(nbOneStateData[0].data.state.stats[0]); */
      // console.log(nbDataRange[0].stats[0].cases);
      // setDailyData(initialDailyData);
      // Uncomment below to Set Daily Data for USTotalByRange:
      setDailyData(nbDataRange);
      // Uncomment below to Set Daily Data for StateByRange:
      // setDailyData(nbStateData);
    };

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const nbDataRange = await fetchUSByDateRange(test1, nbdate);
      // console.log(nbdate);
      // console.log(nbDataRange);

      setDailyData(nbDataRange);
    };

    fetchMyAPI();
  }, [nbdate]);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );
    // Uncomment the block of line charts below to display a range of US Total Data By DateRange
  const lineChart1 = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map(({ stats }) => stats[0].cases),
            label: 'Infected',
            borderColor: '#3333ff',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          legend: { display: false, reverse: true },
          title: { display: true, text: `Confirmed Cases ${country}` },
        }}
      />
    ) : null
  );

  const lineChart2 = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map(({ stats }) => stats[0].deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          legend: { display: false, reverse: true },
          title: { display: true, text: `Confirmed Deaths ${country}` },
        }}
      />
    ) : null
  );

  const lineChart3 = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map(({ stats }) => stats[0].peopleVaccinated),
            label: 'Vaccinated',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Confirmed Vaccinations ${country}` },
        }}
      />
    ) : null
  );
  // Uncomment the block of line charts below to display a range of State Data By Date
  /* const lineChart1 = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map(({ state }) => state.stats[0].cases),
            label: 'Infected',
            borderColor: '#3333ff',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          legend: { display: false, reverse: true },
          title: { display: true, text: `Confirmed Cases ${country}` },
        }}
      />
    ) : null
  );

  const lineChart2 = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map(({ state }) => state.stats[0].deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          legend: { display: false, reverse: true },
          title: { display: true, text: `Confirmed Deaths ${country}` },
        }}
      />
    ) : null
  );

  const lineChart3 = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map(({ state }) => state.stats[0].peopleVaccinated),
            label: 'Vaccinated',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Confirmed Vaccinations ${country}` },
        }}
      />
    ) : null
  ); */

  return (
    <div className={styles.container}>
      {/* {country ? barChart : lineChart} */}
      {country ? lineChart1 : barChart}
      {country ? lineChart2 : barChart}
      {country ? lineChart3 : barChart}
    </div>
  );
};

export default Chart;
