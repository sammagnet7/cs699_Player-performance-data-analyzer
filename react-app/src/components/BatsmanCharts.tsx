import React from 'react'
import { Card } from 'react-bootstrap'
import VscPlot from './VscPlot'
import YoyPlot from './YoyPlot'
import RadarChart, { HvAPlotProps } from './RadarChart'
import PieChart from './PieChart'
import { VscPlotProps } from './VscPlot'
import { YoyPlotProps } from './YoyPlot'
import { PieChartProps } from './PieChart'
import './Charts.css'
export interface ChartProps {
    yoyPlotData: YoyPlotProps | undefined;
    vscPlotData: VscPlotProps | undefined;
    hvaPlotData: HvAPlotProps | undefined;
    cenPlotData: PieChartProps | undefined;
}

const BatsmanCharts: React.FC<ChartProps> = (plotdata) => {
    return (
        <>
            <div className="row gx-2" id='barplot-container'>
                <div className='col col-md-6' id='yoyplot'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>Year on Year Performance</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.yoyPlotData && <YoyPlot data={plotdata.yoyPlotData.data} />}
                        </Card.Body>
                    </Card>
                </div>

                <div className='col col-md-6' id='vscplot'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>VsCountry</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.vscPlotData && <VscPlot data={plotdata.vscPlotData.data} />}
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row gx-2" id='radialplot-container'>
                <div className='col col-md-6' id='radarchart'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>Home vs Away vs Neutral</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.hvaPlotData && < RadarChart data={plotdata.hvaPlotData.data} />}
                        </Card.Body>
                    </Card>
                </div>
                <div className='col col-md-6' id='pieplot'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>Batsman Innings Performance</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.cenPlotData && <PieChart data={plotdata.cenPlotData.data} width={380} height={380} />}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default BatsmanCharts