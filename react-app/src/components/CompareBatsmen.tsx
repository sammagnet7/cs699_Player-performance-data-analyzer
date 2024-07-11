import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { CareerAverageBat } from './PlayerProfile'
interface ComparisonDataBatsmen {
    careerAvgA_Bat: CareerAverageBat,
    careerAvgB_Bat: CareerAverageBat
}

const CompareBatsmen: React.FC<ComparisonDataBatsmen> = (data) => {
    return (
        <div className="container card shadow p-3 bg-body-tertiary rounded">
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat.span}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Span</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?.span}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat.inns}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Innings</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?.inns}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat.runs}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Total Runs</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?.runs}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat.hs}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Highest run</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?.hs}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat.ave}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Average</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?.ave}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat.sr}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Strike Rate</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?.sr}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat._100s}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Centuries</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?._100s}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat._50s}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Half Centuries</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?._50s}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat._6s}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Sixes</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?._6s}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat._4s}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Fours</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?._4s}</div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgA_Bat._0s}</div>
                </Col>
                <Col md="2">
                    <div className='text-center h2 fw-medium'>Ducks</div>
                </Col>
                <Col md="2" className='d-flex align-items-center justify-content-center'>
                    <div className='h3 text-center my-auto'>{data.careerAvgB_Bat?._0s}</div>
                </Col>
            </Row>
        </div>
    )
}

export default CompareBatsmen