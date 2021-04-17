import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { fetchDailyData, fetchUSByDate, fetchUSByDateRange, fetchStateNoCountiesByDateRange } from '../../api';
import styles from './Chart.module.css';

// Temporary var for state name, should be changed from const to var later
const stateName = 'Texas';
let test = new Date();
let test1 = new Date();
let test2 = new Date();
let testLastWeek = new Date();
let testLastMonth = new Date();
// const { date } = this.props;
test = '2021-03-20';
test1 = '2020-03-20';
test2 = '2021-03-22';
testLastWeek = '2021-03-15';
testLastMonth = '2021-02-22';




const Chart = ({nbdate, country, cond ,width, height}) => {


    const [dailyData, setDailyData] = useState({});
    const [weekData, setWeekData] = useState({});
    const [monthData, setMonthData] = useState({});

//     let cond = this.cond;
    //console.log(cond);

    useEffect(() => {
        const fetchMyAPI = async () => {
            // const initialDailyData = await fetchDailyData();
            const nbData = await fetchUSByDate(test);
            const nbDataRange = await fetchUSByDateRange(test1, test2);
            const nbStateData = await fetchStateNoCountiesByDateRange(test, test2, stateName);

            const nbDataRangeWeek = await fetchUSByDateRange(testLastWeek, test2);
            const nbDataRangeMonth = await fetchUSByDateRange(testLastMonth, test2);
            //console.log(nbDataRange);


            // const nbOneStateData = await fetchOneStateByDateRange(test2, stateName);
            // //console.log(initialDailyData);
            // //console.log(nbData);
            // //console.log(nbData.date);
            // //console.log(nbData.stats[0]);
            // //console.log(nbData.stats[0].cases);
            // //console.log(nbDataRange);
            // //console.log(nbStateData);
            /* //console.log(nbOneStateData);
            //console.log(nbOneStateData[0].data.date);
            //console.log(nbOneStateData[0].data.state.stats[0]); */
            // //console.log(nbDataRange[0].stats[0].cases);
            // setDailyData(initialDailyData);
            // Uncomment below to Set Daily Data for USTotalByRange:
            setDailyData(nbDataRange);
//       //console.log(dailyData);
            setWeekData(nbDataRangeWeek);
//       //console.log(weekData);
            setMonthData(nbDataRangeMonth);
//       //console.log(monthData);
            // Uncomment below to Set Daily Data for StateByRange:
            // setDailyData(nbStateData);
        };

        fetchMyAPI();
    }, []);

    useEffect(() => {
        if(nbdate)
        {
            const fetchMyAPI = async () => {
                const nbDataRangeWeek = await fetchUSByDateRange(testLastWeek, nbdate);
                const nbDataRange = await fetchUSByDateRange(test1, nbdate);
                const nbDataRangeMonth = await fetchUSByDateRange(testLastMonth, nbdate);
                // //console.log(nbdate);
                // //console.log(nbDataRange);

                setDailyData(nbDataRange);
                setWeekData(nbDataRangeWeek);
                setMonthData(nbDataRangeMonth);
            };

            fetchMyAPI();
        }
    }, [nbdate]);

    // Uncomment the block of line charts below to display a range of US Total Data By DateRange
    let lineChart1 = null;
    let lineChart2 = null;
    let lineChart3 = null;

    const lineChart1Cases = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].cases),
                        label: 'Cases By Year',
                        borderColor: '#3333ff',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Cases by Year` },
                }}
            />
        ) : null
    );

    const lineChart2Cases = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].cases),
                        label: 'Cases by Month',
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `${country} Cases by Month` },
                }}
            />
        ) : null
    );

    const lineChart3Cases = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].cases),
                        label: 'Cases by Week',
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Cases by Week` },
                }}
            />
        ) : null
    );
    const lineChart1Deaths = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].deaths),
                        label: 'Deaths By Year',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Deaths by Year` },
                }}
            />
        ) : null
    );
    const lineChart2Deaths = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].deaths),
                        label: 'Deaths By Month',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Deaths by Month` },
                }}
            />
        ) : null
    );
    const lineChart3Deaths = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].deaths),
                        label: 'Deaths By Week',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Deaths by Week` },
                }}
            />
        ) : null
    );

    const lineChart1NewCases = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].newCases),
                        label: 'New Cases By Year',
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} New Cases by Year` },
                }}
            />
        ) : null
    );
    const lineChart2NewCases = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].newCases),
                        label: 'New Cases By Month',
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} New Cases by Month` },
                }}
            />
        ) : null
    );
    const lineChart3NewCases = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].deaths),
                        label: 'New Cases By Week',
                        borderColor: 'rgba(0, 255, 0, 0.5)',
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} New Cases by Week` },
                }}
            />
        ) : null
    );


    const lineChart1Vaccinations = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].peopleVaccinated),
                        label: 'Vaccinations By Year',
                        borderColor: 'rgba(60, 0, 200, 0.5)',
                        backgroundColor: 'rgba(60, 0, 200, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Vaccinations by Year` },
                }}
            />
        ) : null
    );
    const lineChart2Vaccinations = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].peopleVaccinated),
                        label: 'Vaccinations By Month',
                        borderColor: 'rgba(60, 0, 200, 0.5)',
                        backgroundColor: 'rgba(60, 0, 200, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Vaccinations by Month` },
                }}
            />
        ) : null
    );
    const lineChart3Vaccinations = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].peopleVaccinated),
                        label: 'Vaccinations By Week',
                        borderColor: 'rgba(60, 0, 200, 0.5)',
                        backgroundColor: 'rgba(60, 0, 200, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Vaccinations by Week` },
                }}
            />
        ) : null
    );

    const lineChart1Hosp = (
        dailyData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({ stats }) => stats[0].hospitalized),
                        label: 'Hospitalizations By Year',
                        borderColor: 'rgba(255,192,203, 0.5)',
                        backgroundColor: 'rgba(255,192,203, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Hospitalizations by Year` },
                }}
            />
        ) : null
    );
    const lineChart2Hosp = (
        monthData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: monthData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: monthData.map(({ stats }) => stats[0].hospitalized),
                        label: 'Hospitalizations By Month',
                        borderColor: 'rgba(255,192,203, 0.5)',
                        backgroundColor: 'rgba(255,192,203, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Hospitalizations by Month` },
                }}
            />
        ) : null
    );
    const lineChart3Hosp = (
        weekData[0] ? (
            <Line width={width} height={height}
                data={{
                    labels: weekData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: weekData.map(({ stats }) => stats[0].hospitalized),
                        label: 'Hospitalizations By Week',
                        borderColor: 'rgba(255,192,203, 0.5)',
                        backgroundColor: 'rgba(255,192,203, 0.5)',
                        fill: true,
                    },
                    ],
                }}
                options={{
                    legend: { display: false, reverse: true },
                    title: { display: true, text: `${country} Hospitalizations by Week` },
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

    if(cond === 'cases'){
        //console.log('here');
        lineChart1 = lineChart1Cases;
        lineChart2 = lineChart2Cases;
        lineChart3 = lineChart3Cases;
    }
    else if(cond === 'deaths'){
        //set lineChart1 2 and 3 to a deaths chart
        lineChart1 = lineChart1Deaths;
        lineChart2 = lineChart2Deaths;
        lineChart3 = lineChart3Deaths;
    }
    else if(cond === 'newcases'){
        lineChart1 = lineChart1NewCases;
        lineChart2 = lineChart2NewCases;
        lineChart3 = lineChart3NewCases;
    }
    else if(cond == 'vaccinations'){
        lineChart1 = lineChart1Vaccinations;
        lineChart2 = lineChart2Vaccinations;
        lineChart3 = lineChart3Vaccinations;
    }
    else if(cond == 'hospitalizations'){
        lineChart1 = lineChart1Hosp;
        lineChart2 = lineChart2Hosp;
        lineChart3 = lineChart3Hosp;
    }



    return (
        <div>
            <div style={{ margin: "20px" }}>
                <Tabs>
                    <TabList>
                        <Tab>By Week</Tab>
                        <Tab>By Month</Tab>
                        <Tab>By Year</Tab>
                    </TabList>

                    <TabPanel>
                        {country && lineChart3}
                    </TabPanel>
                    <TabPanel>
                            {country && lineChart2}
                    </TabPanel>
                    <TabPanel>
                        {country && lineChart1}
                    </TabPanel>
                </Tabs>
            </div>
            {/* {country ? barChart : lineChart} */}
            {/*{country ? lineChart1 : barChart}*/}
            {/*{country ? lineChart2 : barChart}*/}
            {/*{country ? lineChart3 : barChart}*/}
        </div>
    );
};

export default Chart;