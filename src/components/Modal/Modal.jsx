import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { countryApiConfig } from 'constants/countryApiConfig';
import { CrossIcon } from 'assets/images/modal/icons';

import styles from './Modal.module.scss';
const {
    modalWrapper,
    modal,
    modalHeader,
    modalTitle,
    closeBtn,
    closeIcon,
    formBody,
    modalForm,
    formLabel,
    labelTitle,
    required,
    formInput,
    backdropList,
    backdropItem,
    backdropBtn,
    modalFooter,
    cancelBtn,
    saveBtn,
} = styles;

export function Modal({ closeModal, handleSubmit }) {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({
        name: '',
        iso2: '',
    });
    const [inputCountryIsFocused, setInputCountryIsFocused] = useState(false);
    const [focusedSelectionListOfCountry, setFocusedSelectionListOfCountry] =
        useState(false);
    const [states, setStates] = useState([]);
    const [filteredStates, setFilteredStates] = useState([]);
    const [selectedState, setSelectedState] = useState({
        name: '',
        iso2: '',
    });
    const [inputStateIsFocused, setInputStateIsFocused] = useState(false);
    const [focusedSelectionListOfState, setFocusedSelectionListOfState] =
        useState(false);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [inputCityIsFocused, setInputCityIsFocused] = useState(false);
    const [focusedSelectionListOfCity, setFocusedSelectionListOfCity] =
        useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        function filterCountries() {
            setFilteredCountries([]);

            if (selectedCountry.name.trim() === '') {
                setFilteredCountries(countries);
            } else {
                countries.forEach(country => {
                    if (
                        country.name
                            .substr(0, selectedCountry.name.length)
                            .toLowerCase() === selectedCountry.name
                    ) {
                        setFilteredCountries(prev => [...prev, country]);
                    }
                });
            }
        }

        async function getStates() {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `${countryApiConfig.countryUrl}/${selectedCountry.iso2}/states`,
                    headers: {
                        'X-CSCAPI-KEY': countryApiConfig.API_KEY,
                    },
                });

                setStates(data);
            } catch (error) {
                console.log(error);
            }
        }

        filterCountries();
        if (selectedCountry.iso2 !== '' && selectedCountry.iso2 !== undefined) {
            getStates();
        }
    }, [countries, selectedCountry]);

    useEffect(() => {
        function filterState() {
            setFilteredStates([]);

            if (selectedState.name.trim() === '') {
                setFilteredStates(states);
            } else {
                states.forEach(state => {
                    if (
                        state.name
                            .substr(0, selectedState.name.length)
                            .toLowerCase() === selectedState.name
                    ) {
                        setFilteredStates(prev => [...prev, state]);
                    }
                });
            }
        }

        async function getCities() {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `${countryApiConfig.countryUrl}/${selectedCountry.iso2}/states/${selectedState.iso2}/cities`,
                    headers: {
                        'X-CSCAPI-KEY': countryApiConfig.API_KEY,
                    },
                });

                setCities(data);
            } catch (error) {
                console.log(error);
            }
        }

        filterState();
        if (selectedState.iso2 !== '' && selectedState.iso2 !== undefined) {
            getCities();
        }
    }, [selectedCountry, selectedState.iso2, selectedState.name, states]);

    useEffect(() => {
        function filterCities() {
            setFilteredCities([]);

            if (selectedCity.trim() === '') {
                setFilteredCities(cities);
            } else {
                cities.forEach(city => {
                    if (
                        city.name
                            .substr(0, selectedCity.length)
                            .toLowerCase() === selectedCity
                    ) {
                        setFilteredCities(prev => [...prev, city]);
                    }
                });
            }
        }
        filterCities();
    }, [cities, selectedCity]);

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const currentDate = `${year}-${month}-${day}`;

        const maxDateMiliseconds = date.getTime() + 15 * 24 * 60 * 60 * 1000;
        const maxYear = new Date(maxDateMiliseconds).getFullYear();
        const maxMonth = String(
            new Date(maxDateMiliseconds).getMonth() + 1
        ).padStart(2, '0');
        const maxDay = String(new Date(maxDateMiliseconds).getDate()).padStart(
            2,
            '0'
        );
        const maxDate = `${maxYear}-${maxMonth}-${maxDay}`;

        setCurrentDate(currentDate);
        setMaxDate(maxDate);
    }, []);

    async function getCountries() {
        try {
            const { data } = await axios({
                method: 'get',
                url: countryApiConfig.countryUrl,
                headers: {
                    'X-CSCAPI-KEY': countryApiConfig.API_KEY,
                },
            });

            setCountries(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleBlurCountry() {
        if (!focusedSelectionListOfCountry) {
            setInputCountryIsFocused(false);
        }
    }

    function handleBlurState() {
        if (!focusedSelectionListOfState) {
            setInputStateIsFocused(false);
        }
    }

    function handleBlurCity() {
        if (!focusedSelectionListOfCity) {
            setInputCityIsFocused(false);
        }
    }

    const ModalElement = (
        <>
            <div className={modal}>
                <div className={modalHeader}>
                    <h2 className={modalTitle}>Create trip</h2>
                    <button
                        className={closeBtn}
                        type="button"
                        onClick={closeModal}
                    >
                        <CrossIcon className={closeIcon} />
                    </button>
                </div>

                <form className={modalForm} onSubmit={handleSubmit}>
                    <div className={formBody}>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>Country
                            </span>
                            <input
                                autoComplete="off"
                                className={formInput}
                                type="text"
                                name="country"
                                placeholder="Please select a country"
                                onChange={e =>
                                    setSelectedCountry({ name: e.target.value })
                                }
                                onFocus={e => setInputCountryIsFocused(true)}
                                onBlur={handleBlurCountry}
                                value={selectedCountry.name}
                            />
                            {inputCountryIsFocused && (
                                <ul
                                    className={backdropList}
                                    onMouseEnter={e =>
                                        setFocusedSelectionListOfCountry(true)
                                    }
                                    onMouseLeave={e =>
                                        setFocusedSelectionListOfCountry(false)
                                    }
                                >
                                    {filteredCountries.map(country => (
                                        <li
                                            className={backdropItem}
                                            key={country.id}
                                        >
                                            <button
                                                className={backdropBtn}
                                                type="button"
                                                onClick={e =>
                                                    setSelectedCountry(country)
                                                }
                                            >
                                                {country.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </label>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>State
                            </span>
                            <input
                                autoComplete="off"
                                disabled={
                                    !selectedCountry.iso2 || states.length === 0
                                }
                                className={formInput}
                                type="text"
                                name="state"
                                placeholder="Please select a state"
                                onChange={e =>
                                    setSelectedState({ name: e.target.value })
                                }
                                onFocus={e => setInputStateIsFocused(true)}
                                onBlur={handleBlurState}
                                value={selectedState.name}
                            />
                            {inputStateIsFocused && (
                                <ul
                                    className={backdropList}
                                    onMouseEnter={e =>
                                        setFocusedSelectionListOfState(true)
                                    }
                                    onMouseLeave={e =>
                                        setFocusedSelectionListOfState(false)
                                    }
                                >
                                    {filteredStates.map(state => (
                                        <li
                                            className={backdropItem}
                                            key={state.id}
                                        >
                                            <button
                                                className={backdropBtn}
                                                type="button"
                                                onClick={e =>
                                                    setSelectedState(state)
                                                }
                                            >
                                                {state.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </label>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>City
                            </span>
                            <input
                                autoComplete="off"
                                disabled={
                                    !selectedState.iso2 || cities.length === 0
                                }
                                className={formInput}
                                type="text"
                                name="city"
                                placeholder="Please select a city"
                                onChange={e => setSelectedCity(e.target.value)}
                                onFocus={e => setInputCityIsFocused(true)}
                                onBlur={handleBlurCity}
                                value={selectedCity}
                            />
                            {inputCityIsFocused && (
                                <ul
                                    className={backdropList}
                                    onMouseEnter={e =>
                                        setFocusedSelectionListOfCity(true)
                                    }
                                    onMouseLeave={e =>
                                        setFocusedSelectionListOfCity(false)
                                    }
                                >
                                    {filteredCities.map(city => (
                                        <li
                                            className={backdropItem}
                                            key={city.id}
                                        >
                                            <button
                                                className={backdropBtn}
                                                type="button"
                                                onClick={e =>
                                                    setSelectedCity(city.name)
                                                }
                                            >
                                                {city.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </label>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>Start date
                            </span>
                            <input
                                className={formInput}
                                name="startDate"
                                placeholder="Select date"
                                type="date"
                                onChange={e => setStartDate(e.target.value)}
                                value={startDate}
                                min={currentDate}
                                max={maxDate}
                            />
                        </label>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>End date
                            </span>
                            <input
                                className={formInput}
                                name="endDate"
                                placeholder="Select date"
                                type="date"
                                onChange={e => setEndDate(e.target.value)}
                                value={endDate}
                                min={currentDate}
                                max={maxDate}
                            />
                        </label>
                    </div>
                    <div className={modalFooter}>
                        <button
                            className={cancelBtn}
                            type="button"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button className={saveBtn} type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <div className={modalWrapper} onClick={closeModal}></div>
        </>
    );

    return createPortal(ModalElement, document.getElementById('modal-root'));
}
