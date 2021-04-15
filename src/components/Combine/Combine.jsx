import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap, News } from '../../components';
import range from 'lodash/range';
import { getMonth, getYear } from 'date-fns';
import '../../App.css';
import styles from '../../App.module.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'add-days';
import { fetchAllStatesByDate, fetchData, fetchUSByDate } from '../../api';
import SearchPage from '../../components/SearchBar/SearchPage.js';

const Combine = () => {
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
    const [test,settest] = useState(new Date());

    const [cond, setCond] = useState(null);

    useEffect(() => {
        // console.log(today);
        settest(test => test.setDate(test.getDate()-3));
    },[]);

    useEffect(() => {
        if(test)
        {
            const condDefault = 'cases';
            let datas; let data3;
            async function updatedata() {
                // datas = await fetchData();
                // console.log("@@" + moment(test).format('YYYY-MM-DD'));
                datas = await fetchUSByDate("2021-04-04");
                data3 = await fetchAllStatesByDate("2021-04-04");
                setData((data) => datas.stats[0]);
                setMapData((statedata) => data3);
                setCond((cond) => condDefault);
            }
            // console.log(data);
            updatedata();
        }

    }, [test]);
    if(!data || !statedata)
    {
        return (
            <div>Loading...</div>
        );
    }
    return (
        <div className={styles.container}>
            {data && <Info data={data} />}
            <p>Data is up to date: {moment(test).format('YYYY-MM-DD')}, choose on any date  before the data ready first to see the data <i className="fas fa-adjust"></i> </p>
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
                {data && statedata && cond && ( <USMap date={moment(startDate).format('YYYY-MM-DD')} statedata={statedata} cond={cond} />)}
            </div>
            {data && <Chart nbdate={"2021-04-04"} data={data} country="US" />}
            <News nbdate={"2021-04-04"} />
        </div>
    );
}
export default Combine;