import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData, fetchUSByDate, fetchUSByDateRange } from '../../api';

import styles from './Chart.module.css';

let test = new Date();
let test1 = new Date();
let test2 = new Date();
test = '2021-03-22';
test1 = '2020-03-20';
test2 = '2021-03-22';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();
      const nbData = await fetchUSByDate(test);
      const nbDataRange = await fetchUSByDateRange(test1, test2);

      console.log(initialDailyData);
      console.log(nbData);
      console.log(nbData.date);
      console.log(nbData.stats[0]);
      console.log(nbData.stats[0].cases);
      console.log(nbDataRange);
      // console.log(nbDataRange[0].stats[0].cases);
      // setDailyData(initialDailyData);
      setDailyData(nbDataRange);
    };

    fetchMyAPI();
  }, []);

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
    // eslint-disable-next-line no-lone-blocks
  { /* const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }, {
            data: dailyData.map((data) => data.recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  ); */ }

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
