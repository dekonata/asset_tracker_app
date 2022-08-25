import { createSlice } from  '@reduxjs/toolkit'

const initialState = {
	access: 'None'
}

export const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAccess: (state, action) => {
			state.access = action.payload;
		},
	},
});

export const { setAccess } = slice.actions;

export const selectUser = state => state.app.user;

export default slice.reducer;