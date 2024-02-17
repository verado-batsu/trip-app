import './App.scss';

import { SearchTrip } from 'components/SearchTrip/SearchTrip';
import { ListOfTrip } from 'components/ListOfTrip/ListOfTrip';
import { WeeklyForecast } from 'components/WeeklyForecast/WeeklyForecast';

function App() {
    return (
        <>
            <SearchTrip />
            <ListOfTrip />
            <WeeklyForecast />
        </>
    );
}

export default App;
