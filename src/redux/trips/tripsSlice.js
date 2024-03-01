import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = {
	trips: [
		{
			id: nanoid(),
			img: '',
			cityName: 'Berlin',
			startDate: '2023-07-14',
			endDate: '2023-07-21',
			forecast: [
				{
					datetime: '',
					icon: '',
					tempmax: '',
					tempmin: ''
				}
			],
			
		},
	],
}

export const tripsSlice = createSlice({
	name: 'trips',
	initialState,
	reducers: {

	}
})

// export const { } = tripsSlice.action

export default tripsSlice.reducer