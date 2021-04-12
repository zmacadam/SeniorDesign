import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap, Calendar,Maps, Nav} from './components';
import './App.css';
import styles from './App.module.css';
import { fetchAllStatesByDate, fetchData, fetchUSByDate } from './api';
import SearchPage from './components/SearchBar/SearchPage.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from './pages/home';
import About from './pages/About';
import Symptom from './pages/Symptom';
import Vaccine from './pages/Vaccine';

const App = () => {
    return (
        <Router>
            <div>
                <Nav/>
                <br />
                <Switch>
                    <Route exact path ='/' component={home}/>
                    <Route path="/symptom" component={Symptom} />
                    <Route path="/vaccine" component={Vaccine} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
