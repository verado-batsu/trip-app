import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import defaultImg from '../../assets/images/list-of-trip/default-img.jpg'

const initialState = [
	{
		id: nanoid(),
		img: defaultImg,
		cityName: 'Berlin',
		startDate: '2024-03-14',
		endDate: '2024-03-14',
		forecast: [
			{
				datetime: '2024-03-14',
				icon: 'partly-cloudy-day',
				tempmax: '6.4',
				tempmin: '-1.3'
			}
		],
	},
]

export const tripsSlice = createSlice({
	name: 'trips',
	initialState,
	reducers: {
		addTrip: (state, action) => {
			return [
				...state,
				{
					...action.payload,
					id: nanoid(),
				}
			]
		}
	}
})

export const { addTrip } = tripsSlice.actions

export default tripsSlice.reducer

export const firstSelectedId = initialState[0].id