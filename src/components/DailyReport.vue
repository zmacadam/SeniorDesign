<template>
  <v-card tile flat>
    <v-card-text>
      <apexcharts height="300" ref="chart" :options="chartOptions" :series="series"></apexcharts>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { mapState } from 'vuex';

export default {
  name: 'DailyReport',
  props: ['data'],
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'daily-report',
          type: 'area',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: []
        },
        tooltip: {
          theme: 'dark'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        markers: {
          size: 5,
          strokeColor: '#fff',
          strokeWidth: 2
        },
        colors: ['#00897B', '#f00'],
        title: {
          text: 'Total Confirmed Cases and Deaths Daily',
          align: 'left'
        }
      },
      series: []
    };
  },

  computed: {
    ...mapState(['isDarkTheme'])
  },

  watch: {
    data(val) {
      const datesCombined = val.map(i => i.dates).flat(1);
      const uniqueDates = [...new Set(datesCombined.map(i => i.date))];
      const categories = uniqueDates.slice(Math.max(uniqueDates.length - 10, 1));
      this.$refs.chart.updateOptions({
        xaxis: {
          categories
        }
      });
      const series = [
        {
          name: 'Total Cases',
          data: Array(categories.length).fill(0)
        },
        {
          name: 'Total Deaths',
          data: Array(categories.length).fill(0)
        }
      ];
      datesCombined.forEach(item => {
        const categoryIdx = categories.indexOf(item.date);
        series[0].data[categoryIdx] += item.confirmed;
        series[1].data[categoryIdx] += item.death;
      });

      this.$refs.chart.updateSeries(series);
    },
    isDarkTheme(val) {
      this.$refs.chart.updateOptions({
        tooltip: {
          theme: val ? 'dark' : 'light'
        }
      });
    }
  }
};
</script>
