import React, {useState, useEffect, useRef} from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';

import axios from "axios";
const USMaps = ({}) => {
    const inputEl = useRef(null);
    const [done, setDone] = useState(false);
    const [state, setState] = useState(null);

    useEffect(() =>{
        if(state === null){
            var url1 = axios.get("https://raw.githubusercontent.com/BiKunTin/datastore/main/us-counties.topojson");
            Promise
                .all([url1])
                .then((us) => {
                    console.log("haha");
                    console.log(us[0].data);
                    setState(us[0].data);
                });
        }


    }, []);


    useEffect(()=> {
        if(state) {
            console.log("shoudl run now if state not null")
            const margin = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };
            const width = 960 - margin.left - margin.right;
            let mapRatio = 0.5;
            let height = width * mapRatio;
            let active = d3.select(null);
            const svg = d3.select(inputEl.current)
                .append('svg')
                .attr('class', 'center-container')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right);
            const us = state;
            //
            //
            console.log("here");
            console.log(us);
            svg.append('rect')
                .attr('class', 'background center-container')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right)
                .on('click', clicked);
            console.log(svg);
            const projection = d3.geoAlbersUsa()
                .translate([width / 2, height / 2])
                .scale(width);

            const path = d3.geoPath()
                .projection(projection);

            const g = svg.append("g")
                .attr('class', 'center-container center-items us-state')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);
            console.log(g);
            g.append("g")
                .attr("id", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("d", path)
                .attr("class", "county-boundary")
                .on("click", reset);
            console.log(g);
            // g.append("g")
            //     .attr("id", "states")
            //     .selectAll("path")
            //     .data(topojson.feature(us, us.objects.states).features)
            //     .enter().append("path")
            //     .attr("d", path)
            //     .attr("class", "state")
            //     .on("click", clicked);
            //
            //
            // g.append("path")
            //     .datum(topojson.mesh(us, us.objects.states, function (a, b) {
            //         return a !== b;
            //     }))
            //     .attr("id", "state-borders")
            //     .attr("d", path);

            function clicked(d) {
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
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            }

            setDone(true);
        }
    }, [state]);

    return (
        <div>

            <g ref={inputEl.current} />
            <br /> {console.log("..DONE...")}
            {/*{done && console.log("..DONE...") }*/}

        </div>

    );
}

export default USMaps;