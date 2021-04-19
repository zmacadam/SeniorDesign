import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sticky from 'react-sticky-el';
import { News } from '../index';

const Infos = ( {nbdate,sname} ) => (
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
                  <News nbdate={nbdate} sname={sname} />
                </h1>
              </Sticky>
            </div>
          </p>
      </TabPanel>
      <TabPanel>
        <p>
          <div className="text-center reverse-color">
            <div className="cdc-nav-dropdown dropup">
              <button data-flip="false" className="btn btn-secondary dropdown-toggle" type="button"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select State / Territory
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style="">
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://alcovidvaccine.gov/"
                   target="_blank">Alabama</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/VaccineInfo.aspx" target="_blank">Alaska</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://www.americansamoa.gov/"
                   target="_blank">American Samoa</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-find-vaccine"
                   target="_blank">Arizona</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.healthy.arkansas.gov/programs-services/topics/covid-19-vaccination-plan"
                   target="_blank">Arkansas</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://myturn.ca.gov/"
                   target="_blank">California</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://covid19.colorado.gov/for-coloradans/vaccine/where-can-i-get-vaccinated"
                   target="_blank">Colorado</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://portal.ct.gov/Coronavirus/covid-19%20vaccinations" target="_blank">Connecticut</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://coronavirus.delaware.gov/vaccine/where-can-i-get-my-vaccine/"
                   target="_blank">Delaware</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://coronavirus.dc.gov/vaccinatedc" target="_blank">District of Columbia</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://floridahealthcovid19.gov/vaccines/vaccine-locator/" target="_blank">Florida</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://dph.georgia.gov/covid-vaccine" target="_blank">Georgia</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://dphss.guam.gov/covid-19-vaccinations/" target="_blank">Guam</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://hawaiicovid19.com/vaccine/" target="_blank">Hawaii</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://healthandwelfare.idaho.gov/covid-19-vaccination" target="_blank">Idaho</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://coronavirus.illinois.gov/s/vaccination-location" target="_blank">Illinois</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.coronavirus.in.gov/vaccine/index.htm" target="_blank">Indiana</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://coronavirus.iowa.gov/pages/vaccineinformation" target="_blank">Iowa</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.kansasvaccine.gov/160/Find-My-Vaccine" target="_blank">Kansas</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://govstatus.egov.com/kentucky-vaccine-map" target="_blank">Kentucky</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://ldh.la.gov/covidvaccine-locations/" target="_blank">Louisiana</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.maine.gov/covid19/vaccines/vaccination-sites" target="_blank">Maine</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://coronavirus.maryland.gov/pages/vaccine" target="_blank">Maryland</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="http://rmihealth.org/"
                   target="_blank">Marshall Islands</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.mass.gov/info-details/covid-19-vaccine-locations-for-individuals-currently-eligible-to-be-vaccinated"
                   target="_blank">Massachusetts</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.michigan.gov/coronavirus/0,9753,7-406-98178_103214_104822---,00.html"
                   target="_blank">Michigan</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.fsmgov.org/index.html" target="_blank">Micronesia</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://mn.gov/covid19/vaccine/find-vaccine/index.jsp" target="_blank">Minnesota</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://covidvaccine.umc.edu/"
                   target="_blank">Mississippi</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://covidvaccine.mo.gov/map/"
                   target="_blank">Missouri</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://dphhs.mt.gov/publichealth/cdepi/diseases/coronavirusmt/covid19vaccineavailability"
                   target="_blank">Montana</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://dhhs.ne.gov/Pages/FinishStrong.aspx" target="_blank">Nebraska</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.immunizenevada.org/county-specific-covid-19-vaccine-plan"
                   target="_blank">Nevada</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://www.vaccines.nh.gov/"
                   target="_blank">New Hampshire</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://covid19.nj.gov/pages/vaccine" target="_blank">New Jersey</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://cv.nmhealth.org/covid-vaccine/" target="_blank">New Mexico</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://covid19vaccine.health.ny.gov/" target="_blank">New York</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://covid19.ncdhhs.gov/findyourspot" target="_blank">North Carolina</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.health.nd.gov/covidvaccinelocator" target="_blank">North Dakota</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://www.vaccinatecnmi.com/"
                   target="_blank">Northern Mariana Islands</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://vaccine.coronavirus.ohio.gov/" target="_blank">Ohio</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://vaccinate.oklahoma.gov/"
                   target="_blank">Oklahoma</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.oregon.gov/oha/covid19/Pages/vaccine-information-by-county.aspx"
                   target="_blank">Oregon</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="http://www.palauhealth.org/"
                   target="_blank">Palau</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.health.pa.gov/topics/disease/coronavirus/Pages/Vaccine.aspx"
                   target="_blank">Pennsylvania</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.vacunatepr.com/covid-19" target="_blank">Puerto Rico</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer" href="https://covid.ri.gov/vaccination"
                   target="_blank">Rhode Island</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://scdhec.gov/covid19/covid-19-vaccine/covid-19-vaccine-appointments" target="_blank">South
                  Carolina</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://doh.sd.gov/COVID/Vaccine/ProviderMap/default.aspx" target="_blank">South Dakota</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://covid19.tn.gov/stay-informed/blogs/tdh-county-health-departments-offer-covid-19-vaccination-by-appointment/"
                   target="_blank">Tennessee</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.dshs.state.tx.us/coronavirus/immunize/vaccine-hubs.aspx" target="_blank">Texas</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://coronavirus.utah.gov/vaccine/" target="_blank">Utah</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.covid19usvi.com/vaccines" target="_blank">U.S. Virgin Islands</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.healthvermont.gov/covid-19/vaccine/getting-covid-19-vaccine"
                   target="_blank">Vermont</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.vdh.virginia.gov/covid-19-vaccine/" target="_blank">Virginia</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.doh.wa.gov/Emergencies/COVID19/vaccine" target="_blank">Washington</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://dhhr.wv.gov/COVID-19/Pages/Vaccine.aspx" target="_blank">West Virginia</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://www.dhs.wisconsin.gov/covid-19/vaccine-get.htm" target="_blank">Wisconsin</a>
                <a className="dropdown-item noLinking" rel="noopener noreferrer"
                   href="https://health.wyo.gov/publichealth/immunization/wyoming-covid-19-vaccine-information/county-covid-19-vaccine-information/"
                   target="_blank">Wyoming</a>
              </div>
            </div>
          </div>
        </p>

      </TabPanel>
    </Tabs>
  </div>
);
export default Infos;
