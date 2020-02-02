import axios from 'axios';

const http = axios.create({
  baseURL: 'http://167.179.92.170:3000',
});

export default {
  async getConfirmedCases() {
    const { data } = await http.get('/api/confirmed-cases');
    return data;
  },
  async getMainlandChinaDailyReport() {
    const { data } = await http.get('/api/mainland-china-daily-report');
    return data;
  },
  async getDailyDeaths() {
    const { data } = await http.get('/api/daily-deaths');
    return data;
  },
  async getTweets(params) {
    const { data } = await http.get('/api/tweets', {
      params,
    });
    return data;
  },
  async getTimeline() {
    const { data } = await http.get('/api/timeline');
    return data;
  },
};
