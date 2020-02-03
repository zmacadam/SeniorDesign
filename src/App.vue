<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-skeleton-loader v-if="!total" type="text"></v-skeleton-loader>
              <ICountUp class="display-2" v-else :endVal="total" />
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-skeleton-loader v-if="!total" width="140" type="text"></v-skeleton-loader>
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
        <v-list-item v-else @click="view(l)" v-for="(l, idx) in locations" :key="idx" link>
          <v-list-item-content>
            <v-list-item-title>
              <span class="font-weight-bold"><ICountUp :endVal="l.cases"/></span> {{ l.country }}
            </v-list-item-title>
            <v-list-item-subtitle> Deaths: <ICountUp :endVal="l.deaths" /> </v-list-item-subtitle>
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
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-card tile style="height: 70vh;" flat>
              <LeafletMap :locations="locations" ref="map" @MARKER_CLICKED="viewDetails" />
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
            <v-card tile flat>
              <v-card-text>
                <daily-report></daily-report>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card tile flat>
              <v-card-text>
                <daily-deaths></daily-deaths>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <timeline></timeline>
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
            <p>Country/Region: {{ selected.country }}</p>
            <p>Confirmed: <ICountUp :endVal="selected.cases" /></p>
            <p>Deaths: <ICountUp :endVal="selected.deaths" /></p>
            <p>References: <span v-html="$options.filters.URLify(selected.references)"></span></p>
          </v-card-text>
          <v-card-actions v-show="$vuetify.breakpoint.smAndUp">
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>

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
import DailyDeaths from './components/DailyDeaths.vue';
import Tweets from './components/Tweets.vue';
import TweetDialog from './components/TweetDialog.vue';
import Timeline from './components/Timeline.vue';
import API from './API';

export default {
  name: 'App',

  components: {
    LeafletMap,
    DailyReport,
    DailyDeaths,
    ICountUp,
    Tweets,
    TweetDialog,
    Timeline,
  },

  data: () => ({
    drawer: null,
    locations: [],
    selected: {},
    dialog: false,
    loading: false,
  }),

  computed: {
    total() {
      return this.locations.reduce((total, num) => total + num.cases, 0);
    },
  },

  async created() {
    this.$vuetify.theme.dark = true;
    this.loading = true;
    this.locations = (await API.getConfirmedCases()).map(data => ({
      ...data,
      references: data.references.join(', '),
    }));
    console.log(this.locations);
    this.loading = false;
  },

  methods: {
    view(location) {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.drawer = false;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      const { lat, lon } = location.coordinates;
      this.$refs.map.flyTo(lat, lon);
    },
    viewDetails(location) {
      this.selected = Object.assign({}, location);
      this.dialog = true;
    },
    endReached() {
      this.$refs.tweets.loadMore();
    },
  },
};
</script>

<style scoped>
.ps {
  height: 70vh;
}
</style>
