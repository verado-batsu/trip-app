import axios from 'axios';

import { weatherApiConfig } from 'constants/weatherApiConfig';
import defaultImg from 'assets/images/list-of-trip/default-img.jpg';

export async function getTripForecast(city, date1, date2) {
        try {
            const { data } = await axios.get(
                `${weatherApiConfig.urlStart}/${city}/${date1}/${date2}${weatherApiConfig.urlEnd}`
            );

            const forecast = data.days.map(
                ({ datetime, icon, tempmax, tempmin }) => {
                    return {
                        datetime,
                        icon,
                        tempmax,
                        tempmin,
                    };
                }
            );

            return {
                img: defaultImg,
                cityName: city,
                startDate: date1,
                endDate: date2,
                forecast,
            };
        } catch (error) {
            console.log(error);
        }
    }