import { useEffect, useRef } from 'react';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
import { schemeCategory10 } from 'd3';
import {
    lineRadial,
    curveLinearClosed,
} from 'd3-shape';
import { select, selectAll, Selection } from 'd3-selection';
import { range } from 'd3-array';
import { transition } from 'd3-transition';
export interface Layer { layer: string; parameter: string, value: number }

export interface HvAPlotProps {
    data: Array<Array<Layer>>;
}
interface RadarPoint {
    radialChartSeriesIndex: number;
    radialChartAxisIndex: number;
    axis: string;
    value: number;
}

const cleanData = (allAxis: string[], data: HvAPlotProps['data'], maxValues: { [axis: string]: number }) => {

    return data.map((item, radialChartSeriesIndex) =>
        allAxis.reduce((series, axis, radialChartAxisIndex) => {
            const point = item
                .filter((point: Layer) => point['parameter'] === axis)
                .sort((point1, point2) => point2['value'] - point1['value'])[0];
            if (point) {
                series.push({
                    radialChartSeriesIndex,
                    radialChartAxisIndex,
                    axis: point['parameter'],
                    value: point['value'],
                });
            }
            const numericValue = Number(point['value']);
            if (!isNaN(numericValue) && (maxValues[axis] === undefined || numericValue > maxValues[axis])) {
                maxValues[axis] = numericValue;
            }
            return series;
        }, [] as RadarPoint[])
    );
};

const wrap = (text: Selection<SVGTextElement, any, any, any>, width: number) => {
    text.each(function () {
        const textElement = select(this);
        const words: string[] = textElement.text().split(/\s+/);
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 1.4; // ems
        const y: string | null = textElement.attr('y');
        const x: string | null = textElement.attr('x');
        const dy: number = parseFloat(textElement.attr('dy'));

        let tspan = textElement
            .text(null)
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', dy + 'em');


        words.forEach((word: string) => {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node()?.getComputedTextLength()! > width) {
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = textElement
                    .append('tspan')
                    .attr('x', x)
                    .attr('y', y)
                    .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                    .text(word);
            }
        });
    });
};

const gatherAxis = (data: HvAPlotProps["data"]) => {
    const allAxis: string[] = [];
    data.forEach((item) => {
        item.forEach((value) => {
            allAxis.includes(value['parameter']) || allAxis.push(value['parameter']);
        });
    });
    return allAxis;
};
const defaultConfig = {
    width: 300, //Width of the circle
    height: 300, //Height of the circle
    labelOffset: 40,
    margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
    levels: 3, //How many levels or inner circles should there be drawn
    maxValue: 100, //What is the value that the biggest circle will represent
    labelFactor: 1.15, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 2, //The width of the stroke around each blob
    roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
    color: scaleOrdinal(schemeCategory10), //Color function
    blur: 2.5, //Gaussian blur standard deviation
};
const RadarChart: React.FC<HvAPlotProps> = ({ data }) => {
    const chartRef = useRef<SVGSVGElement>(null);
    const config = defaultConfig;
    const maxValues: { [axis: string]: number } = {};
    const legendX = config.width - 260;
    const legendY = 1;
    useEffect(() => {
        const maxValue = config.maxValue;
        // D3 code to draw radar chart
        if (chartRef.current && data) {
            //Names of each axis
            const allAxis = gatherAxis(data);

            const total = allAxis.length; //The number of different axes
            const radius = Math.min(config.width / 2, config.height / 2); //Radius of the outermost circle
            // TODO: add other formats support
            // const Format = config.format; //Percentage formatting
            const angleSlice = (Math.PI * 2) / total; //The width in radians of each 'slice'

            //Scale for the radius
            const rScale = scaleLinear().range([0, radius]).domain([0, maxValue]);

            const svg = select(chartRef.current);
            svg.selectAll('*').remove();
            //Append a g element
            const g = svg
                .append('g')
                .attr('transform', 'translate(' + (config.width / 2 + config.margin.left + config.labelOffset / 2) + ',' + (config.height / 2 + config.margin.top + config.labelOffset / 2) + ')');
            //Wrapper for the grid & axes
            const axisGrid = g.append('g').attr('class', 'axisWrapper');

            //Draw the background circles
            axisGrid
                .selectAll('.levels')
                .data(range(1, config.levels + 1).reverse())
                .enter()
                .append('circle')
                .attr('class', 'gridCircle')
                .attr('r', (d, i) => (radius / config.levels) * d)
                .style('fill', '#CDCDCD')
                .style('stroke', '#CDCDCD')
                .style('fill-opacity', config.opacityCircles)
                .style('filter', 'url(#glow)');

            //Text indicating at what % each level is
            axisGrid
                .selectAll('.axisLabel')
                .data(range(1, config.levels + 1).reverse())
                .enter()
                .append('text')
                .attr('class', 'axisLabel')
                .attr('x', 4)
                .attr('y', (d) => (-d * radius) / config.levels)
                .attr('dy', '0.4em')
                .style('font-size', '11px')
                .attr('fill', '#737373')
                .text((d, i) => (Math.round((maxValue * d) / config.levels)));

            //Create the straight lines radiating outward from the center
            const axis = axisGrid
                .selectAll('.axis')
                .data(allAxis)
                .enter()
                .append('g')
                .attr('class', 'axis');
            //Append the lines
            axis
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr(
                    'x2',
                    (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
                )
                .attr(
                    'y2',
                    (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
                )
                .attr('class', 'line')
                .style('stroke', 'white')
                .style('stroke-width', '2px');
            //Append the labels at each axis
            axis
                .append('text')
                .attr('class', 'legend')
                .style('font-size', '14px')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr(
                    'x',
                    (d, i) =>
                        rScale(maxValue * config.labelFactor) *
                        Math.cos(angleSlice * i - Math.PI / 2)
                )
                .attr(
                    'y',
                    (d, i) =>
                        rScale(maxValue * config.labelFactor) *
                        Math.sin(angleSlice * i - Math.PI / 2)
                )
                .text((d) => d)
                .call(wrap, config.wrapWidth);
            //The radial line function
            const clearData = cleanData(allAxis, data, maxValues);
            const radarLine = lineRadial<RadarPoint>()
                .radius((d) => d && rScale(Math.round(config.maxValue * d.value / maxValues[d.axis])))
                .angle((d) => d.radialChartAxisIndex * angleSlice)
                .curve(curveLinearClosed);
            //Create a wrapper for the blobs
            const blobWrapper = g
                .selectAll('.radarWrapper')
                .data(clearData)
                .enter()
                .append('g')
                .attr('class', 'radarWrapper');

            // //Append the backgrounds
            blobWrapper
                .append('path')
                .attr('class', 'radarArea')
                .attr('d', (d, i) => d && radarLine(d))
                .style('fill', (d, i) => config.color(i.toString()))
                .style('fill-opacity', config.opacityArea)
                .on('mouseover', function (d, i) {
                    //Dim all blobs
                    selectAll('.radarArea')
                        .transition(transition().duration(200))
                        .style('fill-opacity', 0.1);
                    //Bring back the hovered over blob
                    select(this)
                        .transition(transition().duration(200))
                        .style('fill-opacity', 0.7);
                })
                .on('mouseout', function () {
                    //Bring back all blobs
                    selectAll('.radarArea')
                        .transition(transition().duration(200))
                        .style('fill-opacity', config.opacityArea);
                });
            blobWrapper
                .append('path')
                .attr('class', 'radarStroke')
                .attr('d', (d) => d && radarLine(d))
                .style('stroke-width', config.strokeWidth + 'px')
                .style('stroke', (d, i) => config.color(i.toString()))
                .style('fill', 'none')
                .style('filter', 'url(#glow)');

            // //Append the circles
            blobWrapper
                .selectAll('.radarCircle')
                .data((d) => d)
                .enter()
                .append('circle')
                .attr('class', 'radarCircle')
                .attr('r', config.dotRadius)
                .attr(
                    'cx',
                    (d) =>
                        rScale(Math.round(config.maxValue * d.value / maxValues[d.axis])) *
                        Math.cos(angleSlice * d.radialChartAxisIndex - Math.PI / 2)
                )
                .attr(
                    'cy',
                    (d) =>
                        rScale(Math.round(config.maxValue * d.value / maxValues[d.axis])) *
                        Math.sin(angleSlice * d.radialChartAxisIndex - Math.PI / 2)
                )
                .style('fill', (d) => config.color(d.radialChartSeriesIndex.toString()))
                .style('fill-opacity', 0.8);
            //Wrapper for the invisible circles on top
            const blobCircleWrapper = g
                .selectAll('.radarCircleWrapper')
                .data(clearData)
                .enter()
                .append('g')
                .attr('class', 'radarCircleWrapper');

            //Set up the small tooltip for when you hover over a circle
            const tooltip = g.append('text').attr('class', 'tooltip').style('opacity', 0);
            //Append a set of invisible circles on top for the mouseover pop-up
            blobCircleWrapper
                .selectAll('.radarInvisibleCircle')
                .data((d, i) => d)
                .enter()
                .append('circle')
                .attr('class', 'radarInvisibleCircle')
                .attr('r', config.dotRadius * 1.5)
                .attr(
                    'cx',
                    (d, i) =>
                        rScale(Math.round(config.maxValue * d.value / maxValues[d.axis])) *
                        Math.cos(angleSlice * d.radialChartAxisIndex - Math.PI / 2)
                )
                .attr(
                    'cy',
                    (d, i) =>
                        rScale(Math.round(config.maxValue * d.value / maxValues[d.axis])) *
                        Math.sin(angleSlice * d.radialChartAxisIndex - Math.PI / 2)
                )
                .style('fill', 'none')
                .style('pointer-events', 'all')
                .on('mouseover', function (d: RadarPoint, data) {
                    const newX = parseFloat(select(this).attr('cx')) - 10;
                    const newY = parseFloat(select(this).attr('cy')) - 10;
                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text(data.value)
                        .style('fill', 'black')
                        .style('font-size', '14px')
                        .transition()
                        .duration(200)
                        .style('opacity', 1);
                })
                .on('mouseout', function () {
                    tooltip.transition().duration(200).style('opacity', 0);
                });
            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${legendX},${legendY})`); // Adjust the X and Y coordinates

            const legendItem = legend.append('g')
                .attr('class', 'legend-item')
                .attr('transform', (d, i) => `translate(0, ${i * 20})`); // Adjust the vertical spacing
            legendItem.append('rect')
                .attr('width', 30) // Adjust the width of the legend color box
                .attr('height', 10) // Adjust the height of the legend color box
                .attr('fill', config.color("0")) // Color for the legend item
                .attr('x', 0);

            legendItem.append('text')
                .text('Home') // Label for the legend item
                .attr('x', 40) // Adjust the horizontal position
                .attr('y', 10);
            legendItem.append('rect')
                .attr('width', 30) // Adjust the width of the legend color box
                .attr('height', 10) // Adjust the height of the legend color box
                .attr('fill', config.color("1")) // Color for the legend item
                .attr('x', 130);
            legendItem.append('text')
                .text('Away') // Label for the legend item
                .attr('x', 170) // Adjust the horizontal position
                .attr('y', 10);
            legendItem.append('rect')
                .attr('width', 30) // Adjust the width of the legend color box
                .attr('height', 10) // Adjust the height of the legend color box
                .attr('fill', config.color("2")) // Color for the legend item
                .attr('x', 240);
            legendItem.append('text')
                .text('Neutral') // Label for the legend item
                .attr('x', 280) // Adjust the horizontal position
                .attr('y', 10);
        }
    }, [data]);
    return (
        <svg ref={chartRef} width={defaultConfig.width + defaultConfig.margin.left + defaultConfig.margin.right + defaultConfig.labelOffset}
            height={defaultConfig.height + defaultConfig.margin.top + defaultConfig.margin.bottom + defaultConfig.labelOffset}>
        </svg>
    );
};

export default RadarChart;
