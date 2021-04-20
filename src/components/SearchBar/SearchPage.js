import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CountyList from './CountyList';
import { Info, Chart, USMap, News } from '../../components';


const stateData = require('./StateData.json');
// const countyData = require('./CountyData.json');

const SearchPage = ({cond, setCond}) => {
  const [input, setInput] = useState('');
  const [countyListDefault, setCountyListDefault] = useState();
  const [countyList, setCountyList] = useState();
  //const [cond, setCond] = useState(null);

  const fetchData = async () => {
    setCountyList(stateData.data)
    setCountyListDefault(stateData.data)
  }

    /* 
  * onSearchBlur 
  * Triggers on SearchBar blur event
  */
  const onSearchBlur = function(input) {
    stateZoom(input);
  }

  /* 
  * onSearchKeyUp 
  * Triggers on SearchBar onKeyUp event
  */
  const onSearchKeyUp = function(e) {
    if(e.key === "Enter") {
      e.target.blur();
    }
  }

  /** 
  * stateZoom 
  * Zoom into state on USMap. Takes search string as input.
  * Input syntax: "[STATE] [CONDITION]"
  * where STATE is any U.S. state (case insensitive)
  * and CONDITION is the data type to search for eg. "deaths" (case insensitive)
  */
  const stateZoom = function(input) {
    var state_str = input.slice(0, input.indexOf(' ')).toLowerCase(); // first word of input
    var cond_str = input.slice(input.indexOf(' ')+1).toLowerCase(); // all remaining words of input
    var state;
    if(cond_str) {
      setCond(cond_str);
    }
    if(state_str){
      setTimeout(() => { state = document.getElementById(state_str); state.dispatchEvent(new Event('click')); }, 1000);
    }
  }

  /* 
  * updateInput 
  * Set the list of suggested options in CountyList that appears under SearchBar
  * Triggered on SearchBar onChange event
  */
  const updateInput = async (input) => {
     const filtered = countyListDefault.filter(county => {
      return county.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setCountyList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <SearchBar 
       input={input} 
       onChange={updateInput}
       onBlur={onSearchBlur}
       onKeyPress={onSearchKeyUp}
      />
      <CountyList countyList={countyList}/>
    </>
   );
}

export default SearchPage
