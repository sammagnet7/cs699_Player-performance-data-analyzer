import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import styles from './PieChart.module.css'

type DataItem = {
    name: string;
    value: number;
};
export interface PieChartProps {
    width: number;
    height: number;
    data: DataItem[];
};

const MARGIN_X = 50;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 5; // space between donut and label inflexion point

const colors = [
    "#e0ac2b",
    "#e85252",
    "#6689c6",
    "#9a6fb0",
    "#a53253",
    "#69b3a2",
];

export const PieChart = ({ width, height, data }: PieChartProps) => {
    const svgRef = useRef<SVGGElement>(null);

    const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcGenerator = d3.arc();

    const shapes = pie.map((grp, i) => {
        // First arc is for the Pie
        const sliceInfo = {
            innerRadius: 0,
            outerRadius: radius,
            startAngle: grp.startAngle,
            endAngle: grp.endAngle,
        };
        const centroid = arcGenerator.centroid(sliceInfo);
        const slicePath = arcGenerator(sliceInfo);

        const textAnchor = "middle";
        const label = grp.value;

        return (
            <g
                key={i}
                className={styles.slice}
                onMouseEnter={() => {
                    if (svgRef.current) {
                        svgRef.current.classList.add(styles.hasHighlight);
                    }
                }}
                onMouseLeave={() => {
                    if (svgRef.current) {
                        svgRef.current.classList.remove(styles.hasHighlight);
                    }
                }}
            >
                <path d={slicePath as string} fill={colors[i]} />
                <text
                    x={centroid[0]}
                    y={centroid[1]}
                    textAnchor={textAnchor}
                    dominantBaseline="middle"
                    fontSize={14}
                >
                    {label}
                </text>
            </g>
        );
    });

    return (
        <svg width={width} height={height} style={{ display: "inline-block" }}>
            <g
                transform={`translate(${width / 2}, ${height / 2})`}
                className={styles.container}
                ref={svgRef}
            >
                {shapes}
            </g>
            <g className="legend" transform={`translate(${width / 4},0)`}>
                <g className="legend-item">
                    <rect width={30} height={20} fill={colors[0]} x={-30}></rect>
                    <text x={10} y={15}>100+</text>
                    <rect width={30} height={20} fill={colors[1]} x={80}></rect>
                    <text x={120} y={15}>50-99</text>
                    <rect width={30} height={20} fill={colors[2]} x={180}></rect>
                    <text x={220} y={15}>&lt;50</text>
                </g>
            </g>
        </svg>
    );
};

export default PieChart;