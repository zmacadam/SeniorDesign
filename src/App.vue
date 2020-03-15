<template>
  <v-app>
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
              <v-list-item-subtitle>
                <v-skeleton-loader width="140" type="text"></v-skeleton-loader>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-list-item @click="view(l)" v-else v-for="(l, idx) in locations" :key="idx" link>
          <v-list-item-content>
            <v-list-item-title>
              <span class="font-weight-bold">
                <ICountUp class="red--text text--darken-2" :endVal="l.confirmed" />
              </span>
              {{ l['Country/Region'] }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Deaths:
              <ICountUp :endVal="l.death" />
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Recovered:
              <ICountUp :endVal="l.recovered" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        COVID-19
        <span v-show="$vuetify.breakpoint.smAndUp">Worldwide Confirmed Cases</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left :dark="isDarkTheme">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="$refs.searchDialog.dialog = true">
            <v-icon>mdi-map-search</v-icon>
          </v-btn>
        </template>
        <span>Search</span>
      </v-tooltip>
      <v-tooltip left :dark="isDarkTheme">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="TOGGLE_THEME">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </template>
        <span>Switch theme</span>
      </v-tooltip>
      <v-tooltip bottom :dark="isDarkTheme">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            href="https://github.com/sorxrob/2019-ncov-frontend"
            target="_BLANK"
            icon
          >
            <v-icon>mdi-cloud-download</v-icon>
          </v-btn>
        </template>
        <span>Repo</span>
      </v-tooltip>
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
                  <v-icon large left>mdi-twitter</v-icon>
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
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">Twitter</span>
              </v-card-title>
              <v-card-text>
                <Tweets ref="tweets" :count="5" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <DailyReport :data="cases.data" />
          </v-col>
          <v-col cols="12" md="6">
            <RecoveredChart :data="cases.data" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <FatalityRateByAge title="Fatality Rate by Age" :data="fatalityRate.byAge" />
          </v-col>
          <v-col cols="12" md="6">
            <FatalityRateBySex
              title="Fatality Rate by Sex"
              :data="fatalityRate.bySex"
              :colors="['#152C82', '#DB6395']"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <Timeline />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <Reference />
          </v-col>
        </v-row>
      </v-container>

      <!-- Details -->
      <v-dialog width="500" v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>
          <v-card-title>
            <span v-show="$vuetify.breakpoint.smAndUp" class="headline"
              >Confirmed Cases: {{ selected.country }}</span
            >
            <span v-show="$vuetify.breakpoint.xsOnly" class="headline">{{ selected.country }}</span>
            <v-spacer></v-spacer>
            <v-btn v-show="$vuetify.breakpoint.xsOnly" @click="dialog = false" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="$vuetify.breakpoint.mdAndUp">
              <p>Country/Region: {{ selected['Country/Region'] }}</p>
              <p v-show="selected['Province/State']">
                Province/State: {{ selected['Province/State'] }}
              </p>

              <p>
                Confirmed:
                <ICountUp class="red--text text--darken-2" :endVal="selected.confirmed" />
              </p>
              <p>
                Deaths:
                <ICountUp :endVal="selected.death" />
              </p>
              <p>
                Recovered:
                <ICountUp :endVal="selected.recovered" />
              </p>
            </div>
            <div
              class="d-flex flex-column justify-center align-center"
              style="height: 80vh;"
              v-else
            >
              <p class="text-center">
                <span class="display-1">{{ selected['Country/Region'] }}</span>
                <br />
                <span class="title">Country Region</span>
              </p>
              <p class="text-center" v-if="selected['Province/State']">
                <span class="display-1">{{ selected['Province/State'] }}</span>
                <br />
                <span class="title">Province/State</span>
              </p>

              <p class="text-center">
                <span class="display-1">
                  <ICountUp class="red--text text--darken-2" :endVal="selected.confirmed" />
                </span>
                <br />
                <span class="title">Confirmed</span>
              </p>

              <p class="text-center">
                <span class="display-1">
                  <ICountUp :endVal="selected.death" />
                </span>
                <br />
                <span class="title">Deaths</span>
              </p>

              <p class="text-center">
                <span class="display-1">
                  <ICountUp :endVal="selected.recovered" />
                </span>
                <br />
                <span class="title">Recovered</span>
              </p>
            </div>
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
      <v-btn dark text @click="reload">Reload</v-btn>
    </v-snackbar>

    <TweetDialog ref="tweetDialog" />

    <SearchDialog ref="searchDialog" :data="cases.data" @PLACE_SELECTED="viewDetails" />

    <!-- <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>-->
  </v-app>
</template>

<script>
import ICountUp from 'vue-countup-v2';
import { mapState, mapMutations } from 'vuex';
import LeafletMap from './components/Map.vue';
import DailyReport from './components/DailyReport.vue';
import RecoveredChart from './components/RecoveredChart.vue';
import Tweets from './components/Tweets.vue';
import TweetDialog from './components/TweetDialog.vue';
import Timeline from './components/Timeline.vue';
import Reference from './components/Reference.vue';
import SearchDialog from './components/SearchDialog.vue';
import FatalityRateByAge from './components/FatalityRateByAge.vue';
import FatalityRateBySex from './components/FatalityRateBySex.vue';
import API from './API';

export default {
  name: 'App',

  components: {
    LeafletMap,
    DailyReport,
    RecoveredChart,
    ICountUp,
    Tweets,
    TweetDialog,
    Timeline,
    Reference,
    SearchDialog,
    FatalityRateByAge,
    FatalityRateBySex
  },

  data: () => ({
    drawer: null,
    cases: {
      data: []
    },
    selected: {},
    dialog: false,
    loading: false,
    snackbar: false,
    fatalityRate: {
      byAge: [],
      bySex: []
    }
  }),

  computed: {
    ...mapState(['isDarkTheme']),
    locations() {
      const data = [];
      this.cases.data.forEach(item => {
        const idx = data.findIndex(i => i['Country/Region'] === item['Country/Region']);
        const { confirmed } = item.dates[item.dates.length - 1];
        const { recovered } = item.dates[item.dates.length - 1];
        const { death } = item.dates[item.dates.length - 1];
        if (idx === -1) {
          const obj = {
            ...item,
            confirmed,
            recovered,
            death
          };
          delete obj['Province/State'];
          delete obj.dates;
          data.push(obj);
        } else {
          data[idx].confirmed += confirmed;
          data[idx].recovered += recovered;
          data[idx].death += death;
        }
      });
      return data.sort((a, b) => b.confirmed - a.confirmed);
    },
    mainlandChinaCases() {
      return this.cases.data.filter(i => i['Country/Region'] === 'Mainland China');
    }
  },

  async created() {
    this.$vuetify.theme.dark = this.isDarkTheme;
    this.loading = true;
    this.cases = await API.getCases();
    this.fatalityRate = await API.getFatalityRate();
    this.loading = false;
  },

  mounted() {
    document.addEventListener('swUpdated', () => {
      this.snackbar = true;
    });
  },

  watch: {
    isDarkTheme(val) {
      this.$vuetify.theme.dark = val;
    }
  },

  methods: {
    ...mapMutations(['TOGGLE_THEME']),
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
