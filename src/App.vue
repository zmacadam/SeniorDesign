<template>
  <div class="home">
    <div class='stat-div-div'>
      <div class='stat-div'>
        <div class='stat-div-title'>Total Cases</div>
        <div class='stat-div-value-change normal'>+66,794</div>
        <div class='stat-div-value normal'>25,486,941</div>
      </div>
      <div class='stat-div'>
        <div class='stat-div-title'>Total Deaths</div>
        <div class='stat-div-value-change negative'>+935</div>
        <div class='stat-div-value negative'>424,925</div>
      </div>
      <div class='stat-div'>
        <div class='stat-div-title'>Hospitilized</div>
        <div class='stat-div-value-change positive'>-2,655</div>
        <div class='stat-div-value positive'>113,609</div>
      </div>
    </div>
    <div class='map-info-header'>
      <div class='map-div'>
        <div class='map-settings-div'>
          <div class='map-setting'>Cases</div>
          <div class='map-setting'>Vaccine Distribution</div>
          <div class='map-setting'>Vaccination</div>
          <div class='map-setting'>Active</div>
          <div class='map-setting'>New Daily Cases</div>
          <div class='map-setting'>Unemployment</div>
        </div>
      </div>
    </div>
     <div id ="chartss" class="Chart" style="margin-left: 20%">
      <h1 style="text-align:center;">Linechart</h1>
      <line-example/>
    </div>
    <br>
    <div class="left">
        <h3 style="display:inline-block; margin-left: 40%">COVID-19 DATA AS OF  </h3><input style="display:inline-block; margin-left: 1%" id="d0" type="date" min="2020-01-22" value="2020-11-14">
        <div class='my-legend'>
            <div class='legend-scale' style="display: block; margin-left: 29%">
                <ul class='legend-labels'>
                <li><span id="legend1" style='background:#e2ecfa;color:white;'>0 - 10,000</span></li>
                <li><span id="legend2" style='background:#db8e98;color:white;'>10,001 - 50,000</span></li>
                <li><span id="legend3" style='background:#ee404d;color:white;'>50,001 - 100,000</span></li>
                <li><span id="legend4" style='background:#9b0707;color:white;'>100,001 - 250,000</span></li>
                <li><span id="legend5" style='background:#690506;color:white;'>250,000+</span></li>
            </ul>
            </div>
        </div>
        <form autocomplete="off" onsubmit="return false">
            <div style="margin-left:47%">
                <div class="wrap">
                <div class="search" style="margin-left:-47%">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?">
                </div>
        </div>
                <input type="submit" value="Search" onclick="(initialize().zoomToState(document.getElementById('myInput').value))">
            </div>
        </form>
        <svg style="display:block; margin:auto;"></svg>
    </div>
      <div id="container" style="margin-left:10%">
        <div id="mapContainer"></div>
      </div>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

$primary: green;

body{
  background: #333;
  font-family: 'Roboto', sans-serif;
}

.stat-div-div {
    display:flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.stat-div {
    border-radius: 4px;
    box-shadow: 2px 2px 5px black;
    padding: 10px;
    margin:1em;
    background-color: whitesmoke;
    color: #333;
}

.stat-div-title {
    font-weight: bold;
    font-size: 1.2em;
}

.stat-div-value-change, .stat-div-value {
    /*font-weight:bold;*/
}

.positive {
    color: green;
}

.negative {
    color: red;
}

.normal {
    color: blue;
}

.map-info-header {
  display:flex;
  justify-content: center;
  flex-wrap:nowrap;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 4px solid red;
  padding: 5px;
  height: 20px;
  border-radius: 10px 0 0 10px;
  outline: none;
  color: #4727d4;
}

.searchTerm:focus{
  color: red;
}


/*Resize the wrap to see the search bar change!*/
.wrap{
  /*
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  */
  display:block;
  position:relative;
  margin-left:2em;
  width:300px;
}

.map-settings-div {
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.map-setting {
  background-color: green;
  border:solid black 1px;
  color:whitesmoke;
  padding: 5px;
}
.my-legend .legend-title {
  text-align: center;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 90%;
  }
.my-legend .legend-scale ul {
    margin: 0;
    padding: 0;
    float: left;
    list-style: none;
}
.my-legend .legend-scale ul li {
    display: block;
    float: left;
    width: 150px;
    margin-bottom: 6px;
    text-align: center;
    font-size: 80%;
    list-style: none;
}
.my-legend ul.legend-labels li span {
    display: block;
    float: left;
    height: 15px;
    width: 150px;
}
.my-legend .legend-source {
    font-size: 70%;
    color: #999;
    clear: both;
    text-align: center;
}
.my-legend a {
    color: #777;
}
.Chart {
    padding: 5px;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, .4);
    border-radius: 5px;
    margin: 20px 0;
  }
  #chartss {
  width: 50vw;
  height: 50vh;
}
</style>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import data from "./usa.json";
import LineExample from './LineExample'
//import axios from "axios";
if('geolocation' in navigator) {
  console.log('geo avai');
} else {
  console.log('geo not avai');
}
var lat,long;
navigator.geolocation.getCurrentPosition((position) => {
  //doSomething(position.coords.latitude, position.coords.longitude);
  console.log(position);
  lat = position.coords.latitude;
  long = position.coords.longitude;
  console.log(lat.toFixed(2));
  console.log(long.toFixed(2));
});
export default {
  components:
  {
    LineExample
  },
  name: "Map API",
  data() {
    return {
      dataPoints: null,
      height: 20,
      center: [37.72, -97.35],
      data: [],
      map: null,
      clientSecret: "FTZGMLOIQWFY3A0ELEZIZSUU3M4EKOJKEPXKWUWTMWK1EY4H",
      clientID: "GOSFGAOZKCSLMWADY1ORYJV2A4GUNNHAHBVWY500S1IM42CS",
    };
  },
  methods: {
    setupLeafletMap () {
      this.map = L.map("mapContainer").setView(this.center, 5);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken:
            "pk.eyJ1IjoiYWJpZGlzaGFqaWEiLCJhIjoiY2l3aDFiMG96MDB4eDJva2l6czN3MDN0ZSJ9.p9SUzPUBrCbH7RQLZ4W4lQ",
          maxBoundsViscosity: 1.0,
          minZoom: 4
        }
        
      ).addTo(this.map);
      L.marker([31.5, -92]).addTo(this.map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

      L.geoJSON(data , {
        onEachFeature: this.onEachFeature,
        highlightFeature: this.highlightFeature,
        style: this.styleMap,
      })
      .addTo(this.map)
    },
    styleMap(feature){
      const casex = feature.properties.cases;
          let color = "brown";
          if(casex >=0 && casex <=10000) color = "#e2ecfa";
          if(casex >=10001 && casex <=50000) color = "#db8e98";
          if(casex >=50001 && casex <100000)  color = "#ee404d";
          if(casex >=100001 && casex <250000) color = "#9b0707";
          if(casex >=250001) color ="#690506";
          return { color: color };
    },
    onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup("State: " + feature.properties.name + "<br/>" +
                        "Total Cases: " + feature.properties.cases + "<br/>" +
                        "Total Deaths: " + feature.properties.deaths + "<br/>"+
                        "Confirmed Cases: " + feature.properties.confirmed_cases + "<br/>"+
                        "Confirmed Death: " + feature.properties.confirmed_deaths + "<br/>");
        this.map.doubleClickZoom.disable(); 
        layer.on('mouseout', () => { layer.closePopup(); });
        layer.on('click', () => { this.map.fitBounds(layer.getBounds()); });
        layer.on('mouseover', () => { layer.openPopup(); });
        layer.on('contextmenu', () => { this.map.setView(this.center, 5);});
      }
    },
    increaseHeight () {
        this.height += 10
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData () {
        this.dataPoints = {
          labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      }
  },
  mounted() {
    setInterval(() => {
        this.fillData()
      }, 2000)
    this.setupLeafletMap();
  },
  computed: {
      myStyles () {
        return {
          height: `${this.height}px`,
          position: 'relative'
        }
      }
    }
};
</script>

<style scoped>
#container {
  display: flex;
}
#mapContainer {
  width: 80vw;
  height: 80vh;
}
</style>