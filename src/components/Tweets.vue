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
          <div style="margin-left: 95px;" class="mt-5">
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
  </div>
</template>

<script>
import moment from 'moment';
import API from '../API';

export default {
  data: () => ({
    items: [],
    loading: false,
    searchMetadata: {},
  }),
  async mounted() {
    this.loading = true;
    const { statuses, search_metadata: searchMetadata } = await API.getTweets({
      q: 'coronavirus ncov 2019ncov wuhan -filter:retweets',
      count: 10,
      result_type: 'recent',
    });
    this.items = statuses;
    this.searchMetadata = searchMetadata;
    this.loading = false;
  },
  methods: {
    async loadMore() {
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
      }
    },
  },
  filters: {
    fromNow(val) {
      return moment(val, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow();
    },
    URLify(val) {
      return val.replace(
        /((http|https|ftp):\/\/[\w?=&./-;#~%-]+(?![\w\s?&./;#~%"=-]*>))/g,
        '<a class="urlify" href="$1" target="_BLANK">$1</a> ',
      );
    },
  },
};
</script>

<style>
.urlify {
  text-decoration: none;
}
</style>
