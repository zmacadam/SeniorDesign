import React, {useEffect, useState} from 'react';
import {Cards, Chart, USMap} from './components';
import {fetchAllStatesByDate, fetchData} from './api/';
import './App.css'
import styles from './App.module.css';

const App = () => {
    const [data, setData] = useState(null);
    const [statedata, setMapData] = useState(null);
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
            {data && <Cards data={data}/>}
            <div className={styles.maps}>
                    {data && statedata && <svg width="960" height="600">
                        <USMap statedata={statedata} cond={ds}/>
                </svg>}
            </div>
            {data && <Chart data={data} country="US"/>}
        </div>
    );
}

export default App;