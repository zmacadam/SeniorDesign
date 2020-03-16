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
  props: ['title', 'data'],
  components: {
    apexcharts: VueApexCharts
  },

  computed: {
    ...mapState(['isDarkTheme']),
    chartOptions() {
      let labels = [];

      if (this.data.length) {
        labels = this.data.map(i => i[Object.keys(this.data[0])[0]]);
      }

      return {
        chart: {
          id: 'rate-by-comorbidity',
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top'
            }
          }
        },
        xaxis: {
          categories: labels
        },
        tooltip: {
          theme: 'dark'
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.title
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter(val) {
              return `${val}%`;
            }
          }
        },
        colors: ['#00897B']
      };
    },
    series() {
      return [
        {
          name: 'Rate',
          data: this.data.map(i => +i.rate.replace('%', ''))
        }
      ];
    }
  },

  watch: {
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
