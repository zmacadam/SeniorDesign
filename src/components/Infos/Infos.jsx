import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sticky from 'react-sticky-el';
import { News } from '../index';

const Infos = ( nbdate ) => (
  <div style={{ margin: '20px' }}>
    <Tabs>
      <TabList>
        <Tab>News</Tab>
        <Tab>Vaccination Site</Tab>
      </TabList>

      <TabPanel>
          <p>
            <div className="scrollarea" style={{height: '500px', width: '400px', overflow: 'scroll'}}>
              <Sticky scrollElement=".scrollbar">
                <h1>
                  <News nbdate={nbdate.nbdate} />
                </h1>
              </Sticky>
            </div>
          </p>
      </TabPanel>
      <TabPanel>
        <p>
          Implement here.
        </p>

      </TabPanel>
    </Tabs>
  </div>
);
export default Infos;
