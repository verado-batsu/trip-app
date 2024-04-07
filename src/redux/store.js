import { configureStore } from '@reduxjs/toolkit'

import tripsReducer from './trips/tripsSlice'
import selectedTripReducer from './trips/selectedTripSlice'

export const store = configureStore({
	reducer: {
		trips: tripsReducer,
		selectedTripId: selectedTripReducer
	}
})