import React from "react";
import { Row, Col } from "react-bootstrap";
import { CareerAverageBat, CareerAverageBow } from "../Types/types";
interface ComparisonDataAllrounders {
  careerAvgA_Bat: CareerAverageBat;
  careerAvgA_Bow: CareerAverageBow;
  careerAvgB_Bat: CareerAverageBat;
  careerAvgB_Bow: CareerAverageBow;
}
const CompareAllrounders: React.FC<ComparisonDataAllrounders> = (data) => {
  return (
    <div className="container card shadow p-3 bg-body-tertiary rounded">
      <Row className="d-flex justify-content-center">
        <Col md="4">
          <div className="text-center h1 fw-medium">Batting figures</div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat.span}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Span</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?.span}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat.inns}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Innings</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?.inns}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat.runs}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Total Runs</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?.runs}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">{data.careerAvgA_Bat.hs}</div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Highest run</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?.hs}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat.ave}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Batting Average</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?.ave}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">{data.careerAvgA_Bat.sr}</div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Batting Strike Rate</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?.sr}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat._100s}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Centuries</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?._100s}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat._50s}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Half Centuries</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?._50s}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat._6s}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Sixes</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?._6s}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat._4s}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Fours</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?._4s}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bat._0s}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Ducks</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bat?._0s}
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="d-flex justify-content-center">
        <Col md="4">
          <div className="text-center h1 fw-medium">Bowling figures</div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.inns}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Innings</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.inns}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.overs}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Overs Bowled</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.overs}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.wkts}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Wickets</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.wkts}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.mdns}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Maidens</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.mdns}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.runs}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Runs conceded</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.runs}
          </div>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.ave}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Bowling Average</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.ave}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">{data.careerAvgA_Bow.sr}</div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Bowling Strike Rate</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.sr}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.econ}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Economy</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.econ}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.caught}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Caught</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.caught}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.bowled}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">Bowled</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.bowled}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgA_Bow.lbw}
          </div>
        </Col>
        <Col md="2">
          <div className="text-center h2 fw-medium">LBW</div>
        </Col>
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="h3 text-center my-auto">
            {data.careerAvgB_Bow?.lbw}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompareAllrounders;
