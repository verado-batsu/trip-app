export function getMaxDate(maxDays) {
	const date = new Date();

	const maxDateMiliseconds = date.getTime() + maxDays * 24 * 60 * 60 * 1000;

	const maxYear = new Date(maxDateMiliseconds).getFullYear();
	
    const maxMonth = String(new Date(maxDateMiliseconds).getMonth() + 1).padStart(2, '0');
	
    const maxDay = String(new Date(maxDateMiliseconds).getDate()).padStart(2, '0');

    return `${maxYear}-${maxMonth}-${maxDay}`;
}