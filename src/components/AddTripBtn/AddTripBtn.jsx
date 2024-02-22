export function AddTripBtn({ openModal }) {
    return (
        <div>
            <button type="button" onClick={openModal}>
                <span>Add trip</span>
            </button>
        </div>
    );
}
