import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Player } from './Searchbar'
import { CareerAverageBat, CareerAverageBow } from './PlayerProfile';
import Bowleroverview from './Bowleroverview';
import Batsmanoverview from './Batsmanoverview';
import Allroundoverview from './Allroundoverview';
export interface overview {
    player: Player;
    careerAvgBat: CareerAverageBat | null;
    careerAvgBowl: CareerAverageBow | null;
}

const Profileimage = (pl: overview) => {
    return (
        <>
            <div className="row gx-2" style={{ marginLeft: "5rem", marginTop: "2rem", marginRight: "5rem" }}>
                <div className="col col-md-2">
                    <Card className='shadow p-3 mb-5 bg-body-tertiary rounded'>
                        {pl.player && <Card.Img variant="top" src={pl.player.photoLink} />}
                        <Card.Body>
                            {pl.player &&
                                <Card.Title className='text-center'>{pl.player.fullName}</Card.Title>}
                        </Card.Body>
                    </Card>
                </div>
                <div className="col col-md-10">
                    {pl.careerAvgBat && pl.careerAvgBowl && <Allroundoverview player={pl.player} careerAvgBat={pl.careerAvgBat} careerAvgBowl={pl.careerAvgBowl} />}
                    {pl.careerAvgBat && !pl.careerAvgBowl && <Batsmanoverview player={pl.player} careerAvg={pl.careerAvgBat} />}
                    {pl.careerAvgBowl && !pl.careerAvgBat && <Bowleroverview player={pl.player} careerAvg={pl.careerAvgBowl} />}
                </div>
            </div>
        </>
    )
}

export default Profileimage