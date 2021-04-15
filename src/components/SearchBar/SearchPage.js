import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CountyList from './CountyList';

const stateData = require('./StateData.json');
// const countyData = require('./CountyData.json');

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [countyListDefault, setCountyListDefault] = useState();
  const [countyList, setCountyList] = useState();
  

  const fetchData = async () => {
    setCountyList(stateData.data)
    setCountyListDefault(stateData.data)
  }

  const onSearchBlur = function(input) {
    stateZoom(input);
  }

  const onSearchKeyUp = function(e) {
    if(e.key === "Enter") {
      e.target.blur();
    }
  }

  const stateZoom = function(input) {
    var state;
    if(input) {
      state = document.getElementById(input);
    }
    if(state){
      state.dispatchEvent(new Event('click'));
    }
  }

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
