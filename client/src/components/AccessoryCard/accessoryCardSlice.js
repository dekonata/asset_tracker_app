import { createSlice } from  '@reduxjs/toolkit'

const initialState = {
	accId: ''
}

export const slice = createSlice({
	name: 'accessory',
	initialState,
	reducers: {
		setAccessory: (state, action) => {
			state.accId = action.payload;
		},
	},
});

export const { setAccessory } = slice.actions;

export const selectAccessory = state => state.asset.value;

export default slice.reducer;