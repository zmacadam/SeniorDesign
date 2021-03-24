import React, {useEffect, useState} from 'react';
import {Cards, Chart, USMap} from './components';
import {fetchData} from './api/';
import './App.css'
import styles from './App.module.css';

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function updatedata() {
            const datas = await fetchData();
            setData(data => datas);
        }
        updatedata();
    }, []);

    return (
        <div className={styles.container}>
            {data && <Cards data={data}/>}
            <div className={styles.maps}>
                    {data && <svg width="960" height="600">
                        <USMap/>
                </svg>}
            </div>
            {data && <Chart data={data} country="US"/>}
        </div>
    );
}

export default App;