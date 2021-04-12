import React, {useEffect, useState} from 'react';
import { Info, Chart, USMap, Calendar,Maps, News} from '../components';
import styles from "../App.module.css";
import { fetchAllStatesByDate, fetchData, fetchUSByDate } from '../api';
import SearchPage from '../components/SearchBar/SearchPage.js';
import {Route} from "react-router-dom";
const home = () => {
    return (
        <div className={styles.container}>
            <Maps/>
            {/* <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a> */}
        </div>
    )
}
export default home;