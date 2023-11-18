import { Card } from 'react-bootstrap'
import VscPlot from './VscPlot'
import YoyPlot from './YoyPlot'
import RadarChart from './RadarChart'
import PieChart from './PieChart'
import { ChartProps } from './BatsmanCharts'

const BowlerCharts: React.FC<ChartProps> = (plotdata) => {
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
                        <Card.Header>Wicket type distribution</Card.Header>
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                            {plotdata.cenPlotData && <PieChart data={plotdata.cenPlotData.data} width={380} height={380} />}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default BowlerCharts