<template>
  <v-card tile flat>
    <v-card-text>
      <div class="text-right">
        Reference: <br />
        <a
          class="no-decoration"
          href="https://bnonews.com/index.php/2020/01/timeline-coronavirus-epidemic/"
          target="_BLANK"
          >bnonews.com</a
        >
        <br />
        <a class="no-decoration" href="https://github.com/CSSEGISandData/COVID-19" target="_BLANK"
          >JHU CSSE</a
        >
        <br />
        <a class="no-decoration" href="https://www.worldometers.info/coronavirus/" target="_BLANK"
          >worldometers.info</a
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isDarkTheme'])
  }
};
</script>

<style scoped>
.no-decoration {
  text-decoration: none;
}
</style>
