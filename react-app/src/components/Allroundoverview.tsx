import React from 'react'
import { Card } from 'react-bootstrap'
import { overview } from './Profileimage'
const Allroundoverview = (pl: overview) => {
    return (
        <>
            <Card className='shadow p-3 mb-2 bg-body-tertiary rounded'>
                <Card.Body>
                    <div className='row g-2 mb-2'>
                        <div className='col col-md-4'> <h4>Full Name: <small className='text-body-secondary'>{pl.player.fullName}</small></h4></div>
                        <div className='col col-md-4'> <h4>Born: <small className='text-body-secondary'>{pl.player.born}</small></h4></div>
                        <div className='col col-md-4'> <h4>Age: <small className='text-body-secondary'>{pl.player.age}</small></h4></div>
                    </div>
                    <div className='row g-2 mb-2'>
                        <div className='col col-md-4'> <h4>Batting Style: <small className='text-body-secondary'>{pl.player.battingStyle}</small></h4></div>
                        <div className='col col-md-4'> <h4>Bowling Style: <small className='text-body-secondary'>{pl.player.bowlingStyle}</small></h4></div>
                        <div className='col col-md-4'> <h4>Playing Role: <small className='text-body-secondary'>{pl.player.playingRole}</small></h4></div>
                    </div>
                    <div className='row g-3 mb-2'>
                        <div className='col col-md-12'> <h4>Batting Overview</h4></div>
                    </div>
                    <div className='row g-2 mb-2'>
                        <div className='col col-md-4'> <h4>Span: <small className='text-body-secondary'>{pl.careerAvgBat?.span}</small></h4></div>
                        <div className='col col-md-4'> <h4>Innings: <small className='text-body-secondary'>{pl.careerAvgBat?.inns}</small></h4></div>
                        <div className='col col-md-4'> <h4>Total Runs: <small className='text-body-secondary'>{pl.careerAvgBat?.runs}</small></h4></div>
                    </div>
                    <div className='row g-2 mb-2'>
                        <div className='col col-md-4'> <h4>Highest Run: <small className='text-body-secondary'>{pl.careerAvgBat?.hs}</small></h4></div>
                        <div className='col col-md-4'> <h4>Average Run: <small className='text-body-secondary'>{pl.careerAvgBat?.ave}</small></h4></div>
                        <div className='col col-md-4'> <h4>Strike Rate: <small className='text-body-secondary'>{pl.careerAvgBat?.sr}</small></h4></div>
                    </div>
                    <div className='row g-3 mb-2'>
                        <div className='col col-md-12'> <h4>Bowling Overview</h4></div>
                    </div>
                    <div className='row g-2 mb-2'>
                        <div className='col col-md-4'> <h4>Span: <small className='text-body-secondary'>{pl.careerAvgBowl?.span}</small></h4></div>
                        <div className='col col-md-4'> <h4>Innings: <small className='text-body-secondary'>{pl.careerAvgBowl?.inns}</small></h4></div>
                        <div className='col col-md-4'> <h4>Wickets: <small className='text-body-secondary'>{pl.careerAvgBowl?.wkts}</small></h4></div>
                    </div>
                    <div className='row g-2'>
                        <div className='col col-md-4'> <h4>Economy: <small className='text-body-secondary'>{pl.careerAvgBowl?.econ}</small></h4></div>
                        <div className='col col-md-4'> <h4>Average: <small className='text-body-secondary'>{pl.careerAvgBowl?.ave}</small></h4></div>
                        <div className='col col-md-4'> <h4>Strike Rate: <small className='text-body-secondary'>{pl.careerAvgBowl?.sr}</small></h4></div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Allroundoverview