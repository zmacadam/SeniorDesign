<template>
  <apexcharts ref="chart" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import Vue2Filters from 'vue2-filters';
import moment from 'moment';
import API from '../API';

export default {
  name: 'DailyReport',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'basic-line',
          type: 'area',
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
        colors: ['#FEAA00'],
        title: {
          text: 'Confirmed cases in Mainland China',
          align: 'left',
        },
      },
      series: [],
    };
  },
  async mounted() {
    const data = await API.getMainlandChinaDailyReport();
    this.$refs.chart.updateOptions({
      xaxis: {
        categories: this.limitBy(
          data.map(i => moment(i.date).format('MMM D')),
          data.length,
          data.length - 6,
        ),
      },
    });
    this.$refs.chart.updateSeries([
      {
        name: 'Confirmed cases in Mainland China',
        data: this.limitBy(
          data.map(i => +i.count.replace(/,/g, '')),
          data.length,
          data.length - 6,
        ),
      },
    ]);
  },
  mixins: [Vue2Filters.mixin],
};
</script>
