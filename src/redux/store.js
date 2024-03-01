import { configureStore } from '@reduxjs/toolkit'

import tripsReducer from './trips/tripsSlice'

export const store = configureStore({
	reducer: {
		trips: tripsReducer
	}
})