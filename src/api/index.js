import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const url1 = 'https://covid-tracker-server-api.herokuapp.com/'
const mapurl = '/api/data/';

export const fetchData = async(country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        return error;
    }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async() => {
    try {
        const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

        return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
        return error;
    }
};

export const fetchCountries = async() => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        return error;
    }
};

//= ================================================================================================================================================================//
// Map data//
export const fetchAllStatesByDate = async(date) => {
    let changeableUrl = mapurl;

    if (date) {
        changeableUrl = `${url1}${mapurl}AllStatesByDate?date=${date}`;
        // console.log(changeableUrl);
    }

    try {
        const data = await axios.get(changeableUrl);
        return data.data;
    } catch (error) {
        return error;
    }
};
// Chart Data 1 Date
export const fetchUSByDate = async(date) => {
    let changeableUrl = url1;

    if (date) {
        changeableUrl = `${url1}${mapurl}USByDate?date=${date}`;
        // console.log(changeableUrl);
    }

    try {
        const data = await axios.get(changeableUrl);
        return data.data;
    } catch (error) {
        return error;
    }
};
// Chart US Data by Date Range
export const fetchUSByDateRange = async(startDate, endDate) => {
    let changeableUrl = mapurl;

    if (startDate && endDate) {
        changeableUrl = `${mapurl}USByDateRange?start=${startDate}&&end=${endDate}`;
        // console.log(changeableUrl);
    }

    try {
        let { data } = await axios.get(changeableUrl);
        // const { stats } = data;
        data = data.map(({ stats, date }) => ({ stats, date }));
        return data.reverse();
    } catch (error) {
        return error;
    }
};

// Chart US Data by Date Range
export const fetchStateNoCountiesByDateRange = async(startDate, endDate, stateName) => {
    let changeableUrl = mapurl;

    if (startDate && endDate && stateName) {
        changeableUrl = `${mapurl}StateNoCountiesByDateRange?start=${startDate}&&end=${endDate}&&state=${stateName}`;
        // console.log(changeableUrl);
    }

    try {
        const { data } = await axios.get(changeableUrl);
        // data.map(({ stats, date }) => ({ stats, date }));
        return data.reverse();
    } catch (error) {
        return error;
    }
};

// Chart US Data by Date Range using One State by Date
export const fetchOneStateByDateRange = async(endDate, stateName) => {
    let changeableUrl = mapurl;
    // const stateDates = [];
    // const stateCases = [];
    const stateArray = [];
    let curDate = new Date();
    const yyyy = '2021';
    const mm = '03';
    let dayCount = 1;
    curDate = `${yyyy}-${mm}-0${dayCount}`;

    if (endDate && stateName) {
        changeableUrl = `${mapurl}OneStateByDate?date=${curDate}&&state=${stateName}`;
        // console.log(changeableUrl);
    }

    try {
        let i = 0;
        let data = await axios.get(changeableUrl);
        while (curDate !== endDate) {
            // console.log(data);
            stateArray[i] = data;
            // console.log(stateArray);
            i += 1;
            dayCount += 1;
            curDate = `${yyyy}-${mm}-${dayCount}`;
            if (dayCount < 10) {
                curDate = `${yyyy}-${mm}-0${dayCount}`;
            }
            changeableUrl = `${mapurl}OneStateByDate?date=${curDate}&&state=${stateName}`;
            data = await axios.get(changeableUrl);
        }
        // const { data } = await axios.get(changeableUrl);
        // return data.reverse();
        return stateArray;
    } catch (error) {
        return error;
    }
};

export const fetchCountyByDate = async(state, date) => {
    let changeableUrl = mapurl;
    if (date) {
        changeableUrl = `${mapurl}OneStateByDate?date=${date}&&state=${state}`;
        // console.log(changeableUrl);
    }

    try {
        const data = await axios.get(changeableUrl);
        return data.data;
    } catch (error) {
        return error;
    }
};