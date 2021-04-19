import React, {useState, useEffect, useRef} from 'react';
import d3tip from 'd3-tip';
import * as topojson from "topojson-client/src";
import * as d3 from 'd3';
import {fetchAllStatesByDate, fetchUSByDate, fetchCountyByDate} from '../../api/';
import axios from "axios";
import {Chart, Infos} from "../index";
import range from 'lodash/range';
import {getMonth, getYear} from 'date-fns';
import '../../App.css';
import styles from '../../App.module.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'add-days';
import SearchPage from '../../components/SearchBar/SearchPage.js';
import {Grid} from '@material-ui/core';
import {reset} from "react-tabs/lib/helpers/uuid";

const USMaps = ({date, cond}) => {
    const [check2, setcheck2] = useState(false);
    function activatelayer() {
        setcheck2(check2 => check2 == false ? true : false);
    }
    const [sname, setsname] = useState("USA");
    const [snamestate, setsnamestate] = useState(null);
    const myRef = useRef(null);
    const [data, setData] = useState(null);
    const [statedata, setMapData] = useState(null);
    const [us, setus] = useState(null);
    const [check, setcheck] = useState(false);
    const [check1, setcheck1] = useState(false);
    // const [cond, setCond] = useState(null);
    let stateColorCases = d3.scaleThreshold() //blues
        .domain([10001, 50001, 100001, 250000, 250001])
        .range(['#AAFFFC', '#66D9FF', '#44ABFF', '#2372FF', '#052FFF']);

    let stateColorRecovered = d3.scaleThreshold() //greens
        .domain([10001, 50001, 100001, 250000, 250001])
        .range(['#dee5d1', '#91b588', '#76b378', '#1E9F3E', '#178048']);

    let stateColorDeaths = d3.scaleThreshold() //reds
        .domain([10001, 50001, 100001, 250000, 250001])
        .range(['#F08080', '#CD5C5C', '#FF0000', '#B22222', '#8b0000']);

    let stateColorVac = d3.scaleThreshold() //purples
        .domain([10001, 50001, 100001, 250000, 250001])
        .range(['#CCCEFF', '#ABAAFF', '#A388FF', '#A966FF', '#BC44FF']);

    let stateColorHosp = d3.scaleThreshold() //pinks
        .domain([10001, 50001, 100001, 250000, 250001])
        .range(['#F5CCFF', '#ffaaff', '#FF88F2', '#FF67CF', '#FF49A2']);

    let countyColorCases = d3.scaleThreshold() //blues
        .domain([10001, 50001, 100001, 250000, 250001])
        .range(['#AAFFFC', '#66D9FF', '#44ABFF', '#2372FF', '#052FFF']);

    let countyColorRecovered = d3.scaleThreshold() //greens
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#dee5d1', '#91b588', '#76b378', '#1E9F3E', '#178048']);

    let countyColorDeaths = d3.scaleThreshold() //reds
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#F08080', '#CD5C5C', '#FF0000', '#B22222', '#8b0000']);

    let countyColorVac = d3.scaleThreshold() //purples
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#CCCEFF', '#ABAAFF', '#A388FF', '#A966FF', '#BC44FF']);

    let countyColorHosp = d3.scaleThreshold() //pinks
        .domain([101, 501, 1001, 2500, 2501])
        .range(['#F5CCFF', '#FFAAFF', '#FF88F2', '#FF67CF', '#FF49A2']);
    let county = useRef(null);
    let counties = useRef(null);
    let states = useRef(null);
    let test1 = useRef(new Date());
    let checked = true;
    let curstate;
    let stateColor = null;
    let stage = useRef(0);
    let countyColor = null;
    const margin = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };
    let active = d3.select(null);

    useEffect(() => {
        const condDefault = 'cases';
        var url1 = axios.get("https://raw.githubusercontent.com/BiKunTin/datastore/main/us-counties.topojson");
        // var url1 = axios.get('../us-counties.topojson');
        Promise
            .all([url1])
            .then((usa) => {
                // ////console.log("haha");
                //  ////console.log(us[0].data);
                setus(us => usa[0].data);
            });
        test1 = test1.current.setDate(test1.current.getDate() - 3);
        // setCond((cond) => condDefault);
        setcheck(check => true);

    }, []);
    useEffect(() => {
        if (check && date) {
            let datas;
            let data3;

            async function updatedata() {
                // ////console.log(check + moment(test1.current).format('YYYY-MM-DD') + "@@" + date);
                if (date < moment(test1.current).format('YYYY-MM-DD'))
                    datas = await fetchUSByDate(date);
                else
                    datas = await fetchUSByDate(moment(test1.current).format('YYYY-MM-DD'));
                // datas = await fetchUSByDate("2021-04-04");
                if (date < moment(test1.current).format('YYYY-MM-DD'))
                    data3 = await fetchAllStatesByDate(date);
                else
                    data3 = await fetchAllStatesByDate(moment(test1.current).format('YYYY-MM-DD'));
                //data3 = await fetchAllStatesByDate("2021-04-04");
                setMapData((statedata) => data3);
                setData((data) => datas.stats[0]);
            }

            // ////console.log(data);
            updatedata();
        }
    }, [check]);

    useEffect(() => {
        const svg = d3.select(myRef.current);
        if (us && myRef.current && date && statedata && cond) {
            // ////console.log("@@" + moment(today).format('YYYY-MM-DD'));
            // ////console.log(date);
            // ////console.log(statedata);
            // ////console.log(cond);
            for (var i = 1; i < 100; i++) {
                svg.select("g").remove();
            }
            if (cond === 'cases') {
                stateColor = stateColorCases;
                countyColor = countyColorCases;
            } else if (cond === 'newcases') {
                stateColor = stateColorRecovered;
                countyColor = countyColorRecovered;
            } else if (cond === 'deaths') {
                stateColor = stateColorDeaths;
                countyColor = countyColorDeaths;
            } else if (cond === 'hospitalizations') {
                stateColor = stateColorHosp;
                countyColor = countyColorHosp;
            } else if (cond === 'vaccinations') {
                stateColor = stateColorVac;
                countyColor = countyColorVac;
            }


            let width = 960 - margin.left - margin.right;
            let height = 600 - margin.left - margin.right;
            // ////console.log(myRef.current);
            svg.append('svg')
                .attr('class', 'center-container')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right);


            svg.append('rect')
                .attr('class', 'background center-container')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right)
                .on('click', clicked);

            const projection = d3.geoAlbersUsa()
                .translate([width / 2, height / 2])
                .scale(width);

            const path = d3.geoPath()
                .projection(projection);
            // const div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
            const g = svg.append("g")
                .attr('class', 'center-container center-items us-state')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);
            // ////console.log(us);
            counties = topojson.feature(us, us.objects.counties).features;
            states = topojson.feature(us, us.objects.states).features;
            states.forEach(function (f) {
                // ////console.log(statedata);
                f.props = statedata.states.find(function (d) {
                    // ////console.log(d.fips + "@@" + f.id);
                    return d.fips * 1000 / 1000 === f.id
                })

            })
            // function createmap() {
            // ////console.log(g);
            // if(date<moment(test1).format('YYYY-MM-DD'))
            // {
            //     ////console.log(stage.current);
            //     d3.select('g').select('svg').remove();
            // }
            g.append("g")
                .attr("id", "counties")
                .selectAll("path")
                .data(counties)
                .enter().append("path")
                .attr("d", path)
                .attr("class", "county-boundary")
                .on("click", function(d)
                {
                    setsname(d.props.name);
                })
                .on("contexmenu",reset)
                .on("mouseover", function (d) {
                    // ////console.log('@@' + cond)
                    countytip.show(d, this);
                })
                .on("mouseout", function (d) {
                    countytip.hide(d, this);
                });
            g.append("g")
                .attr("id", "states")
                .selectAll("path")
                .data(states)
                .enter().append("path")
                .style('fill', function (d) {
                    async function updatedata() {
                        // ////console.log(moment(test1).format('YYYY-MM-DD'));

                        let stdata;
                        if (date < moment(test1.current).format('YYYY-MM-DD'))
                            stdata = await fetchAllStatesByDate(date);
                        else
                            stdata = await fetchAllStatesByDate(moment(test1.current).format('YYYY-MM-DD'));
                        // ////console.log(county);
                        // ////console.log(d.id*1000/1000);
                        // e.log('@@' + cond)
                        states.forEach(function (f) {
                            // ////console.log(date);
                            f.props = stdata.states.find(function (d) {
                                // ////console.log(d.fips + "@@" + f.id);
                                return d.fips * 1000 / 1000 === f.id
                            })

                        })
                    }

                    updatedata();
                    if (d.props && cond === 'cases') {
                        // ////console.log(d.props);
//                         ////console.log(d.props.name);
                        return stateColor(d.props.stats[0].cases);
                    } else if (d.props && cond === 'newcases') {
                        return stateColor(d.props.stats[0].newCases);
                    } else if (d.props && cond === 'deaths') {
                        return stateColor(d.props.stats[0].deaths);
                    } else if (d.props && cond === 'vaccinations') {
                        return stateColor(d.props.stats[0].peopleVaccinated);
                    } else if (d.props && cond === 'hospitalizations') {
                        return stateColor(d.props.stats[0].hospitalized);
                    } else {
                        return "black";
                    }

                })
                .attr("d", path)
                .attr("id", function (d) { // set id to lowercase state name eg. "texas"
                    if (d.props) {
                        return d.props.name.toLowerCase();
                    } else return "";
                })
                .attr("class", "state")
                .on("click", clicked)
                .on("mouseover", function (d) {
                    async function updatedata() {
                        let stdata;
                        if (date < moment(test1.current).format('YYYY-MM-DD'))
                            stdata = await fetchAllStatesByDate(date);
                        else
                            stdata = await fetchAllStatesByDate(moment(test1.current).format('YYYY-MM-DD'));

                        // ////console.log(county);
                        // ////console.log(d.id*1000/1000);
                        // ////console.log('@@' + cond)
                        states.forEach(function (f) {
                            f.props = stdata.states.find(function (d) {
                                // ////console.log(d.fips + "@@" + f.id);
                                return d.fips * 1000 / 1000 === f.id
                            })

                        })
                    }

                    updatedata();
                    statetip.show(d, this);
                })
                .on("mouseout", function (d) {
                    statetip.hide(d, this);
                });
            ////console.log("STATE:");
            ////console.log(g);

            // ////console.log(g.attr("class", "state"));
            g.append("path")
                .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                    return a !== b;
                }))
                .attr("id", "state-borders")
                .attr("d", path);
            // }
            // createmap();

            const statetip = d3tip()
                .attr('class', 'd3-tip')
                .offset([140, 140])
                .html(function (d) {
                    if (cond === 'cases' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Cases: " + d.props.stats[0].cases + "<br/>" +
                            "</div>";
                    } else if (cond === 'newcases' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "New Cases: " + d.props.stats[0].newCases + "<br/>" +
                            "</div>";
                    } else if (cond === 'deaths' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Deaths: " + d.props.stats[0].deaths + "<br/>" +
                            "</div>";
                    } else if (cond === 'vaccinations' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "People Vaccinated: " + d.props.stats[0].peopleVaccinated + "<br/>" +
                            "</div>";
                    } else if (cond === 'hospitalizations' && d.props) {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Hospitalized: " + d.props.stats[0].hospitalized + "<br/>" +
                            "</div>";
                    } else {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.id + "<br/>" +
                            "Cases: " + 0 + "<br/>" +
                            "</div>";
                    }
                });
            g.call(statetip);
            const countytip = d3tip()
                .attr('class', 'd3-tip')
                .offset([140, 140])
                .html(function (d) {
                    // ////console.log(d);
                    if (cond === 'cases' && d.props) {
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {

                                    // ////console.log(d.id + "@@" + d.props.name);
                                    // return countyColor(d.props.stats[0].cases)
                                    return countyColor(d.props.stats[0].cases)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Cases: " + d.props.stats[0].cases + "<br/>" +
                            "</div>";
                    } else if (cond === 'newcases' && d.props) {
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {

                                    // ////console.log(d.id + "@@" + d.props.name);
                                    // return countyColor(d.props.stats[0].cases)
                                    return countyColor(d.props.stats[0].newCases)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "New Cases: " + d.props.stats[0].newCases + "<br/>" +
                            "</div>";
                    } else if (cond === 'deaths' && d.props) {
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {

                                    // ////console.log(d.id + "@@" + d.props.name);
                                    // return countyColor(d.props.stats[0].cases)
                                    return countyColor(d.props.stats[0].deaths)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "Death: " + d.props.stats[0].deaths + "<br/>" +
                            "</div>";
                    } else if (cond === 'vaccinations' && d.props) {
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {

                                    // ////console.log(d.id + "@@" + d.props.name);
                                    // return countyColor(d.props.stats[0].cases)
                                    return countyColor(d.props.stats[0].peopleVaccinated)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "People Vaccinated: " + d.props.stats[0].peopleVaccinated + "<br/>" +
                            "</div>";
                    } else if (cond === 'hospitalizations' && d.props) {
                        g.selectAll("path")
                            .style('fill', function (d) {
                                if (d.props && parseInt(d.id / 1000) === curstate) {

                                    // ////console.log(d.id + "@@" + d.props.name);
                                    // return countyColor(d.props.stats[0].cases)
                                    return countyColor(d.props.stats[0].hospitalized)
                                }
                            })
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.props.name + "<br/>" +
                            "People Vaccinated: " + d.props.stats[0].hospitalized + "<br/>" +
                            "</div>";
                    } else {
                        return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                            "State: " + d.id + "<br/>" +
                            "Cases: " + 0 + "<br/>" +
                            "</div>";
                    }
                });
            g.call(countytip);

            function clicked(d) {
                // ////console.log("here");
                setcheck1(check1 => true);
                ////console.log(d);
                if (d.props) {
                    setsname(sname => d.props.name);
                    setsnamestate(snamestate=> d.props.name);
                    ////console.log(d.props.name);

                    async function updatedata() {
                        // if(date)
                        // {
                        //     d3.select('g').select('svg').exit().remove();
                        //     checked=false;
                        // }
                        if (date < moment(test1.current).format('YYYY-MM-DD'))
                            county = await fetchCountyByDate(d.props.name, date);
                        else
                            county = await fetchCountyByDate(d.props.name, moment(test1.current).format('YYYY-MM-DD'));
                        // ////console.log(d.id*1000/1000);
                        counties.forEach(function (f) {
                            // ////console.log(parseInt(f.id/1000));
                            curstate = parseInt(d.id)
                            if (parseInt(f.id / 1000) === d.id * 1000 / 1000) {
                                ////console.log(county);
                                f.props = county.state.counties.find(function (e) {
                                    // ////console.log(e.fips + "@@" + f.id);
                                    return e.fips * 1000 / 1000 === f.id
                                })
                                // ////console.log(f.props.stats[0].cases);
                            }
                        })
                    }

                    updatedata();
                    // tip.show(d);
                    // ////console.log("ok");
                    if (d3.select('.background').node() === this) return reset();

                    if (active.node() === this) return reset();

                    active.classed("active", false);
                    active = d3.select(this).classed("active", true);

                    var bounds = path.bounds(d),
                        dx = bounds[1][0] - bounds[0][0],
                        dy = bounds[1][1] - bounds[0][1],
                        x = (bounds[0][0] + bounds[1][0]) / 2,
                        y = (bounds[0][1] + bounds[1][1]) / 2,
                        scale = .9 / Math.max(dx / width, dy / height),
                        translate = [width / 2 - scale * x, height / 2 - scale * y];

                    g.transition()
                        .duration(800)
                        .style("stroke-width", 1.5 / scale + "px")
                        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
                }
            }

            function reset() {
                async function updatedata() {
                    setsname(sname => "USA");
                    setcheck1(check1 => false);
                    setcheck2(check2 => false);
                    setsnamestate(snamestate=>null);
                    let stdata;
                    if (date < moment(test1.current).format('YYYY-MM-DD'))
                        stdata = await fetchAllStatesByDate(date);
                    else
                        stdata = await fetchAllStatesByDate(moment(test1.current).format('YYYY-MM-DD'));

                    // ////console.log(county);
                    // ////console.log(d.id*1000/1000);
                    states.forEach(function (f) {
                        f.props = stdata.states.find(function (d) {
                            // ////console.log(d.fips + "@@" + f.id);
                            return d.fips * 1000 / 1000 === f.id
                        })
                    })
                }

                updatedata();
                active.classed("active", false);
                active = d3.select(null);

                g.transition()
                    .delay(100)
                    .duration(800)
                    .style("stroke-width", "1.5px")
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
                g.selectAll("path")
                    .style('fill', function (d) {
                        if (d.props && cond === 'cases') {
                            // ////console.log(d.props);
                            //                         ////console.log(d.props.name);
                            return stateColor(d.props.stats[0].cases);
                        } else if (d.props && cond === 'newcases') {
                            return stateColor(d.props.stats[0].newCases);
                        } else if (d.props && cond === 'deaths') {
                            return stateColor(d.props.stats[0].deaths);
                        } else if (d.props && cond === 'vaccinations') {
                            return stateColor(d.props.stats[0].peopleVaccinated);
                        } else if (d.props && cond === 'hospitalizations') {
                            return stateColor(d.props.stats[0].hospitalized);
                        }
                    })
            }
            window.oncontextmenu = function () {
                reset();
                return false;
            }
        }
        d3.select('svg').select('g').exit().remove();
    }, [us, myRef.current, cond, date]);
    if (!statedata) {
        return (
            <div>Loading...</div>
        );
    }
    return (
        <div>
            <br/>
            <div className={styles.container}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        {/* {data && date && <Chart nbdate={date} data={data} country="US" cond={cond} />} */}
                        {check2 ?
                            <Chart nbdate={date} country={sname} cond={cond} width={"600px"} height={"600px"}/> : null}
                    </Grid>
                    <Grid item xs={6}>
                        <div className={styles.details}>
                            {check1 ?
                                <button className={styles.button1} onClick={activatelayer}> Get Detail </button> : null}
                        </div>
                        <div className={styles.maps}>
                            <svg
                                className="d3-component"
                                width={900}
                                height={600}
                                ref={myRef}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        {check2 ? <Infos nbdate={date} sname={sname}/> : null}
                    </Grid>
                </Grid>
                < br/>
                {!check1 ?
                    <div className={styles.maps}>
                        <Chart nbdate={date} country={sname}  cond={cond} width={"950px"} height={"400px"}/>
                        {/* <p>Abc</p> */}
                    </div> : null}

            </div>
        </div>
    );
}

export default USMaps;