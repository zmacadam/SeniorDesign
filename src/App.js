import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap } from './components';
// import {Info, Cond, Chart, USMap} from './components';
import range from 'lodash/range';
import { getMonth, getYear } from 'date-fns';
import './App.css';
import styles from './App.module.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'add-days';
import { fetchAllStatesByDate, fetchData, fetchUSByDate } from './api';
import SearchPage from './components/SearchBar/SearchPage.js';

const App = () => {
  const [data, setData] = useState(null);
  const [statedata, setMapData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let test = new Date();
  const today = new Date();
  let yesterday = new Date(today);
  // startDate.setDate(today.getDate() - 2);
  // startDate.setDate(today.getDate() - 1)
  const dd = String(test.getDate() - 3).padStart(2, '0');
  const mm = String(test.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = test.getFullYear();
  test = `${yyyy}-${mm}-${22}`;
  yesterday = `${yyyy}-${mm}-${dd}`;
  // console.log(today);
  //    startDate.setDate(today);
  //    let ds = 'cases';
  // disable future dates

  const [cond, setCond] = useState(null);

  useEffect(() => {
    let datas; let data3;
    const condDefault = 'cases';
    async function updatedata() {
      //            datas = await fetchData();
      console.log(`@@${yesterday}`);
      datas = await fetchUSByDate(test);
      // console.log(datas);
      // console.log(datas.stats[0].cases);
      data3 = await fetchAllStatesByDate(test);
      setData((data) => datas.stats[0]);
      setMapData((statedata) => data3);
      setCond((cond) => condDefault);

      // console.log(data);
    }
    updatedata();
  }, []);

  // console.log(data);

  return (
    <div className={styles.container}>
      {data && <Info data={data} />}
      <p> Data is up to date: {moment(yesterday).format('YYYY-MM-DD')}, choose on any date  before the data ready first to see the data</p>
      {/* <p> Current date is: {moment(startDate)}</p> */}
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        maxDate={addDays(new Date(), -2)}
      />
      <br />
      <SearchPage/>
      <br />
      <div>
        <button className={styles.button} onClick={() => setCond('cases')}> Cases </button>
        <button className={styles.button} onClick={() => setCond('newcases')}> New Cases </button>
        <button className={styles.button} onClick={() => setCond('deaths')}> Deaths </button>
        <button className={styles.button} onClick={() => setCond('vaccinations')}> Vaccinations </button>
        <button className={styles.button} onClick={() => setCond('hospitalizations')}> Hospitalizations </button>
      </div>
      <br />
      <div className={styles.maps}>
        {data && statedata && cond && (
          <svg width="960" height="600">
            <USMap dates={moment(startDate).format('YYYY-MM-DD')} statedatas={statedata} conds={cond} />
            {/* <USMap date={test} statedata={statedata} cond={cond}/> */}
          </svg>
        )}
      </div>
      {data && <Chart nbdate={moment(startDate).format('YYYY-MM-DD')} data={data} country="US" />}
    </div>
  );
};

export default App;
