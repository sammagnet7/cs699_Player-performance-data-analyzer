import React from 'react'
import { Card } from 'react-bootstrap'
import VscPlot from './VscPlot'
import YoyPlot from './YoyPlot'
import RadarChart, { HvAPlotProps } from './RadarChart'
import PieChart from './PieChart'
import { VscPlotProps } from './VscPlot'
import { YoyPlotProps } from './YoyPlot'
import { PieChartProps } from './PieChart'
export interface BatsmanChartProps {
    yoyPlotData: YoyPlotProps | undefined;
    vscPlotData: VscPlotProps | undefined;
    hvaPlotData: HvAPlotProps | undefined;
    cenPlotData: PieChartProps | undefined;
}

const BatsmanCharts: React.FC<BatsmanChartProps> = (plotdata) => {
    return (
        <>
            <div className="row gx-2 gy-2" style={{ marginLeft: "5rem", marginRight: "5rem" }}>
                <div className='col col-md-6'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>Year on Year Performance</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.yoyPlotData && <YoyPlot data={plotdata.yoyPlotData.data} />}
                        </Card.Body>
                    </Card>
                </div>

                <div className='col col-md-6'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>VsCountry</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.vscPlotData && <VscPlot data={plotdata.vscPlotData.data} />}
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row gx-2 gy-2" style={{ marginLeft: "5rem", marginRight: "5rem" }}>
                <div className='col col-md-6'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>Home vs Away vs Neutral</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.hvaPlotData && < RadarChart data={plotdata.hvaPlotData.data} />}
                        </Card.Body>
                    </Card>
                </div>
                <div className='col col-md-6'>
                    <Card className='shadow p-3 bg-body-tertiary rounded'>
                        <Card.Header>Number of Innings with centuries & half centuries</Card.Header>
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