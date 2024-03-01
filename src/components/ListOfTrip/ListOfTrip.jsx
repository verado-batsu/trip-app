import { useEffect, useRef, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { tripsData } from 'data/tripsData';

import { AddTripBtn } from 'components/AddTripBtn/AddTripBtn';

import styles from './ListOfTrip.module.scss';
import { LeftIcon, RightIcon } from 'assets/images/list-of-trip/icons';
import { Modal } from 'components/Modal/Modal';
const {
    listOfTripSection,
    sliderWrapper,
    sliderOfTrips,
    sliderLine,
    slide,
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
    const [listOfTrip, setListOfTrip] = useState(tripsData);
    const [offset, setOffset] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const sliderLineRef = useRef();

    // axios
    //     .get(
    //         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Berlin/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
    //     )
    //     .then(res => {
    //         console.log(res.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    useEffect(() => {
        if (offset > Math.floor((listOfTrip.length - 1) / 3) * 888) {
            setOffset(0);
        }
        if (offset < 0) {
            setOffset(Math.floor((listOfTrip.length - 1) / 3) * 888);
        }
        sliderLineRef.current.style.left = -offset + 'px';
    }, [listOfTrip.length, offset]);

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

    function handleSubmit(e) {
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

        console.log('city-', city.value);
        console.log('startDate-', startDate.value);
        console.log('endDate-', endDate.value);

        closeModal();
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
                    disabled={listOfTrip.length < 4 ? true : false}
                >
                    <LeftIcon className={prevIcon} />
                </button>
                <div className={sliderOfTrips}>
                    <ul ref={sliderLineRef} className={sliderLine}>
                        {listOfTrip.map(trip => (
                            <li className={slide} key={trip.id}>
                                <img
                                    className={slideCityImg}
                                    src=""
                                    alt="imgOfCity"
                                />
                                <div className={slideDescrWrapper}>
                                    <p className={slideCityName}>
                                        {trip.cityName}
                                    </p>
                                    <p className={slideTripDate}>
                                        <span>{trip.startDate}</span> -{' '}
                                        <span>{trip.endDate}</span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className={nextSlideBtn}
                    onClick={handleBtnNextClick}
                    disabled={listOfTrip.length < 4 ? true : false}
                >
                    <RightIcon className={nextIcon} />
                </button>
            </div>
            <AddTripBtn openModal={openModal} />
        </section>
    );
}
