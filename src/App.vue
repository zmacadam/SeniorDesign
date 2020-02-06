<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-skeleton-loader v-if="!cases.total_confirmed" type="text"></v-skeleton-loader>
              <ICountUp
                class="red--text text--darken-2 display-2"
                v-else
                :endVal="cases.total_confirmed"
              />
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-skeleton-loader
                v-if="!cases.total_confirmed"
                width="140"
                type="text"
              ></v-skeleton-loader>
              <span v-else>Total Confirmed</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <div v-if="loading">
          <v-list-item link v-for="i in 20" :key="i">
            <v-list-item-content>
              <v-list-item-title>
                <v-skeleton-loader type="text"></v-skeleton-loader>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-skeleton-loader width="140" type="text"></v-skeleton-loader>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-list-item @click="view(l)" v-else v-for="(l, idx) in locations" :key="idx" link>
          <v-list-item-content>
            <v-list-item-title>
              <span class="font-weight-bold"
                ><ICountUp class="red--text text--darken-2" :endVal="l.confirmed"
              /></span>
              {{ l['Country/Region'] }}
            </v-list-item-title>
            <v-list-item-subtitle> Deaths: <ICountUp :endVal="l.death" /> </v-list-item-subtitle>
            <v-list-item-subtitle>
              Recovered: <ICountUp :endVal="l.recovered" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        2019-nCoV <span v-show="$vuetify.breakpoint.smAndUp">Worldwide Confirmed Cases</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/sorxrob/2019-ncov-frontend" target="_BLANK" icon>
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-facebook-messenger</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-card tile style="height: 70vh;" flat>
              <LeafletMap :data="cases.data" ref="map" @MARKER_CLICKED="viewDetails" />
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <perfect-scrollbar
              style="overscroll-behavior: none;"
              v-if="$vuetify.breakpoint.mdAndUp"
              @ps-y-reach-end="endReached"
            >
              <v-card tile flat>
                <v-card-title>
                  <v-icon large left>
                    mdi-twitter
                  </v-icon>
                  <span class="title font-weight-light">Twitter</span>
                </v-card-title>
                <v-card-text>
                  <tweets
                    ref="tweets"
                    @MORE_TWEETS_CLICKED="$refs.tweetDialog.dialog = true"
                  ></tweets>
                </v-card-text>
              </v-card>
            </perfect-scrollbar>
            <v-card v-else tile flat>
              <v-card-title>
                <v-icon large left>
                  mdi-twitter
                </v-icon>
                <span class="title font-weight-light">Twitter</span>
              </v-card-title>
              <v-card-text>
                <tweets ref="tweets" :count="5"></tweets>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <daily-report :data="cases.data"></daily-report>
          </v-col>
          <v-col cols="12" md="6">
            <mainland-china :data="mainlandChinaCases"></mainland-china>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <timeline></timeline>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <reference></reference>
          </v-col>
        </v-row>
      </v-container>

      <!-- Details -->
      <v-dialog width="500" v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>
          <v-card-title>
            <span v-show="$vuetify.breakpoint.smAndUp" class="headline">
              Confirmed Cases: {{ selected.country }}
            </span>
            <span v-show="$vuetify.breakpoint.xsOnly" class="headline">{{ selected.country }}</span>
            <v-spacer></v-spacer>
            <v-btn v-show="$vuetify.breakpoint.xsOnly" @click="dialog = false" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <p>Country/Region: {{ selected['Country/Region'] }}</p>
            <p v-show="selected['Province/State']">
              Province/State: {{ selected['Province/State'] }}
            </p>
            <p>
              First confirmed date in country (Est.):
              {{ selected['First confirmed date in country (Est.)'] }}
            </p>
            <p>
              Confirmed: <ICountUp class="red--text text--darken-2" :endVal="selected.confirmed" />
            </p>
            <p>Deaths: <ICountUp :endVal="selected.death" /></p>
            <p>Recovered: <ICountUp :endVal="selected.recovered" /></p>
          </v-card-text>
          <v-card-actions v-show="$vuetify.breakpoint.smAndUp">
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>

    <v-snackbar v-model="snackbar" bottom right :timeout="0">
      An update is available
      <v-btn dark text @click="reload">
        Reload
      </v-btn>
    </v-snackbar>

    <tweet-dialog ref="tweetDialog"></tweet-dialog>

    <!-- <v-footer app>
      <span>&copy; 2020</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import ICountUp from 'vue-countup-v2';
import LeafletMap from './components/Map.vue';
import DailyReport from './components/DailyReport.vue';
import MainlandChina from './components/MainlandChina.vue';
import Tweets from './components/Tweets.vue';
import TweetDialog from './components/TweetDialog.vue';
import Timeline from './components/Timeline.vue';
import Reference from './components/Reference.vue';
import API from './API';

export default {
  name: 'App',

  components: {
    LeafletMap,
    DailyReport,
    MainlandChina,
    ICountUp,
    Tweets,
    TweetDialog,
    Timeline,
    Reference
  },

  data: () => ({
    drawer: null,
    cases: {
      data: []
    },
    selected: {},
    dialog: false,
    loading: false,
    snackbar: false
  }),

  computed: {
    locations() {
      const data = [];
      this.cases.data.forEach(item => {
        const idx = data.findIndex(i => i['Country/Region'] === item['Country/Region']);
        const { confirmed } = item.dates[item.dates.length - 1];
        const { recovered } = item.dates[item.dates.length - 1];
        const { death } = item.dates[item.dates.length - 1];

        if (idx === -1) {
          data.push({
            ...item,
            confirmed,
            recovered,
            death,
            dates: undefined
          });
        } else {
          data[idx].confirmed += confirmed;
          data[idx].recovered += recovered;
          data[idx].death += death;
        }
      });
      return data;
    },
    mainlandChinaCases() {
      return this.cases.data.filter(i => i['Country/Region'] === 'Mainland China');
    }
  },

  async created() {
    this.$vuetify.theme.dark = true;
    this.loading = true;
    this.cases = await API.getCases();
    this.loading = false;
  },

  mounted() {
    document.addEventListener('swUpdated', () => {
      this.snackbar = true;
    });
  },

  methods: {
    view(location) {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.drawer = false;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      const { Lat, Long } = location;
      this.$refs.map.flyTo(Lat, Long);
    },
    viewDetails(location) {
      this.selected = {
        ...location,
        confirmed: +location.dates[location.dates.length - 1].confirmed,
        death: +location.dates[location.dates.length - 1].death,
        recovered: +location.dates[location.dates.length - 1].recovered
      };
      this.dialog = true;
    },
    endReached() {
      this.$refs.tweets.loadMore();
    },
    reload() {
      window.location.reload(true);
    }
  }
};
</script>

<style scoped>
.ps {
  height: 70vh;
}
</style>
