<template>
  <div>
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

    <div v-if="loading">
      <v-card class="mb-2" outlined v-for="i in 10" :key="i">
        <v-card-text>
          <v-skeleton-loader type="text@4"></v-skeleton-loader>
          <div style="margin-left: 50%;" class="mt-5">
            <v-skeleton-loader type="text"></v-skeleton-loader>
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

    <v-btn
      v-if="$vuetify.breakpoint.smAndDown"
      text
      block
      @click="SET_TWEET_DIALOG(true)"
      >View More Tweets</v-btn
    >
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import API from '../API';

export default {
  props: ['count'],
  data: () => ({
    items: [],
    loading: false,
    searchMetadata: {},
    endReached: false,
  }),
  async mounted() {
    this.loading = true;
    const { statuses, search_metadata: searchMetadata } = await API.getTweets({
      q: 'coronavirus ncov 2019ncov wuhan -filter:retweets',
      count: this.count || 10,
      result_type: 'recent',
      locale: 'en',
    });
    this.items = statuses;
    this.searchMetadata = searchMetadata;
    this.loading = false;
  },
  methods: {
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
          max_id: maxId,
        });
        this.items = [...this.items, ...statuses];
        this.searchMetadata = searchMetadata;
        this.loading = false;
      } else {
        this.endReached = true;
      }
    },
    ...mapMutations(['SET_TWEET_DIALOG']),
  },
};
</script>

<style>
.urlify {
  text-decoration: none;
}
</style>
