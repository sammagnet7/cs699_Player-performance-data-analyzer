import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './PlayerProfile.css'

export interface VscPlotProps {
    data: { country: string; initial: number; innings: number, sr: number }[];
}


const VscPlot: React.FC<VscPlotProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 650 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const legendX = width / 4;
    const legendY = 2;

    useEffect(() => {
        if (svgRef.current && data.length) {
            const svg = d3.select(svgRef.current);

            const xScale = d3
                .scaleBand()
                .domain(data.map((d) => d.country))
                .range([0, width])
                .padding(0.5);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.sr) as number])
                .nice()
                .range([height, 0]);

            const generateScaledLine = d3
                .line<{ country: string; sr: number }>()
                .x((d) => xScale(d.country) as number + xScale.bandwidth() / 2 || 0)
                .y((d) => yScale(d.sr));

            const yAxisGrid = d3.axisLeft(yScale).tickSize(-width);
            const xAxisGrid = d3.axisBottom(xScale).tickSize(-height);

            svg.selectAll('*').remove();

            const chart = svg
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            chart.append('g')
                .attr('class', 'grid')
                .call(yAxisGrid);

            chart.append('g')
                .attr('class', 'grid')
                .attr('transform', `translate(0, ${height})`)
                .call(xAxisGrid)
                .selectAll('text')
                .style('text-anchor', 'middle')
                .attr('dy', '1em');
            chart
                .selectAll('.bar1')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar1')
                .attr('x', (d) => xScale(d.country) as number || 0)
                .attr('y', (d) => yScale(d.initial))
                .attr('width', xScale.bandwidth())
                .attr('height', 0) // Initial height set to 0
                .attr('fill', '#2255a4')
                .transition()
                .duration(1000) // Animation duration in milliseconds
                .attr('y', (d) => yScale(d.innings))
                .attr('height', (d) => height - yScale(d.innings))
                .each(function (d) {
                    const bar = d3.select(this);
                    const x = xScale(d.country) as number + xScale.bandwidth() / 2;
                    const y = yScale(d.innings) - 10; // Adjust the vertical position
                    const value = d.innings.toString();

                    // Add text for the bar value
                    chart.append('text')
                        .attr('x', x)
                        .attr('y', y)
                        .text(value)
                        .attr("class", "text")
                        .attr('text-anchor', 'middle')
                        .style('fill', 'black')
                        .style('font-size', '12px')
                        .style('visibility', 'hidden'); // Initially hidden

                    bar.on('mouseover', () => {
                        // Show the text on mouseover
                        bar.style("cursor", "pointer")
                        chart.selectAll('.text').style('visibility', 'visible');
                    });
                    bar.on('mouseout', () => {
                        chart.selectAll('.text').style('visibility', 'hidden');
                    });
                });


            const path = chart
                .append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', '#ff6600')
                .attr('stroke-width', 2)
                .attr('d', generateScaledLine);

            const length = path.node()?.getTotalLength();
            path.attr("stroke-dasharray", length + " " + length)
                .attr("stroke-dashoffset", length as number)
                .transition()
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .delay(500)
                .duration(2500)

            chart
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => xScale(d.country) as number + xScale.bandwidth() / 2 || 0)
                .attr('cy', (d) => yScale(d.sr))
                .attr('r', 4)
                .attr('fill', '#ff6600')
                .each(function (d) {
                    const scatter = d3.select(this);
                    const x = xScale(d.country) as number + xScale.bandwidth() / 2;
                    const y = yScale(d.sr) - 5; // Adjust the vertical position
                    const value = d.sr.toString();

                    // Add text for the bar value
                    chart.append('text')
                        .attr('x', x)
                        .attr('y', y)
                        .text(value)
                        .attr("class", "scatter-text")
                        .attr('text-anchor', 'middle')
                        .style('fill', 'black')
                        .style('font-size', '12px')
                        .style('visibility', 'hidden'); // Initially hidden

                    scatter.on('mouseover', function () {
                        // Show the text on mouseover
                        scatter.style("cursor", "pointer")
                        chart.selectAll('.scatter-text').style('visibility', 'visible');
                    });
                    scatter.on('mouseout', () => {
                        chart.selectAll('.scatter-text').style('visibility', 'hidden');
                    });
                });

            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${legendX},${legendY})`); // Adjust the X and Y coordinates

            const legendItem = legend.append('g')
                .attr('class', 'legend-item')
                .attr('transform', (d, i) => `translate(0, ${i * 20})`); // Adjust the vertical spacing
            legendItem.append('rect')
                .attr('width', 30) // Adjust the width of the legend color box
                .attr('height', 20) // Adjust the height of the legend color box
                .attr('fill', '#ff6600') // Color for the legend item
                .attr('x', 0);

            legendItem.append('text')
                .text('Strike rate') // Label for the legend item
                .attr('x', 40) // Adjust the horizontal position
                .attr('y', 15);
            legendItem.append('rect')
                .attr('width', 30) // Adjust the width of the legend color box
                .attr('height', 20) // Adjust the height of the legend color box
                .attr('fill', '#2255a4') // Color for the legend item
                .attr('x', 150);
            legendItem.append('text')
                .text('Innings') // Label for the legend item
                .attr('x', 190) // Adjust the horizontal position
                .attr('y', 15);

        }
    }, [data]);

    return (
        <svg ref={svgRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}></svg>
    );
};

export default VscPlot;
