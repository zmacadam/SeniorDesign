<template>
  <div class="home">
    <div class='stat-div-div'>
      <div class='stat-div'>
        <div class='stat-div-title'>Total Cases</div>
        <div class='stat-div-value-change negative'>+66,794</div>
        <div class='stat-div-value negative'>25,486,941</div>
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
      <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" placeholder="What are you looking for?">
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
};


</script>

<style lang="scss">

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
    color:$primary;
}

.negative {
    color: red;
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
  border: 3px solid $primary;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: $primary;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid $primary;
  background: $primary;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
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
  background-color: $primary;
  border:solid black 1px;
  color:whitesmoke;
  padding: 5px;

}
</style>
