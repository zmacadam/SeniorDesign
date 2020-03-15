<template>
  <div>
    <v-card tile flat>
      <v-card-text class="d-flex justify-space-between">
        <v-row>
          <v-col
            cols="12"
            md="6"
            :class="[$vuetify.breakpoint.mdAndUp ? 'text-left' : 'text-center']"
          >
            References:
            <a
              class="no-decoration"
              href="https://bnonews.com/index.php/2020/01/timeline-coronavirus-epidemic/"
              target="_BLANK"
              >bnonews.com</a
            >
            -
            <a
              class="no-decoration"
              href="https://github.com/CSSEGISandData/COVID-19"
              target="_BLANK"
              >JHU CSSE</a
            >
            -
            <a
              class="no-decoration"
              href="https://www.worldometers.info/coronavirus/"
              target="_BLANK"
              >worldometers.info</a
            >
          </v-col>
          <v-col
            cols="12"
            md="6"
            :class="[$vuetify.breakpoint.mdAndUp ? 'text-right' : 'text-center']"
          >
            <a @click.prevent="share" class="white--text no-decoration">Share</a>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-snackbar bottom v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn color="red" text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isDarkTheme'])
  },
  data: () => ({
    snackbar: {
      show: false,
      text: null
    }
  }),
  methods: {
    async share() {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'the2019ncov.com',
            text: 'Map, data and timeline of coronavirus (COVID-19)',
            url: 'https://the2019ncov.com'
          });
          this.snackbar.text = 'Shared successfully.';
        } catch (e) {
          this.snackbar.text = 'An error occurred.';
        }
      } else {
        this.snackbar.text = 'Unsupported.';
      }

      this.snackbar.show = true;
    }
  }
};
</script>

<style scoped>
.no-decoration {
  text-decoration: none;
}
</style>
