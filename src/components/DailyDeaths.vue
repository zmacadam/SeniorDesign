<template>
  <apexcharts ref="chart" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import Vue2Filters from 'vue2-filters';
import moment from 'moment';
import API from '../API';

export default {
  name: 'DailyDeaths',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'basic-line',
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [],
        },
        tooltip: {
          theme: 'dark',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        markers: {
          size: 0,
        },
        colors: ['#999999'],
        title: {
          text: 'Deaths per Day',
          align: 'left',
        },
      },
      series: [],
    };
  },
  async mounted() {
    const data = await API.getDailyDeaths();
    this.$refs.chart.updateOptions({
      xaxis: {
        categories: this.limitBy(
          data.map(i => moment(i.date, 'MMM D.').format('MMM D')),
          data.length,
          data.length - 6,
        ),
      },
    });
    this.$refs.chart.updateSeries([
      {
        name: 'Deaths per Day',
        data: this.limitBy(
          data.map(i => i.count),
          data.length,
          data.length - 6,
        ),
      },
    ]);
  },
  mixins: [Vue2Filters.mixin],
};
</script>
