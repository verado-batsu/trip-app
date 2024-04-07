import { CurrentDayForecast } from 'components/CurrentDayForecast/CurrentDayForecast';
import { ListOfTrip } from 'components/ListOfTrip/ListOfTrip';
import { SearchTrip } from 'components/SearchTrip/SearchTrip';
import { FromToForecast } from 'components/FromToForecast/FromToForecast';

import styles from './ForecastSection.module.scss';
const { forecastSection, forecastSectionWrapper } = styles;

export function ForecastSection() {
    return (
        <section className={forecastSection}>
            <div className={`container ${forecastSectionWrapper}`}>
                <div>
                    <SearchTrip />
                    <ListOfTrip />
                    <FromToForecast />
                </div>
                <CurrentDayForecast />
            </div>
        </section>
    );
}
