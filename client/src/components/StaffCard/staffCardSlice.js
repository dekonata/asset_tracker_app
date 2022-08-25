import { createSlice } from  '@reduxjs/toolkit'

// State value is string indicating which view to be displayed
const initialState = {
	staffId: ''
}

export const slice = createSlice({
	name: 'staff',
	initialState,
	reducers: {
		setStaffId: (state, action) => {
			state.staffId = action.payload;
		},
	},
});

export const { setStaffId } = slice.actions;

export const selectStaffId = state => state.asset.value;

export default slice.reducer;