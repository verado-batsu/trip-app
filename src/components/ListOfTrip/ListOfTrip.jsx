import { useEffect, useRef, useState } from 'react';

import { tripsData } from 'data/tripsData';

import { API_KEY } from 'constants/apiKey';

import styles from './ListOfTrip.module.scss';
import axios from 'axios';
import { LeftIcon, RightIcon } from 'assets/images/list-of-trip/icons';
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
        if (offset > Math.floor((listOfTrip.length - 1) / 3) * 808) {
            setOffset(0);
        }
        if (offset < 0) {
            setOffset(Math.floor((listOfTrip.length - 1) / 3) * 808);
        }
        sliderLineRef.current.style.left = -offset + 'px';
    }, [listOfTrip.length, offset]);

    function handleBtnNextClick(e) {
        setOffset(prev => prev + 808);
    }

    function handleBtnPrevClick(e) {
        setOffset(prev => prev - 808);
    }

    return (
        <section className={listOfTripSection}>
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
            <div>
                <button type="button">
                    <span>Add trip</span>
                </button>
            </div>
        </section>
    );
}
