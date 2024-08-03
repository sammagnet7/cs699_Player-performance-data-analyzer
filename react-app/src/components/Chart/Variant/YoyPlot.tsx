/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { YoyPlotProps } from "../../Types/types";

// Define the YoYPlot component
const YoyPlot: React.FC<YoyPlotProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null); // Reference to the SVG element
  const margin = { top: 20, right: 20, bottom: 20, left: 20 }; // Margins for the chart
  const width = 650 - margin.left - margin.right; // Width of the chart
  const height = 300 - margin.top - margin.bottom; // Height of the chart
  const legendX = width / 4; // X position for the legend
  const legendY = 2; // Y position for the legend
  const lineColor = "#ff6600"; // Color for the line
  const bar2Color = "#1F75FE"; // Color for the second bar
  const bar1Color = "#2255a4"; // Color for the first bar

  // useEffect hook to handle D3 chart rendering
  useEffect(() => {
    if (svgRef.current && data.length) {
      const svg = d3.select(svgRef.current); // Select the SVG element

      // Define x and y scales
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.year))
        .range([0, width])
        .padding(0.6);

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, (d) => Math.max(d.ave, d.innings, d.sr)) as number,
        ])
        .nice()
        .range([height, 0]);

      // Define the line generator
      const generateScaledLine = d3
        .line<{ year: string; sr: number }>()
        .x((d) => (xScale(d.year) as number) + xScale.bandwidth() / 2 || 0)
        .y((d) => yScale(d.sr));

      // Define the y-axis and x-axis grid
      const yAxisGrid = d3.axisLeft(yScale).tickSize(-width);
      const xAxisGrid = d3.axisBottom(xScale).tickSize(-height);

      svg.selectAll("*").remove(); // Clear the SVG content

      // Append a group element to the SVG
      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add y-axis grid
      chart.append("g").attr("class", "grid").call(yAxisGrid);

      // Add x-axis grid
      chart
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisGrid)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("dy", "1em");

      // Add the first set of bars
      chart
        .selectAll(".bar1")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar1")
        .attr(
          "x",
          (d) => (xScale(d.year) as number) - xScale.bandwidth() / 2 || 0
        )
        .attr("y", (d) => yScale(d.initial))
        .attr("width", xScale.bandwidth())
        .attr("height", 0) // Initial height set to 0
        .attr("fill", bar1Color)
        .transition()
        .duration(1000) // Animation duration in milliseconds
        .attr("y", (d) => yScale(d.innings))
        .attr("height", (d) => height - yScale(d.innings))
        .each(function (d) {
          const bar = d3.select(this);
          const x = xScale(d.year) as number;
          const y = yScale(d.innings) - 5; // Adjust the vertical position
          const value = d.innings.toString();

          // Add text for the bar value
          chart
            .append("text")
            .attr("x", x)
            .attr("y", y)
            .text(value)
            .attr("class", "text")
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "12px")
            .style("visibility", "hidden");

          // Add mouseover event to show the text
          bar.on("mouseover", function () {
            bar.style("cursor", "pointer");
            chart.selectAll(".text").style("visibility", "visible");
          });

          // Add mouseout event to hide the text
          bar.on("mouseout", () => {
            chart.selectAll(".text").style("visibility", "hidden");
          });
        });

      // Add the second set of bars
      chart
        .selectAll(".bar2")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar2")
        .attr(
          "x",
          (d) => (xScale(d.year) as number) + xScale.bandwidth() / 2 || 0
        )
        .attr("y", (d) => yScale(d.initial))
        .attr("width", xScale.bandwidth())
        .attr("height", 0) // Initial height set to 0
        .attr("fill", bar2Color)
        .transition()
        .duration(1000) // Animation duration in milliseconds
        .attr("y", (d) => yScale(d.ave))
        .attr("height", (d) => height - yScale(d.ave))
        .each(function (d) {
          const bar = d3.select(this);
          const x = (xScale(d.year) as number) + xScale.bandwidth();
          const y = yScale(d.ave) - 5; // Adjust the vertical position
          const value = d.ave.toString();

          // Add text for the bar value
          chart
            .append("text")
            .attr("x", x)
            .attr("y", y)
            .text(value)
            .attr("class", "text")
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "12px")
            .style("visibility", "hidden"); // Initially hidden

          // Add mouseover event to show the text
          bar.on("mouseover", function () {
            bar.style("cursor", "pointer");
            chart.selectAll(".text").style("visibility", "visible");
          });

          // Add mouseout event to hide the text
          bar.on("mouseout", () => {
            chart.selectAll(".text").style("visibility", "hidden");
          });
        });

      // Add the line path
      const path = chart
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", lineColor)
        .attr("stroke-width", 2)
        .attr("d", generateScaledLine);
      const length = path.node()?.getTotalLength();
      path
        .attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length as number)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .delay(500)
        .duration(2500);

      // Add scatter points on the line
      chart
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr(
          "cx",
          (d) => (xScale(d.year) as number) + xScale.bandwidth() / 2 || 0
        )
        .attr("cy", (d) => yScale(d.sr))
        .attr("r", 4)
        .attr("fill", lineColor)
        .each(function (d) {
          const scatter = d3.select(this);
          const x = (xScale(d.year) as number) + xScale.bandwidth() / 2;
          const y = yScale(d.sr) - 5; // Adjust the vertical position
          const value = d.sr.toString();

          // Add text for the bar value
          chart
            .append("text")
            .attr("x", x)
            .attr("y", y)
            .text(value)
            .attr("class", "scatter-text")
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "12px")
            .style("visibility", "hidden"); // Initially hidden

          // Add mouseover event to show the text
          scatter.on("mouseover", function () {
            scatter.style("cursor", "pointer");
            chart.selectAll(".scatter-text").style("visibility", "visible");
          });

          // Add mouseout event to hide the text
          scatter.on("mouseout", () => {
            chart.selectAll(".scatter-text").style("visibility", "hidden");
          });
        });

      // Add the legend
      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${legendX},${legendY})`); // Adjust the X and Y coordinates

      const legendItem = legend
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (_d, i) => `translate(0, ${i * 20})`); // Adjust the vertical spacing

      // Add legend items for the line and bars
      legendItem
        .append("rect")
        .attr("width", 30) // Adjust the width of the legend color box
        .attr("height", 20) // Adjust the height of the legend color box
        .attr("fill", lineColor) // Color for the legend item
        .attr("x", 0);

      legendItem
        .append("text")
        .text("Strike rate") // Label for the legend item
        .attr("x", 40) // Adjust the horizontal position
        .attr("y", 15);

      legendItem
        .append("rect")
        .attr("width", 30) // Adjust the width of the legend color box
        .attr("height", 20) // Adjust the height of the legend color box
        .attr("fill", bar1Color) // Color for the legend item
        .attr("x", 130);

      legendItem
        .append("text")
        .text("Innings") // Label for the legend item
        .attr("x", 170) // Adjust the horizontal position
        .attr("y", 15);

      legendItem
        .append("rect")
        .attr("width", 30) // Adjust the width of the legend color box
        .attr("height", 20) // Adjust the height of the legend color box
        .attr("fill", bar2Color) // Color for the legend item
        .attr("x", 240);

      legendItem
        .append("text")
        .text("Average") // Label for the legend item
        .attr("x", 280) // Adjust the horizontal position
        .attr("y", 15);
    }
  }, [data]);

  // Render the SVG element
  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    ></svg>
  );
};

export default YoyPlot;
