import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const mapurl = '/api/data/';

export const fetchData = async (country) => {
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
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

//= ================================================================================================================================================================//
// Map data//
export const fetchAllStatesByDate = async (date) => {
  let changeableUrl = mapurl;

  if (date) {
    changeableUrl = `${mapurl}AllStatesByDate?date=${date}`;
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
export const fetchUSByDate = async (date) => {
  let changeableUrl = mapurl;

  if (date) {
    changeableUrl = `${mapurl}USByDate?date=${date}`;
    // console.log(changeableUrl);
  }

  try {
    const data = await axios.get(changeableUrl);
    return data.data;
  } catch (error) {
    return error;
  }
};
// Chart Data by Date Range
export const fetchUSByDateRange = async (startDate, endDate) => {
  let changeableUrl = mapurl;

  if (startDate && endDate) {
    changeableUrl = `${mapurl}USByDateRange?startDate=${startDate}&&endDate=${endDate}`;
    console.log(changeableUrl);
  }

  try {
    const { data } = await axios.get(changeableUrl);
    // const { stats } = data;
    // data.map(({ stats, date }) => ({ stats, date }));
    return data.reverse();
  } catch (error) {
    return error;
  }
};

export const fetchCountyByDate = async (state, date) => {
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
