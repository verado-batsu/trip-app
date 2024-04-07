import { createSlice } from '@reduxjs/toolkit'

import { firstSelectedId } from './tripsSlice'


const initialState = firstSelectedId

export const selectedTripSlice = createSlice({
	name: 'selectedTripId',
	initialState,
	reducers: {
		changeSelectedId: (_, action) => {
			return action.payload
		}
	}
})

export const { changeSelectedId } = selectedTripSlice.actions

export default selectedTripSlice.reducer