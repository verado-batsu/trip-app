import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  trips: [],
}

export const tripsSlice = createSlice({
	name: 'trips',
	initialState,
	reducers: {

	}
})

export const { } = tripsSlice.action

export default tripsSlice.reducer