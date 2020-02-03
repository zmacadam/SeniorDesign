<template>
  <v-card tile flat>
    <v-card-title>
      <span class="title font-weight-light">Timeline (GMT)</span>
    </v-card-title>
    <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
  >
    <template v-slot:item.source="{ item }">
      <a target="_BLANK" style="text-decoration: none;" class="white--text" :href="item.source">
        Source
      </a>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
import API from '../API';

export default {
  data: () => ({
    items: [],
    tab: null,
    loading: false,
    headers: [
      { text: 'Date', value: 'date' },
      { text: 'Time and Description', value: 'time_and_description', width: '50%' },
      { text: '', value: 'source', sortable: false },
    ],
  }),
  async mounted() {
    this.loading = true;
    const data = await API.getTimeline();
    data.forEach((item) => {
      const times = item.time.map(i => ({
        ...i,
        date: item.date,
      }));
      this.items = [...this.items, ...times];
    });
    this.loading = false;
  },
};
</script>

<style scoped>
.v-tab--active {
  color: #fff;
}
</style>
