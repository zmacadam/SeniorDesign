import React, {useEffect, useState} from 'react';
import {Info, Cond, Chart, USMap} from './components';
//import {{Info, Cond}, Chart, USMap} from './components';
import {fetchAllStatesByDate, fetchData} from './api/';
import range from "lodash/range";
import { getMonth, getYear } from 'date-fns';
import './App.css'
import styles from './App.module.css';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
    const [data, setData] = useState(null);
    const [statedata, setMapData] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let today = new Date();
    let test = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    test = yyyy + '-' + mm + '-' + 22;
    let ds = 'cases';


     useEffect(() => {
        let datas,data3;
        async function updatedata() {
            datas = await fetchData();
            data3 = await fetchAllStatesByDate(test);
            setData(data => datas);
            setMapData(statedata => data3);
            // setCond(cond => ds);
            // setTimeout(() => {
            //     setMapData(statedata => data3);
            // }, 3000);
            // console.log(data3.length);
            // setData(data => datas);
            // setMapData(statedata => data3);
            // console.log(statedata.length);
        }
        updatedata();
    }, []);

    return (
        <div className={styles.container}>
            {data && <Info data={data}/>}
            <p> Current date is: {moment(startDate).format("YYYY-MM-DD")}</p>
            <DatePicker
                renderCustomHeader={({
                                         date,
                                         changeYear,
                                         changeMonth,
                                         decreaseMonth,
                                         increaseMonth,
                                         prevMonthButtonDisabled,
                                         nextMonthButtonDisabled
                                     }) => (
                    <div
                        style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                        </button>
                        <select
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                            }
                        >
                            {months.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                        </button>
                    </div>
                )}
                selected={startDate}
                onChange={date => setStartDate(date)}
            />
            <br/>
            <div className={styles.maps}>
                    {data && statedata && <svg width="960" height="600">
                        <USMap date={moment(startDate).format("YYYY-MM-DD")} statedata={statedata} cond="cases"/>
                </svg>}
            </div>
            {data && <Chart data={data} country="US"/>}
        </div>
    );
}

export default App;