import { CurrentDayForecast } from 'components/CurrentDayForecast/CurrentDayForecast';
import { ListOfTrip } from 'components/ListOfTrip/ListOfTrip';
import { SearchTrip } from 'components/SearchTrip/SearchTrip';
import { WeeklyForecast } from 'components/WeeklyForecast/WeeklyForecast';

import styles from './ForecastSection.module.scss';
const { forecastSection, forecastSectionWrapper } = styles;

export function ForecastSection() {
    return (
        <section className={forecastSection}>
            <div className={`container ${forecastSectionWrapper}`}>
                <div>
                    <SearchTrip />
                    <ListOfTrip />
                    <WeeklyForecast />
                </div>
                <CurrentDayForecast />
            </div>
        </section>
    );
}
