import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CountyList from './CountyList';

const stateData = require('./StateData.json');
const countyData = require('./CountyData.json');

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [countyListDefault, setCountyListDefault] = useState();
  const [countyList, setCountyList] = useState();
  

  const fetchData = async () => {
    setCountyList(stateData.data)
    setCountyListDefault(stateData.data)
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
      />
      <CountyList countyList={countyList}/>
    </>
   );
}

export default SearchPage
