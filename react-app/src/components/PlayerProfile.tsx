import React from 'react'
import { Player } from './Searchbar'
import { useContext } from 'react';
import { PlayerContext } from '../App';
const PlayerProfile = () => {
    const context = useContext(PlayerContext);
    return (
        <>
            <div>{context?.player?.fullName}</div>
            <div>{context?.player?.playingRole}</div>
        </>

    )
}

export default PlayerProfile