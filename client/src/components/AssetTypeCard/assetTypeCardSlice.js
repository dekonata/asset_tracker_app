import { createSlice } from  '@reduxjs/toolkit'

// State value is string indicating which view to be displayed
const initialState = {
	typeId: ''
}

export const slice = createSlice({
	name: 'assettype',
	initialState,
	reducers: {
		setAssetType: (state, action) => {
			state.typeId = action.payload;
		},
	},
});

export const { setAssetType } = slice.actions;

export const selectAssetType = state => state.assettype.serial;

export default slice.reducer;