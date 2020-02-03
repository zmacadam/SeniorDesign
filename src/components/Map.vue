<template>
  <l-map
    ref="map"
    style="z-index: 0; height: 100%; width: 100%"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-circle-marker
      @click="$emit('MARKER_CLICKED', l)"
      v-for="(l, idx) in locations"
      :key="idx"
      :lat-lng="[l.coordinates.lat, l.coordinates.lon]"
      color="red"
      fillColor="#f00"
      :fillOpacity="0.35"
      :stroke="false"
      :radius="20"
    />
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LCircleMarker } from 'vue2-leaflet';

export default {
  name: 'Map',
  props: ['locations'],
  data: () => ({
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    zoom: 4,
    center: [47.41322, -1.219482],
    bounds: null,
  }),
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    flyTo(lat, lon) {
      this.$refs.map.mapObject.flyTo([lat, lon]);
    },
  },
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
  },
};
</script>
