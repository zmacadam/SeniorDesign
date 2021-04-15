import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {News} from "../index";
const Infos = () =>
{
    return (
        <div style={{ margin: "20px" }}>
            <Tabs>
                <TabList>
                    <Tab>News</Tab>
                    <Tab>More Info</Tab>
                </TabList>

                <TabPanel>
                    <p>
                        <News nbdate={"2021-04-04"} />
                    </p>

                </TabPanel>
                <TabPanel>
                    <p>
                        Implement here.
                    </p>

                </TabPanel>
            </Tabs>
        </div>
    )

}
export default Infos;