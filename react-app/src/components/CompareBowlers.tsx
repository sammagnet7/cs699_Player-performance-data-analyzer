import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { CareerAverageBow } from './PlayerProfile'
interface ComparisonDataBowlers {
    careerAvgA_Bow: CareerAverageBow,
    careerAvgB_Bow: CareerAverageBow
}

const CompareBowlers: React.FC<ComparisonDataBowlers> = (data) => {
    return (
        <div className="container card shadow p-3 bg-body-tertiary rounded">
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.span}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Span</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.span}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.inns}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Innings</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.inns}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.overs}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Overs Bowled</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.overs}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.wkts}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Wickets</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.wkts}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.mdns}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Maidens</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.mdns}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.runs}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Total Runs</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.runs}</div>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.ave}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Average</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.ave}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.sr}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Strike Rate</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.sr}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.econ}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Economy</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.econ}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.caught}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Caught</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.caught}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.bowled}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Bowled</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.bowled}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bow.lbw}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>LBW</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bow?.lbw}</div>
                </Col>
            </Row>
        </div>
    )
}

export default CompareBowlers