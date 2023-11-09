import React, { useEffect, useState } from 'react'
import { Player } from './Searchbar'
import { useContext } from 'react';
import { PlayerContext } from '../App';
import Chart from './Chart';
import BarPlot, { BarPlotProps } from './BarPlot';
import Profileimage from './Profileimage';
import Header from './Header';
import './PlayerProfile.css'
const API_URL_CAVG_BAT = 'http://localhost:8080/batsman/careeravg/';
const API_URL_CAVG_BOW = 'http://localhost:8080/bowler/careeravg/';
const API_URL_VSC_BAT = 'http://localhost:8080/batsman/vscountry/';
const API_URL_VSC_BOW = 'http://localhost:8080/bowler/vscountry/';
const API_URL_HVA_BAT = 'http://localhost:8080/batsman/homevsaway/';
const API_URL_HVA_BOW = 'http://localhost:8080/bowler/homevsaway/';
const API_URL_YS_BAT = 'http://localhost:8080/batsman/yearlystats/';
const API_URL_YS_BOW = 'http://localhost:8080/bowler/yearlystats/';

async function fetchFromAPI(url: string, pId: number | undefined) {
    try {
        const response = await fetch(url + pId);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch suggestions from the API');
    }
}
export interface CareerAverageBat {
    pId: number,
    span: string,
    inns: string,
    runs: string,
    hs: string,
    ave: string,
    sr: string,
    _100s: string,
    _50s: string,
    _0s: string,
    _4s: string,
    _6s: string
}
export interface CareerAverageBow {
    pId: number,
    span: string,
    inns: string,
    overs: string,
    mdns: string,
    runs: string,
    wkts: string,
    ave: string,
    econ: string,
    sr: string,
    caught: string,
    bowled: string,
    lbw: string
}
interface YearlyStats {
    pId: number,
    year: string,
    inns: string,
    runs: string,
    hs: string,
    ave: string,
    sr: string
}

interface VsCountry {
    pId: number,
    country: string,
    inns: string,
    runs: string,
    hs: string,
    ave: string,
    sr: string
}

interface HomeVsAway {
    pId: number,
    venue: string, // home away neutral
    inns: string,
    runs: string,
    hs: string,
    ave: string,
    sr: string
}
const initialBarPlotData: BarPlotProps['data'] = [];
const PlayerProfile = () => {
    const [vsCountryDat, setvsCountryDat] = useState<VsCountry>();
    const [vsCountryDatPlot, setvsCountryDatPlot] = useState<BarPlotProps['data']>(initialBarPlotData);
    const context = useContext(PlayerContext);
    const [careerAvgBat, setCareerAvgBat] = useState<CareerAverageBat>();
    const [careerAvgBow, setCareerAvgBow] = useState<CareerAverageBow>();
    // fetch all stats for this player
    // setvsCountryDat(apiData);
    // const barPlotData: BarPlotProps['data'] = apiData.map((dat: VsCountry) => ({
    //     country: dat.country,
    //     initial: 0,
    //     innings: parseInt(dat.inns, 10),
    //     sr: parseFloat(dat.sr),
    // }));
    // setvsCountryDatPlot(barPlotData);
    useEffect(() => {
        console.log(context?.player?.fullName);
        if (context?.player?.roll_id === "BAT") {
            fetchFromAPI(API_URL_CAVG_BAT, context?.player?.pId)
                .then((apiData) => {
                    setCareerAvgBat(apiData[0]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else if (context?.player?.roll_id === "BOW") {
            fetchFromAPI(API_URL_CAVG_BOW, context?.player?.pId)
                .then((apiData) => {
                    setCareerAvgBow(apiData[0]);
                })
                .catch((error) => {
                    console.error(error);
                });

        }
        else if (context?.player?.roll_id === "ALL") {
            const batsmanPromise = fetchFromAPI(API_URL_CAVG_BAT, context?.player?.pId);
            const bowlerPromise = fetchFromAPI(API_URL_CAVG_BOW, context?.player?.pId);
            batsmanPromise.then((apiData) => {
                setCareerAvgBat(apiData[0]);
            }).catch((error) => {
                console.error(error);
            });

            bowlerPromise.then((apiData) => {
                setCareerAvgBow(apiData[0]);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [])
    return (
        <>
            <Header title={context?.player?.fullName as string} />
            <Profileimage player={context?.player as Player} careerAvgBat={careerAvgBat as CareerAverageBat} careerAvgBowl={careerAvgBow as CareerAverageBow} />
        </>

    )
}

export default PlayerProfile