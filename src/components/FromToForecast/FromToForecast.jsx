import { useSelector } from 'react-redux';

import styles from './FromToForecast.module.scss';
const { fromToForecastSection, fromToForecastTitle, fromToForecastList } =
    styles;

export function FromToForecast() {
    const trips = useSelector(state => state.trips);
    const selectedTripId = useSelector(state => state.selectedTripId);

    const selectedTrip = trips.find(trip => trip.id === selectedTripId);

    console.log(selectedTrip);

    return (
        <section className={fromToForecastSection}>
            <h2 className={fromToForecastTitle}>Week</h2>
			<ul className={fromToForecastList}>{selectedTrip.forecast.map(forecast => {
				<li className={}>

				</li>
			})}</ul>
        </section>
    );
}
