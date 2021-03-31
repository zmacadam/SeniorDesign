import React from 'react';

const SearchBar = ({input:keyword, onChange:updateInput}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="1234"
     value={keyword}
     placeholder={"search for state"}
     list="county-list"
     onChange={(e) => updateInput(e.target.value)}
    />
  );
}

export default SearchBar
