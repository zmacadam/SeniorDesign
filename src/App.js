import React, {useEffect, useState} from 'react';
import {Cards, Chart, USMap} from './components';
import {fetchAllStatesByDate, fetchData} from './api/';
import './App.css'
import styles from './App.module.css';
import Calendar from "react-calendar";
import '../src/components/Calendar/Calendar.css';
import moment from 'moment';

const App = () => {
    const [data, setData] = useState(null);
    const [statedata, setMapData] = useState(null);
    let today = new Date();
    let test = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    test = yyyy + '-' + mm + '-' + 22;
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }
    let ds = 'cases';
     useEffect(() => {
        let datas,data3;
        async function updatedata() {
            datas = await fetchData();
            data3 = await fetchAllStatesByDate(test);
            setData(data => datas);
            setMapData(statedata => data3);
        }
        updatedata();
    }, []);

    return (
        <div className={styles.container}>
            {data && <Cards data={data}/>}
            <>
                <Calendar
                    value={dateState}
                    onChange={changeDate}
                />
                <p>Current selected date is <b>{moment(dateState).format('YYYY-MM-DD')}</b></p>
            </>
            <div className={styles.maps}>
                    {data && statedata && <svg width="960" height="600">
                        <USMap date={moment(dateState).format('YYYY-MM-DD')} statedata={statedata} cond={ds}/>
                </svg>}
            </div>
            <br/>
            {data && <Chart data={data} country="US"/>}
        </div>
    );
}

export default App;