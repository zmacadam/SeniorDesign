import React from 'react';
import d3tip from 'd3-tip';
import * as topojson from "topojson-client/src";
import * as d3 from 'd3';
import {fetchCountyByDate} from '../../api/';
import axios from "axios";

// import Info from '../Cards/Cards.jsx';

class USMap extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            us: null,
            county: null
        }
    }

    UNSAFE_componentWillMount() {
        var url1 = axios.get("https://raw.githubusercontent.com/BiKunTin/datastore/main/us-counties.topojson");
        // var url1 = axios.get('../us-counties.topojson');
        Promise
            .all([url1])
            .then((us) => {
                // console.log("haha");
                //  console.log(us[0].data);
                this.setState({
                    us: us[0].data
                });
            });
    }

    componentDidUpdate() {
        let test = new Date();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        test = yyyy + '-' + mm + '-' + 22;
        const margin = {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            };
        let curstate;
//         let stateColor = this.props.stateColor;

        let stateColorCases = d3.scaleThreshold() //blues
            .domain([10001, 50001, 100001, 250000, 250001])
            .range(['#AAFFFC', '#66D9FF', '#44ABFF', '#2372FF', '#052FFF']);

        let stateColorRecovered = d3.scaleThreshold() //greens
                    .domain([10001, 50001, 100001, 250000, 250001])
                    .range(['#BBFF52', '#53DF31', '#27BF2A', '#1E9F3E', '#178048']);

//         let stateColorDeaths = d3.scaleThreshold() //stateColor for now but change to stateColorDeaths**
        let stateColor = d3.scaleThreshold() //reds
            .domain([10001, 50001, 100001, 250000, 250001])
            .range(['#e2ecfa', '#db8e98', '#ee404d', '#9b0707', '#690506']);

        var countyColor = d3.scaleThreshold()
            .domain([101, 1001, 10001, 50001, 100001])
            .range(['#e2ecfa', '#db8e98', '#ee404d', '#9b0707', '#690506'])
        let width = 960 - margin.left - margin.right;
        let height = 600- margin.left - margin.right;
        let active = d3.select(null);
        // console.log(width);
        const svg = d3.select(this.myRef.current)
            .append('svg')
            .attr('class', 'center-container')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);
        const us = this.state.us;
        const statedata = this.props.statedata;
        const cond = this.props.cond;

//         const cond = Info.cond;

         console.log(cond);

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
        const g =svg.append("g")
            .attr('class', 'center-container center-items us-state')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        const counties =topojson.feature(us, us.objects.counties).features;
        const states =topojson.feature(us, us.objects.states).features;
        states.forEach(function (f) {
            f.props = statedata.states.find(function (d) {
                // console.log(d.fips + "@@" + f.id);
                return d.fips*1000/1000 === f.id })

        })
        g.append("g")
            .attr("id", "counties")
            .selectAll("path")
            .data(counties)
            .enter().append("path")
            .attr("d", path)
            .style('fill', function (d) {
                if(d.props)
                {
                    // console.log(d.props.name);
                    // return countyColor(d.props.stats[0].cases)
                    return "#e2ecfa";
                } })
            .attr("class", "county-boundary")
            .on("click", reset)
            .on("mouseover", function(d)
            {
                countytip.show(d,this);
            })
            .on("mouseout", function(d)
            {
                countytip.hide(d,this);
            });
        g.append("g")
            .attr("id", "states")
            .selectAll("path")
            .data(states)
            .enter().append("path")
            .style('fill', function (d) {
                if(d.props)
                {
                    // console.log(d.props.name);
                    return stateColor(d.props.stats[0].cases)
                } })
            .attr("d", path)
            .attr("class", "state")
            .on("click", clicked)
            .on("mouseover", function(d)
            {
                statetip.show(d,this);
            })
            .on("mouseout", function(d)
            {
                statetip.hide(d,this);
            });

        // console.log(g.attr("class", "state"));
        g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            }))
            .attr("id", "state-borders")
            .attr("d", path);

        const statetip = d3tip()
            .attr('class', 'd3-tip')
            .offset([140, 140])
            .html(function(d) {
                if(cond === 'cases' && d.props)
                {
                    return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                        "State: "  + d.props.name + "<br/>" +
                        "Cases: " +  d.props.stats[0].cases + "<br/>" +
                        "</div>";
                }
                else if(cond === 'recovered' && d.props){
                }
                else if(cond === 'deaths' && d.props){
                }
                else if(cond === 'vaccinations' && d.props){
                }
                else if(cond === 'hospitalizations' && d.props){
                }
                else
                {
                    return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                        "State: "  + d.id + "<br/>" +
                        "Cases: "  + 0 + "<br/>" +
                        "</div>";
                }
            });
        g.call(statetip);
        const countytip = d3tip()
            .attr('class', 'd3-tip')
            .offset([140, 140])
            .html(function(d) {
                // console.log(d);
                if(cond === 'cases' && d.props)
                {
                    g.selectAll("path")
                        .style('fill', function (d) {
                            if(d.props && parseInt(d.id/1000) === curstate)
                            {

                                // console.log(d.id + "@@" + d.props.name);
                                // return countyColor(d.props.stats[0].cases)
                                return countyColor(d.props.stats[0].cases)
                            }
                        })
                    return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                        "State: "  + d.props.name + "<br/>" +
                        "Cases: "  + d.props.stats[0].cases + "<br/>" +
                        "</div>";
                }
                else
                {
                    return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                        "State: "  + d.id + "<br/>" +
                        "Cases: "  + 0 + "<br/>" +
                        "</div>";
                }
            });
        g.call(countytip);
        let county;

        function clicked(d) {
            // console.log("here");
            if(d.props)
            {
                async function updatedata() {
                    county = await fetchCountyByDate(d.props.name, test);
                    // console.log(county);
                    // console.log(d.id*1000/1000);
                    counties.forEach(function (f) {
                        // console.log(parseInt(f.id/1000));
                        curstate = parseInt(d.id)
                        if(parseInt(f.id/1000) === d.id*1000/1000)
                        {
                            f.props = county.state.counties.find(function (e) {
                                // console.log(e.fips + "@@" + f.id);
                                return e.fips*1000/1000 === f.id })
                            // console.log(f.props.stats[0].cases);
                        }
                    })
                }
                updatedata();
                // tip.show(d);
                // console.log("ok");
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
                    .duration(750)
                    .style("stroke-width", 1.5 / scale + "px")
                    .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
            }
        }

        function reset() {
            active.classed("active", false);
            active = d3.select(null);

            g.transition()
                .delay(100)
                .duration(750)
                .style("stroke-width", "1.5px")
                .attr('transform', 'translate('+margin.left+','+margin.top+')');
            g.selectAll("path")
                .style('fill', function (d) {
                    if(d.props)
                    {
                        return stateColor(d.props.stats[0].cases)
                    } })
        }
    }

    render() {
        const {us} = this.state;
        if (!us) {
            return null;
        }

        return <g ref={this.myRef}/>;
    }
}

export default USMap;