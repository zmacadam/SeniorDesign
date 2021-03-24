import React from 'react';
import d3tip from 'd3-tip';
import * as topojson from "topojson-client/src";
import * as d3 from 'd3';

import axios from "axios";
class USMap extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            us: null
        }
    }

    componentWillMount() {
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
        const margin = {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            };
        let width = 960 - margin.left - margin.right;
        let height = 600- margin.left - margin.right;
        let active = d3.select(null);
        console.log(width);
        const svg = d3.select(this.myRef.current)
            .append('svg')
            .attr('class', 'center-container')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);
        const us = this.state.us;
        // console.log("here");
        // console.log(us);
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
        const div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
        const g =svg.append("g")
            .attr('class', 'center-container center-items us-state')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        const counties =topojson.feature(us, us.objects.counties).features;
        const states =topojson.feature(us, us.objects.states).features;
        g.append("g")
            .attr("id", "counties")
            .selectAll("path")
            .data(counties)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "county-boundary")
            .on("click", reset)
            .on("mouseover", function(d)
            {
                tip.show(d,this);
            })
            .on("mouseout", function(d)
            {
                    tip.hide(d,this);
            });
        g.append("g")
            .attr("id", "states")
            .selectAll("path")
            .data(states)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "state")
            .on("click", clicked)
            .on("mouseover", function(d)
            {
                tip.show(d,this);
            })
            .on("mouseout", function(d)
            {
                tip.hide(d,this);
            });

        counties.forEach(function (f) {
            // console.log("here");
            // console.log(f.id);
            if(f.id === 53073)
            {
                console.log('Wisconsin');
            }
            // f.properties = stateData.find(function (d) {
            //     return d.id === f.id })
        })

        g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            }))
            .attr("id", "state-borders")
            .attr("d", path);
        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([140, 140])
            .html(function(d) {
                return "<div style='opacity:0.8;background-color:#329c68;font-family:sans-serif;padding:8px;;color:white'>" +
                        "State: "  + d.id + "<br/>" +
                        "County: " +  "<br/>" +
                        "Total Cases: " +  "<br/>" +
                        "Total Deaths: " +  "<br/>" +
                        "</div>";
            });
        g.call(tip);
        function clicked(d) {
            console.log(d.id);
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

        function reset() {
            active.classed("active", false);
            active = d3.select(null);

            g.transition()
                .delay(100)
                .duration(750)
                .style("stroke-width", "1.5px")
                .attr('transform', 'translate('+margin.left+','+margin.top+')');

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