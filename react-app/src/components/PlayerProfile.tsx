import { useEffect, useRef, useState } from 'react'
import { Player } from './Searchbar'
import { useContext } from 'react';
import { PlayerContext } from '../App';
import Profileimage from './Profileimage';
import Header from './Header';
import BatsmanCharts from './BatsmanCharts';
import BowlerCharts from './BowlerCharts';
import './PlayerProfile.css'
import { YoyPlotProps } from './YoyPlot';
import { VscPlotProps } from './VscPlot';
import { PieChartProps } from './PieChart';
import { HvAPlotProps } from './RadarChart';
import { Layer } from './RadarChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export const API_URL_CAVG_BAT = 'http://localhost:8080/batsman/careeravg/';
export const API_URL_CAVG_BOW = 'http://localhost:8080/bowler/careeravg/';
const API_URL_VSC_BAT = 'http://localhost:8080/batsman/vscountry/';
const API_URL_VSC_BOW = 'http://localhost:8080/bowler/vscountry/';
const API_URL_HVA_BAT = 'http://localhost:8080/batsman/homevsaway/';
const API_URL_HVA_BOW = 'http://localhost:8080/bowler/homevsaway/';
const API_URL_YS_BAT = 'http://localhost:8080/batsman/yearlystats/';
const API_URL_YS_BOW = 'http://localhost:8080/bowler/yearlystats/';

export async function fetchFromAPI(url: string, pId: number | undefined) {
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
interface GeneralPlayerData {
    pId: number,
    inns: string,
    runs: string,
    ave: string,
    sr: string
}
interface GeneralBatsmanData extends GeneralPlayerData {
    hs: string
}
export interface CareerAverageBat extends GeneralBatsmanData {
    span: string,
    _100s: string,
    _50s: string,
    _0s: string,
    _4s: string,
    _6s: string
}
interface YearlyStats_Batsman extends GeneralBatsmanData {
    year: string,
}

interface VsCountry_Batsman extends GeneralBatsmanData {
    country: string,
}

interface HomeVsAway_Batsman extends GeneralBatsmanData {
    venue: string, // home away neutral
}

interface GeneralBowlerData extends GeneralPlayerData {
    overs: string,
    mdns: string,
    wkts: string,
    econ: string,
}
export interface CareerAverageBow extends GeneralBowlerData {
    span: string,
    caught: string,
    bowled: string,
    lbw: string
}

interface HomeVsAway_Bowler extends GeneralBowlerData {
    venue: string,
}
interface VsCountry_Bowler extends GeneralBowlerData {
    country: string,
}

interface YearlyStats_Bowler extends GeneralBowlerData {
    year: string,
}
const PlayerProfile = () => {
    const context = useContext(PlayerContext);
    const [careerAvgBat, setCareerAvgBat] = useState<CareerAverageBat>();
    const [careerAvgBow, setCareerAvgBow] = useState<CareerAverageBow>();

    const [yoyBat, setYoyBat] = useState<YoyPlotProps>();
    const [vscBat, setVscBat] = useState<VscPlotProps>();
    const [hvaBat, setHvaBat] = useState<HvAPlotProps>();
    const [pieBat, setPieBat] = useState<PieChartProps>();

    const [yoyBowl, setYoyBowl] = useState<YoyPlotProps>();
    const [vscBowl, setVscBowl] = useState<VscPlotProps>();
    const [hvaBowl, setHvaBowl] = useState<HvAPlotProps>();
    const [pieBowl, setPieBowl] = useState<PieChartProps>();
    const pdfRef = useRef(null);
    // const handleDownload = () => {
    //     const content = pdfRef.current;

    //     if (content) {
    //         html2canvas(content).then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF('p', 'mm', 'a4', true);
    //             pdf.addImage(imgData, 'PNG', 0, 0);
    //             pdf.save('download.pdf');
    //         });
    //     }
    // };
    const fetchBatsmanData = () => {
        const cavgPromise = fetchFromAPI(API_URL_CAVG_BAT, context?.player?.pId);
        const yoyPromise = fetchFromAPI(API_URL_YS_BAT, context?.player?.pId);
        const vscPromise = fetchFromAPI(API_URL_VSC_BAT, context?.player?.pId);
        const hvaPromise = fetchFromAPI(API_URL_HVA_BAT, context?.player?.pId);
        let piePlotData: PieChartProps | undefined;
        let yoyPlotData: YoyPlotProps | undefined;
        let vscPlotData: VscPlotProps | undefined;
        let hvaPlotData: HvAPlotProps | undefined;

        cavgPromise.then((apiData) => {
            piePlotData = {
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
            setPieBat(piePlotData);
            setCareerAvgBat(apiData[0]);
        }).catch((error) => {
            console.error(error);
        });
        yoyPromise.then((apiData) => {
            yoyPlotData = {
                data: apiData.map((dat: YearlyStats_Batsman) => ({
                    year: dat.year.substring(5),
                    initial: 0,
                    innings: parseInt(dat.inns, 10),
                    ave: parseInt(dat.ave, 10),
                    sr: parseFloat(dat.sr),
                }))
            };
            setYoyBat(yoyPlotData);
        }).catch((error) => {
            console.error(error);
        });
        vscPromise.then((apiData) => {
            vscPlotData = {
                data: apiData.map((dat: VsCountry_Batsman) => ({
                    country: dat.country,
                    initial: 0,
                    innings: parseInt(dat.inns, 10),
                    sr: parseFloat(dat.sr),
                }))
            };
            setVscBat(vscPlotData);
        }).catch((error) => {
            console.error(error);
        });

        hvaPromise.then((apiData) => {
            hvaPlotData = {
                data: apiData.reduce((result: Array<Array<Layer>>, item: HomeVsAway_Batsman) => {
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
            setHvaBat(hvaPlotData);
        }).catch((error) => {
            console.error(error);
        });
    }

    const fetchBowlerData = () => {
        const cavgPromise = fetchFromAPI(API_URL_CAVG_BOW, context?.player?.pId);
        const yoyPromise = fetchFromAPI(API_URL_YS_BOW, context?.player?.pId);
        const vscPromise = fetchFromAPI(API_URL_VSC_BOW, context?.player?.pId);
        const hvaPromise = fetchFromAPI(API_URL_HVA_BOW, context?.player?.pId);
        let piePlotData: PieChartProps | undefined;
        let yoyPlotData: YoyPlotProps | undefined;
        let vscPlotData: VscPlotProps | undefined;
        let hvaPlotData: HvAPlotProps | undefined;

        cavgPromise.then((apiData) => {
            piePlotData = {
                data: [
                    { name: "Caught", value: parseInt(apiData[0].caught, 10) },
                    { name: "bowled", value: parseInt(apiData[0].bowled, 10) },
                    { name: "lbw", value: parseInt(apiData[0].lbw, 10) }
                ],
                width: 300,
                height: 300
            };
            setPieBowl(piePlotData);
            setCareerAvgBow(apiData[0]);
        }).catch((error) => {
            console.error(error);
        });
        yoyPromise.then((apiData) => {
            yoyPlotData = {
                data: apiData.map((dat: YearlyStats_Bowler) => ({
                    year: dat.year.substring(5),
                    initial: 0,
                    innings: parseInt(dat.inns, 10),
                    ave: parseInt(dat.ave, 10),
                    sr: parseFloat(dat.sr),
                }))
            };
            setYoyBowl(yoyPlotData);
        }).catch((error) => {
            console.error(error);
        });
        vscPromise.then((apiData) => {
            vscPlotData = {
                data: apiData.map((dat: VsCountry_Bowler) => ({
                    country: dat.country,
                    initial: 0,
                    innings: parseInt(dat.inns, 10),
                    sr: parseFloat(dat.sr),
                }))
            };
            setVscBowl(vscPlotData);
        }).catch((error) => {
            console.error(error);
        });

        hvaPromise.then((apiData) => {
            hvaPlotData = {
                data: apiData.reduce((result: Array<Array<Layer>>, item: HomeVsAway_Bowler) => {
                    const layer_p1: Layer = { layer: item.venue, parameter: "Innings", value: Number(item.inns) };
                    result.push([layer_p1]);
                    const venueIndex = result.findIndex(venueData => venueData[0]?.layer === item.venue);
                    const layer_p2: Layer = { layer: item.venue, parameter: "Maidens", value: Number(item.mdns) };
                    const layer_p3: Layer = { layer: item.venue, parameter: "Wickets", value: Number(item.wkts) };
                    const layer_p4: Layer = { layer: item.venue, parameter: "Average", value: Number(item.ave) };
                    const layer_p5: Layer = { layer: item.venue, parameter: "Economy", value: Number(item.econ) };
                    result[venueIndex].push(layer_p2);
                    result[venueIndex].push(layer_p3);
                    result[venueIndex].push(layer_p4);
                    result[venueIndex].push(layer_p5);
                    return result;
                }, [])
            };
            setHvaBowl(hvaPlotData);
        }).catch((error) => {
            console.error(error);
        });
    }

    // fetch all stats for this player
    useEffect(() => {
        if (context?.player?.roll_id === "BAT") {
            fetchBatsmanData();
        }
        else if (context?.player?.roll_id === "BOW") {
            fetchBowlerData();
        }
        else if (context?.player?.roll_id === "ALL") {
            fetchBatsmanData();
            fetchBowlerData();
        }
    }, [])
    return (
        <>
            <Header title={context?.player?.fullName as string} />
            <Profileimage player={context?.player as Player} careerAvgBat={careerAvgBat as CareerAverageBat} careerAvgBowl={careerAvgBow as CareerAverageBow} />
            {vscBat && vscBowl && <Header title='Batting Figures' />}
            {vscBat && <BatsmanCharts vscPlotData={vscBat} yoyPlotData={yoyBat} hvaPlotData={hvaBat} cenPlotData={pieBat} />}
            {vscBat && vscBowl && <Header title='Bowling Figures' />}
            {vscBowl && <BowlerCharts vscPlotData={vscBowl} yoyPlotData={yoyBowl} hvaPlotData={hvaBowl} cenPlotData={pieBowl} />}
        </>
    )
}

export default PlayerProfile