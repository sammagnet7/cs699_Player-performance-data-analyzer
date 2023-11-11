import React from 'react'
import { Player } from './Searchbar'
import { Card } from 'react-bootstrap';
import { CareerAverageBow } from './PlayerProfile';
export interface overviewBow {
    player: Player;
    careerAvg: CareerAverageBow;
}
const Bowleroverview = (pl: overviewBow) => {
    return (
        <Card className='shadow p-3 mb-5 bg-body-tertiary rounded'>
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
                <div className='row g-2 mb-2'>
                    <div className='col col-md-4'> <h4>Span: <small className='text-body-secondary'>{pl.careerAvg.span}</small></h4></div>
                    <div className='col col-md-4'> <h4>Innings: <small className='text-body-secondary'>{pl.careerAvg.inns}</small></h4></div>
                    <div className='col col-md-4'> <h4>Wickets: <small className='text-body-secondary'>{pl.careerAvg.wkts}</small></h4></div>
                </div>
                <div className='row g-2'>
                    <div className='col col-md-4'> <h4>Economy: <small className='text-body-secondary'>{pl.careerAvg.econ}</small></h4></div>
                    <div className='col col-md-4'> <h4>Average: <small className='text-body-secondary'>{pl.careerAvg.ave}</small></h4></div>
                    <div className='col col-md-4'> <h4>Strike Rate: <small className='text-body-secondary'>{pl.careerAvg.sr}</small></h4></div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Bowleroverview