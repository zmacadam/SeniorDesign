import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap, News } from '../../components';

const countyList = ({countyList=[]}) => {
  return (
    <datalist id='county-list'>
    { countyList.map((data,index) => {
        if (data) {
          return (
            <option key={data}>
              {data}
            </option>
    	   )	
    	 }
    	 return null
    }) }
    </datalist>
  );
}

export default countyList