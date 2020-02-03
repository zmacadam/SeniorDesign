<template>
  <v-card tile flat>
    <v-card-title>
      <span class="title font-weight-light">Timeline (GMT)</span>
    </v-card-title>
    <v-tabs fixed-tabs v-model="tab" show-arrows slider-color="white">
      <v-tab v-for="(item, idx) in items" :key="idx">
        {{ item.date }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, idx) in items" :key="idx">
        <v-card flat>
          <v-card-text>
            <ul>
              <li v-for="(time, timeIdx) in item.time" :key="timeIdx">
                {{ time.time_and_description }}
                (<a
                  class="white--text"
                  :href="time.source"
                  target="_BLANK"
                  style="text-decoration: none;"
                  >Source</a
                >)
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import API from '../API';

export default {
  data: () => ({
    items: [],
    tab: null,
  }),
  async mounted() {
    this.items = await API.getTimeline();
  },
};
</script>

<style scoped>
.v-tab--active {
  color: #fff;
}
</style>
