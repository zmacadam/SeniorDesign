import React, { useEffect, useState } from 'react';
import { Info, Chart, USMap, Calendar,Maps} from './components';
import './App.css';
import styles from './App.module.css';
import { fetchAllStatesByDate, fetchData, fetchUSByDate } from './api';
import SearchPage from './components/SearchBar/SearchPage.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from './pages/home';

const App = () => {
    return (
        <Router>
            <div className={styles.container}>
                <Route exact path ='/' component={home}/>

            </div>
        </Router>
    );
}

export default App;
