import { SearchIcon } from 'assets/images/search-trip/icons';

import styles from './SearchTrip.module.scss';
const {
    searchTrip,
    searchTitle,
    searchBoldTitle,
    searchLabel,
    searchInput,
    searchIcon,
} = styles;

export function SearchTrip() {
    return (
        <section className={searchTrip}>
            <h1 className={searchTitle}>
                Weather <span className={searchBoldTitle}>Forecast</span>
            </h1>
            <label className={searchLabel}>
                <SearchIcon className={searchIcon} />
                <input
                    className={searchInput}
                    type="text"
                    name="tripCityName"
                    placeholder="Search your trip"
                />
            </label>
        </section>
    );
}
