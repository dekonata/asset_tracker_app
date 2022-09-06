import { createSlice } from  '@reduxjs/toolkit'

// State value is string indicating which view to be displayed
const initialState = {
	value: ''
}

export const slice = createSlice({
	name: 'navibar',
	initialState,
	reducers: {
		setRoute: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setRoute } = slice.actions;

export const selectRoute = state => state.route.value;

export default slice.reducer;