"use client";
import Link from "next/link";
import React from "react";
import * as d3 from "d3";
import useGetCount from "@/queries/useGetCount";

export default function Privacy() {
	var { data: waifuCount } = useGetCount();
	var [dataHistory, setDataHistory] = React.useState({
		hour:[],
		day:[],
		week:[]
	});
	const [start, setStart] = React.useState(new Date());

	const svgRef = React.useRef(null);

	React.useEffect(()=>{
		if(!waifuCount){return}

		Object.keys(waifuCount).forEach((stat)=>{
			dataHistory[stat].push(waifuCount[stat]);
		});
		setDataHistory(dataHistory);

	},[waifuCount]);

	const width=400;
	const height=300;

	React.useEffect(()=>{
		const data = dataHistory.hour;
		const svg = d3.select(svgRef.current);

		var xScale = d3.scaleTime()
			.domain([ start, (new Date()) ])
			.range([0, width]);

		var xAxisGenerator = d3.axisBottom(xScale);

		svg
			.append('g')
			.call(xAxisGenerator);

	},[svgRef, dataHistory]);

	return (<div>
		<h1 className="font-bold text-3xl">Statistics</h1>
		<div id="g-hour">
			<svg fill="var(--text)" ref={svgRef} />
		</div>
		<div id="g-day">

		</div>
		<div id="g-week">

		</div>
	</div>);
}
