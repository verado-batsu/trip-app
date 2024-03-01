const API_KEY = "E6YQNVUMU9ZMG64RLFJBUL5DT"

export const weatherApiConfig = {
	urlStart: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
	urlEnd: `?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
}