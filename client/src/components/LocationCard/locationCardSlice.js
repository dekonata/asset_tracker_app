import { createSlice } from  '@reduxjs/toolkit'

// State value is string indicating which view to be displayed
const initialState = {
	locationId: ''
}

export const slice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		setLocationId: (state, action) => {
			state.locationId = action.payload;
		},
	},
});

export const { setLocationId } = slice.actions;

export const selectLocationId = state => state.asset.value;

export default slice.reducer;