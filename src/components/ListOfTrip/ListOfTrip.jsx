import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';

import { addTrip } from '../../redux/trips/tripsSlice';
import { changeSelectedId } from '../../redux/trips/selectedTripSlice';

import { weatherApiConfig } from 'constants/weatherApiConfig';
import { formatDate } from 'helpers';
import defaultImg from '../../assets/images/list-of-trip/default-img.jpg';

import { AddTripBtn } from 'components/AddTripBtn/AddTripBtn';
import { Modal } from 'components/Modal/Modal';

import styles from './ListOfTrip.module.scss';
import { LeftIcon, RightIcon } from 'assets/images/list-of-trip/icons';
const {
    listOfTripSection,
    sliderWrapper,
    sliderOfTrips,
    sliderLine,
    slide,
    slideBtn,
    slideCityImg,
    slideDescrWrapper,
    slideCityName,
    slideTripDate,
    prevSlideBtn,
    prevIcon,
    nextSlideBtn,
    nextIcon,
} = styles;

export function ListOfTrip() {
    const dispatch = useDispatch();

    const [offset, setOffset] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const trips = useSelector(state => state.trips);

    const sliderLineRef = useRef();

    useEffect(() => {
        if (offset > Math.floor((trips.length - 1) / 3) * 888) {
            setOffset(0);
        }
        if (offset < 0) {
            setOffset(Math.floor((trips.length - 1) / 3) * 888);
        }
        sliderLineRef.current.style.left = -offset + 'px';
    }, [trips.length, offset]);

    function openModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    function handleBtnNextClick(e) {
        setOffset(prev => prev + 888);
    }

    function handleBtnPrevClick(e) {
        setOffset(prev => prev - 888);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { country, state, city, startDate, endDate } = e.target;
        const arrayOfValues = [
            country.value,
            state.value,
            city.value,
            startDate.value,
            endDate.value,
        ];
        for (const value of arrayOfValues) {
            if (value.trim() === '') {
                Notify.failure('All fields must be completed');
                return;
            }
        }

        const trip = await getTripForecast(
            city.value,
            startDate.value,
            endDate.value
        );
        dispatch(addTrip(trip));
        closeModal();
    }

    async function getTripForecast(city, date1, date2) {
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

    function onTripClick(id) {
        dispatch(changeSelectedId(id));
    }

    return (
        <section className={listOfTripSection}>
            {showModal && (
                <Modal closeModal={closeModal} handleSubmit={handleSubmit} />
            )}
            <div className={sliderWrapper}>
                <button
                    className={prevSlideBtn}
                    onClick={handleBtnPrevClick}
                    disabled={trips.length < 4 ? true : false}
                >
                    <LeftIcon className={prevIcon} />
                </button>
                <div className={sliderOfTrips}>
                    <ul ref={sliderLineRef} className={sliderLine}>
                        {trips.map(trip => (
                            <li className={slide} key={trip.id}>
                                <button
                                    className={slideBtn}
                                    type="button"
                                    onClick={() => onTripClick(trip.id)}
                                >
                                    <img
                                        className={slideCityImg}
                                        src={trip.img}
                                        alt="imgOfCity"
                                    />
                                    <div className={slideDescrWrapper}>
                                        <p className={slideCityName}>
                                            {trip.cityName}
                                        </p>
                                        <p className={slideTripDate}>
                                            <span>
                                                {formatDate(trip.startDate)}
                                            </span>{' '}
                                            -{' '}
                                            <span>
                                                {formatDate(trip.endDate)}
                                            </span>
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className={nextSlideBtn}
                    onClick={handleBtnNextClick}
                    disabled={trips.length < 4 ? true : false}
                >
                    <RightIcon className={nextIcon} />
                </button>
            </div>
            <AddTripBtn openModal={openModal} />
        </section>
    );
}
