export const API_BASE = "http://localhost:8080";
export const API_URL_OVERVIEW = "/overview/all";
export const API_URL_CAVG_BAT = "/batsman/careeravg/";
export const API_URL_CAVG_BOW = "/bowler/careeravg/";
export const API_URL_VSC_BAT = "/batsman/vscountry/";
export const API_URL_VSC_BOW = "/bowler/vscountry/";
export const API_URL_HVA_BAT = "/batsman/homevsaway/";
export const API_URL_HVA_BOW = "/bowler/homevsaway/";
export const API_URL_YS_BAT = "/batsman/yearlystats/";
export const API_URL_YS_BOW = "/bowler/yearlystats/";
export const API_URL_CSV_UPLOAD = "/csv/upload";
export const API_URL_CSV_DOWNLOAD = "/csv/download";
export const CACHE_KEY = "predefinedSuggestions";

export async function fetchFromAPI(url: string, pId: number | undefined) {
  try {
    const response = await fetch(url + pId);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch from the API");
  }
}

export function getFromLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}
