// import { createSlice, createAsyncThunk } from  '@reduxjs/toolkit'

// // The state values are lists to be used in different Suggest Box dropdown menus 
// const initialState = {
// 		stocklists: [],
// 		locationlists: [],
// }

// // Async Thunk function to fetch list data from backend API. 
// // Thunk implements error handling automatically and provides pending, fullfilled and rejected actions

// export const fetchSuggestLists = createAsyncThunk('suggestBox/fetchSuggestLists', async () => {
// 	try {
// 		const response = 
// 	        await fetch('http://localhost:3000/selectorlists', {
// 	          	method: 'get'})
//       const {locationlists, stocklists} = await response.json()
//       return {locationlists, stocklists}
// 	} catch (err) {
// 		console.log("There was en error fetching suggest lists: ", err)
// 	}

// })

// // Al
// export const slice = createSlice({
// 	name: 'suggesLists',
// 	initialState,
// 	reducers: {
// 		changeSerialList: (state, action) => {
// 			state.serial_list = action.payload;
// 		},
// 	},
// 	extraReducers(builder) {
// 		builder
// 			.addCase(fetchSuggestLists.pending, (state, action) => {
// 				state.locationlists = 'Loading'
// 				state.stocklists = 'Loading'
// 			})
// 			.addCase(fetchSuggestLists.fulfilled, (state, action) => {
// 				state.locationlists = action.payload.locationlists
// 				state.stocklists = action.payload.stocklists
// 			})
// 			.addCase(fetchSuggestLists.rejected, (state, action) => {
// 				state.locationlists = 'Data Unavailable'
// 				state.stocklists = 'Data Unavailable'
// 			})
// 		}	
// });



// export const { changeSerialList } = slice.actions;

// export default slice.reducer;