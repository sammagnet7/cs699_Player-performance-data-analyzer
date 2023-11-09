import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'

interface ChartProps {
    data: DataItem[];
}

interface DataItem {
    x: number;
    y: number;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current && data.length) {
            const width = 400;
            const height = 200;

            const svg = d3.select(svgRef.current);

            // Define scales, axes, and other D3 components
            const xScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.x) as number])
                .range([0, width]);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.y) as number])
                .range([height, 0]);

            // Create and render chart elements (e.g., circles)
            svg
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => xScale(d.x))
                .attr('cy', (d) => yScale(d.y))
                .attr('r', 5);

            // You can also add axes, labels, and other chart elements here

        }
    }, [data]);

    return (
        <svg ref={svgRef} width={400} height={200}></svg>
    );
};

export default Chart;
