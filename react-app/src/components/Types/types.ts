export interface SearchProps {
  onDataReceived: () => void;
}
export interface Player {
  pid: number;
  fullName: string;
  born: string;
  age: string;
  battingStyle: string;
  bowlingStyle: string;
  playingRole: string;
  roll_id: string;
  photoLink: string;
}
interface GeneralPlayerData {
  pid: number;
  inns: string;
  runs: string;
  ave: string;
  sr: string;
}
export interface GeneralBatsmanData extends GeneralPlayerData {
  hs: string;
}

export interface GeneralBowlerData extends GeneralPlayerData {
  overs: string;
  mdns: string;
  wkts: string;
  econ: string;
}

export interface CareerAverageBat extends GeneralBatsmanData {
  span: string;
  _100s: string;
  _50s: string;
  _0s: string;
  _4s: string;
  _6s: string;
}
export interface CareerAverageBow extends GeneralBowlerData {
  span: string;
  caught: string;
  bowled: string;
  lbw: string;
}
export interface overview {
  player: Player;
  careerAvgBat: CareerAverageBat | null;
  careerAvgBowl: CareerAverageBow | null;
}
export interface overviewBat {
  player: Player;
  careerAvg: CareerAverageBat;
}
export interface ChartProps {
  yoyPlotData: YoyPlotProps | undefined;
  vscPlotData: VscPlotProps | undefined;
  hvaPlotData: HvAPlotProps | undefined;
  cenPlotData: PieChartProps | undefined;
}

export type DataItem = {
  name: string;
  value: number;
};

export interface PieChartProps {
  width: number;
  height: number;
  data: DataItem[];
}

export interface Layer {
  layer: string;
  parameter: string;
  value: number;
}

export interface HvAPlotProps {
  data: Array<Array<Layer>>;
}

export interface VscPlotProps {
  data: { country: string; initial: number; innings: number; sr: number }[];
}
export interface YoyPlotProps {
  data: {
    year: string;
    initial: number;
    innings: number;
    ave: number;
    sr: number;
  }[];
}
