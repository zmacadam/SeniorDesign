import React from 'react';
import {Combine} from '../components';
import styles from "../App.module.css";
const home = () => {
    return (
        <div className={styles.container}>
            <Combine />
            {/* <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a> */}
        </div>
    )
}
export default home;