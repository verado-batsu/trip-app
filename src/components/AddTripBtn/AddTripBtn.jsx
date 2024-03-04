import { AddIcon } from 'assets/images/add-trip-btn/icons';

import styles from './AddTripBtn.module.scss';
const { addTripBtn, addTripBtnIcon, addTripBtnText } = styles;

export function AddTripBtn({ openModal }) {
    return (
        <button className={addTripBtn} type="button" onClick={openModal}>
            <AddIcon className={addTripBtnIcon} />
            <span className={addTripBtnText}>Add trip</span>
        </button>
    );
}
