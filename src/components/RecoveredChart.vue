<template>
  <v-card tile flat>
    <v-card-text>
      <apexcharts ref="chart" :options="chartOptions" :series="series"></apexcharts>
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
          type: 'radar',
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
        colors: ['#00897B'],
        title: {
          text: 'Total Recovered Cases Daily',
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
          name: 'Recovered',
          data: Array(categories.length).fill(0)
        }
      ];
      datesCombined.forEach(item => {
        const categoryIdx = categories.indexOf(item.date);
        series[0].data[categoryIdx] += item.recovered;
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
