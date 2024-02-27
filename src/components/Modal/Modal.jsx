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
    formSelect,
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
    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry === '') {
            return;
        }

        async function getStates() {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `${countryApiConfig.countryUrl}/${selectedCountry}/states`,
                    headers: {
                        'X-CSCAPI-KEY': countryApiConfig.API_KEY,
                    },
                });

                setStates(data);
            } catch (error) {
                console.log(error);
            }
        }

        getStates();
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState === '') {
            return;
        }

        async function getCities() {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `${countryApiConfig.countryUrl}/${selectedCountry}/states/${selectedState}/cities`,
                    headers: {
                        'X-CSCAPI-KEY': countryApiConfig.API_KEY,
                    },
                });

                setCities(data);
            } catch (error) {
                console.log(error);
            }
        }

        getCities();
    }, [selectedCountry, selectedState]);

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
                                className={formInput}
                                type="text"
                                name="country"
                                placeholder="Please select a country"
                                onChange={e =>
                                    setSelectedCountry(e.target.value)
                                }
                                value={selectedCountry}
                            />
                            {selectedCountry && (
                                <ul className={backdropList}>
                                    {/* <li className={backdropItem}>
                                        Please select a country
                                    </li> */}
                                    {countries.map(country => (
                                        <li
                                            className={backdropItem}
                                            key={country.id}
                                        >
                                            <button
                                                className={backdropBtn}
                                                type="button"
                                                value={country.iso2}
                                            >
                                                {country.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {/* <select
                                className={formSelect}
                                name="country"
                                defaultValue="Please select a country"
                                onChange={e =>
                                    setSelectedCountry(e.target.value)
                                }
                            >
                                <option value="Please select a country">
                                    Please select a country
                                </option>
                                {countries.map(country => (
                                    <option
                                        key={country.id}
                                        value={country.iso2}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select> */}
                        </label>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>State
                            </span>
                            <select
                                className={formSelect}
                                name="state"
                                defaultValue="Please select a state"
                                onChange={e => setSelectedState(e.target.value)}
                            >
                                <option value="Please select a state">
                                    Please select a state
                                </option>
                                {states.map(state => (
                                    <option key={state.id} value={state.iso2}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>City
                            </span>
                            <select
                                className={formSelect}
                                name="city"
                                defaultValue="Please select a city"
                                onChange={e => setSelectedCity(e.target.value)}
                                value={selectedCity}
                            >
                                <option value="Please select a city">
                                    Please select a city
                                </option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
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
