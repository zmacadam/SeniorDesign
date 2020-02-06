<template>
  <v-dialog fullscreen v-model="tweetDialog">
    <v-card>
      <v-card-title>
        <v-icon large left>
          mdi-twitter
        </v-icon>
        <span class="title font-weight-light">Twitter</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="SET_TWEET_DIALOG(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card :key="t.id" outlined v-for="t in items" class="mb-2">
          <v-card-text>
            <p class="font-weight-bold" v-html="$options.filters.URLify(t.text)"></p>
            <p class="text-right">{{ t.created_at | fromNow }} · {{ t.user.name }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon class="mr-2">mdi-heart</v-icon>
            <span class="subheading mr-2" v-text="t.favorite_count"></span>
            <v-icon class="mr-2">mdi-share-variant</v-icon>
            <span class="subheading" v-text="t.retweet_count"></span>
          </v-card-actions>
        </v-card>

        <v-btn v-if="!loading && !endReached" text @click="loadMore" block>Load More</v-btn>

        <div v-if="loading">
          <v-card class="mb-2" outlined v-for="i in 10" :key="i">
            <v-card-text>
              <v-skeleton-loader type="text@4"></v-skeleton-loader>
              <div style="margin-left: 50%;" class="mt-5">
                <v-skeleton-loader width="150" type="text"></v-skeleton-loader>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon class="mr-2">mdi-heart</v-icon>
              <span class="mr-2">
                <v-skeleton-loader width="50" type="text"></v-skeleton-loader>
              </span>
              <v-icon class="mr-2">mdi-share-variant</v-icon>
              <span>
                <v-skeleton-loader width="50" type="text"></v-skeleton-loader>
              </span>
            </v-card-actions>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import API from '../API';

export default {
  data: () => ({
    items: [],
    loading: false,
    searchMetadata: {},
    endReached: false
  }),
  computed: {
    ...mapState(['tweetDialog'])
  },
  methods: {
    ...mapMutations(['SET_TWEET_DIALOG']),
    async getTweets() {
      this.loading = true;
      const { statuses, search_metadata: searchMetadata } = await API.getTweets({
        q: 'coronavirus ncov 2019ncov wuhan -filter:retweets',
        count: 10,
        result_type: 'recent',
        locale: 'en'
      });
      this.items = statuses;
      this.searchMetadata = searchMetadata;
      this.loading = false;
    },
    async loadMore() {
      if (this.endReached) return;

      if (this.searchMetadata.next_results) {
        this.loading = true;
        const urlParams = new URLSearchParams(this.searchMetadata.next_results);
        const maxId = urlParams.get('max_id');
        const { statuses, search_metadata: searchMetadata } = await API.getTweets({
          q: 'coronavirus ncov 2019ncov wuhan -filter:retweets',
          count: 10,
          result_type: 'recent',
          max_id: maxId
        });
        this.items = [...this.items, ...statuses];
        this.searchMetadata = searchMetadata;
        this.loading = false;
      } else {
        this.endReached = true;
      }
    }
  },
  watch: {
    tweetDialog(val) {
      if (val) {
        this.getTweets();
      } else {
        this.items = [];
        this.searchMetadata = {};
      }
    }
  }
};
</script>
