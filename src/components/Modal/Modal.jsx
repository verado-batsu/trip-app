import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { config } from 'constants/config';
import { CrossIcon } from 'assets/images/modal/icons';

import styles from './Modal.module.scss';
const {
    modalWrapper,
    modal,
    modalHeader,
    modalTitle,
    closeBtn,
    closeIcon,
    modalBody,
    modalForm,
    formLabel,
    labelTitle,
    required,
    formSelect,
    formInput,
    modalFooter,
    cancelBtn,
    saveBtn,
} = styles;

export function Modal({ closeModal }) {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);

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
                    url: `${config.countryUrl}/${selectedCountry}/states`,
                    headers: {
                        'X-CSCAPI-KEY': config.API_KEY,
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
                    url: `${config.countryUrl}/${selectedCountry}/states/${selectedState}/cities`,
                    headers: {
                        'X-CSCAPI-KEY': config.API_KEY,
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
                url: config.countryUrl,
                headers: {
                    'X-CSCAPI-KEY': config.API_KEY,
                },
            });

            setCountries(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleCountyChange(e) {
        setSelectedCountry(e.target.value);
    }

    function handleStateChange(e) {
        setSelectedState(e.target.value);
    }

    console.log(cities);

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
                <div className={modalBody}>
                    <form className={modalForm}>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>Country
                            </span>
                            <select
                                className={formSelect}
                                name="country"
                                defaultValue="Please select a country"
                                onChange={handleCountyChange}
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
                            </select>
                        </label>
                        <label className={formLabel}>
                            <span className={labelTitle}>
                                <span className={required}>*</span>State
                            </span>
                            <select
                                className={formSelect}
                                name="state"
                                defaultValue="Please select a state"
                                onChange={handleStateChange}
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
                            >
                                <option value="Please select a city">
                                    Please select a city
                                </option>
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
                            />
                        </label>
                    </form>
                </div>
                <div className={modalFooter}>
                    <button
                        className={cancelBtn}
                        type="button"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button className={saveBtn} type="button">
                        Save
                    </button>
                </div>
            </div>
            <div className={modalWrapper} onClick={closeModal}></div>
        </>
    );

    return createPortal(ModalElement, document.getElementById('modal-root'));
}
