import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { Player } from './Searchbar';
import CompareBatsmen from './CompareBatsmen';
import CompareAllrounders from './CompareAllrounders';
import Header from './Header';
import { API_URL_CAVG_BAT, API_URL_CAVG_BOW, CareerAverageBat, CareerAverageBow, fetchFromAPI } from './PlayerProfile';
import CompareBowlers from './CompareBowlers';
interface PlayerComparisonData {
    playerA: Player
    playerB: Player,
    careerAvgA_Bat: CareerAverageBat,
    careerAvgA_Bow: CareerAverageBow,
}
const ComparePlayers = () => {
    const { state } = useLocation();
    const [careerAvgB_Bat, setCareerAvgB_Bat] = useState<CareerAverageBat>();
    const [careerAvgB_Bow, setCareerAvgB_Bow] = useState<CareerAverageBow>();
    const { playerA, playerB, careerAvgA_Bat, careerAvgA_Bow }: PlayerComparisonData = state;

    useEffect(() => {
        let cavgPromiseBat: Promise<any>;
        let cavgPromiseBow: Promise<any>;
        if (playerA.roll_id === "BAT") {
            cavgPromiseBat = fetchFromAPI(API_URL_CAVG_BAT, playerB.pid);
            cavgPromiseBat.then((apidata) => {
                setCareerAvgB_Bat(apidata[0]);
            })

        }
        else if (playerA.roll_id === "BOW") {
            cavgPromiseBow = fetchFromAPI(API_URL_CAVG_BOW, playerB.pid);
            cavgPromiseBow.then((apidata) => {
                setCareerAvgB_Bow(apidata[0]);
            })
        }
        else {
            if (playerB.roll_id === "BAT") {
                cavgPromiseBat = fetchFromAPI(API_URL_CAVG_BAT, playerB.pid);
                cavgPromiseBat.then((apidata) => {
                    setCareerAvgB_Bat(apidata[0]);
                })
            }
            else if (playerB.roll_id === "BOW") {
                cavgPromiseBow = fetchFromAPI(API_URL_CAVG_BOW, playerB.pid);
                cavgPromiseBow.then((apidata) => {
                    setCareerAvgB_Bow(apidata[0]);
                })
            }
            else {
                cavgPromiseBat = fetchFromAPI(API_URL_CAVG_BAT, playerB.pid);
                cavgPromiseBow = fetchFromAPI(API_URL_CAVG_BOW, playerB.pid);
                cavgPromiseBat.then((apidata) => {
                    setCareerAvgB_Bat(apidata[0]);
                })
                cavgPromiseBow.then((apidata) => {
                    setCareerAvgB_Bow(apidata[0]);
                })
            }
        }
    }, [])

    return (
        <>
            <Header title="Player Comparison" />
            <div className='container mt-3'>
                <Row className='d-flex justify-content-center'>
                    <Col md="3" className='me-5'>
                        <Card className='shadow p-3 bg-body-tertiary rounded'>
                            <Card.Img variant="top" src={playerA.photoLink} />
                            <Card.Body>
                                <Card.Title className='text-center'>{playerA.fullName}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="3" className='ms-5'>
                        <Card className='shadow p-3 bg-body-tertiary rounded'>
                            <Card.Img variant="top" src={playerB.photoLink} />
                            <Card.Body>
                                <Card.Title className='text-center'>{playerB.fullName}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {playerA.roll_id === "BAT" && <CompareBatsmen careerAvgA_Bat={careerAvgA_Bat} careerAvgB_Bat={careerAvgB_Bat as CareerAverageBat} />}
                {playerA.roll_id === "BOW" && <CompareBowlers careerAvgA_Bow={careerAvgA_Bow} careerAvgB_Bow={careerAvgB_Bow as CareerAverageBow} />}
                {playerA.roll_id === "ALL" && playerB.roll_id === "BAT" && <CompareBatsmen careerAvgA_Bat={careerAvgA_Bat} careerAvgB_Bat={careerAvgB_Bat as CareerAverageBat} />}
                {playerA.roll_id === "ALL" && playerB.roll_id === "BOW" && <CompareBowlers careerAvgA_Bow={careerAvgA_Bow} careerAvgB_Bow={careerAvgB_Bow as CareerAverageBow} />}
                {playerA.roll_id === "ALL" && playerB.roll_id === "ALL" && <CompareAllrounders careerAvgA_Bat={careerAvgA_Bat} careerAvgA_Bow={careerAvgA_Bow} careerAvgB_Bat={careerAvgB_Bat as CareerAverageBat} careerAvgB_Bow={careerAvgB_Bow as CareerAverageBow} />}
            </div>
        </>

    )
}

export default ComparePlayers