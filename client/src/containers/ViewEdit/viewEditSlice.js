import { createSlice } from  '@reduxjs/toolkit'

const initialState = {
	page: ''
}

export const slice = createSlice({
	name: 'viewedit',
	initialState,
	reducers: {
		setViewEditPage: (state, action) => {
			state.page = action.payload;
		},
	},
});

export const { setViewEditPage } = slice.actions;

export const selectViewEditPage = state => state.viewedit.page;

export default slice.reducer;