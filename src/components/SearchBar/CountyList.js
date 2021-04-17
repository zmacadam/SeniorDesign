import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap, News } from '../../components';

const countyList = ({countyList=[]}) => {
  return (
    <datalist id='county-list'>
    { countyList.map((data,index) => {
        if (data) {
          return (
            <div>
              <option key={data + " Cases"}>
                {data + " Cases"}
              </option>
              <option key={data + " New Cases"}>
                {data + " New Cases"}
              </option>
              <option key={data + " Deaths"}>
                {data + " Deaths"}
              </option>
              <option key={data + " Vaccinations"}>
                {data + " Vaccinations"}
              </option>
              
            </div>
            
    	   )	
    	 }
    	 return null
    }) }
    </datalist>
  );
}

export default countyList