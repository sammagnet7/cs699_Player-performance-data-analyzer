import React, { useEffect, useState } from 'react'
import { Player } from './Searchbar'
import { useContext } from 'react';
import { PlayerContext } from '../App';
import { BatsmanChartProps } from './BatsmanCharts';
import { VscPlotProps } from './VscPlot';
import { PieChartProps } from './PieChart';
import Profileimage from './Profileimage';
import Header from './Header';
import BatsmanCharts from './BatsmanCharts';
import './PlayerProfile.css'
import { YoyPlotProps } from './YoyPlot';
import { HvAPlotProps } from './RadarChart';
import { Layer } from './RadarChart';
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
const initialBatsmanPlotData: BatsmanChartProps = { yoyPlotData: undefined, vscPlotData: undefined, hvaPlotData: undefined, cenPlotData: undefined };
const initialVscPlotData: VscPlotProps = { data: [] };
const initialYoyPlotData: YoyPlotProps = { data: [] };
const initialHvAPlotData: HvAPlotProps = { data: [[], []] };
const initialCenPlotData: PieChartProps = { data: [], width: 0, height: 0 };
const PlayerProfile = () => {
    const [batsmanChartDat, setBatsmanChartDat] = useState<BatsmanChartProps>(initialBatsmanPlotData);
    const [vscChartDat, setVscChartDat] = useState<VscPlotProps>(initialVscPlotData);
    const [yoyChartDat, setYoyChartDat] = useState<YoyPlotProps>(initialYoyPlotData);
    const [hvAChartDat, setHvAChartDat] = useState<HvAPlotProps>(initialHvAPlotData);
    const [cenChartDat, setCenChartDat] = useState<PieChartProps>(initialCenPlotData);

    const context = useContext(PlayerContext);
    const [careerAvgBat, setCareerAvgBat] = useState<CareerAverageBat>();
    const [careerAvgBow, setCareerAvgBow] = useState<CareerAverageBow>();
    // fetch all stats for this player
    useEffect(() => {
        console.log(context?.player?.fullName);
        if (context?.player?.roll_id === "BAT") {
            const cavgPromise = fetchFromAPI(API_URL_CAVG_BAT, context?.player?.pId);
            const yoyPromise = fetchFromAPI(API_URL_YS_BAT, context?.player?.pId);
            const vscPromise = fetchFromAPI(API_URL_VSC_BAT, context?.player?.pId);
            const hvaPromise = fetchFromAPI(API_URL_HVA_BAT, context?.player?.pId);
            cavgPromise.then((apiData) => {
                const piePlotData: PieChartProps = {
                    data: [
                        { name: "100+", value: parseInt(apiData[0]._100s, 10) },
                        { name: "50-99", value: parseInt(apiData[0]._50s, 10) },
                        {
                            name: "<50",
                            value: parseInt(apiData[0].inns, 10) - (parseInt(apiData[0]._100s, 10) + parseInt(apiData[0]._50s, 10)),
                        }
                    ],
                    width: 300,
                    height: 300
                };
                setCenChartDat(piePlotData);
                setCareerAvgBat(apiData[0]);
            }).catch((error) => {
                console.error(error);
            });
            yoyPromise.then((apiData) => {
                const barPlotData: YoyPlotProps = {
                    data: apiData.map((dat: YearlyStats) => ({
                        year: dat.year.substring(5),
                        initial: 0,
                        innings: parseInt(dat.inns, 10),
                        ave: parseInt(dat.ave, 10),
                        sr: parseFloat(dat.sr),
                    }))
                };
                setYoyChartDat(barPlotData);
            }).catch((error) => {
                console.error(error);
            });
            vscPromise.then((apiData) => {
                const barPlotData: VscPlotProps = {
                    data: apiData.map((dat: VsCountry) => ({
                        country: dat.country,
                        initial: 0,
                        innings: parseInt(dat.inns, 10),
                        sr: parseFloat(dat.sr),
                    }))
                };
                setVscChartDat(barPlotData);
            }).catch((error) => {
                console.error(error);
            });

            hvaPromise.then((apiData) => {
                const radarPlotData: HvAPlotProps = {
                    data: apiData.reduce((result: Array<Array<Layer>>, item: HomeVsAway) => {
                        const layer_p1: Layer = { layer: item.venue, parameter: "Runs", value: Number(item.runs) };
                        result.push([layer_p1]);
                        const venueIndex = result.findIndex(venueData => venueData[0]?.layer === item.venue);
                        const layer_p2: Layer = { layer: item.venue, parameter: "Innings", value: Number(item.inns) };
                        const layer_p3: Layer = { layer: item.venue, parameter: "Strike Rate", value: Number(item.sr) };
                        const layer_p4: Layer = { layer: item.venue, parameter: "Average", value: Number(item.ave) };
                        const layer_p5: Layer = { layer: item.venue, parameter: "High Score", value: Number(item.hs.replace(/\D/g, '')) };
                        result[venueIndex].push(layer_p2);
                        result[venueIndex].push(layer_p3);
                        result[venueIndex].push(layer_p4);
                        result[venueIndex].push(layer_p5);
                        return result;
                    }, [])
                };
                setHvAChartDat(radarPlotData);
            }).catch((error) => {
                console.error(error);
            });
            setBatsmanChartDat({ yoyPlotData: yoyChartDat, vscPlotData: vscChartDat, hvaPlotData: hvAChartDat, cenPlotData: cenChartDat });
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
            <BatsmanCharts vscPlotData={vscChartDat} yoyPlotData={yoyChartDat} hvaPlotData={hvAChartDat} cenPlotData={cenChartDat} />
        </>
    )
}

export default PlayerProfile