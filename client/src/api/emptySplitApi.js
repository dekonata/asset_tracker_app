import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setRoute } from '../components/Navibar/navibarSlice'

// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_API_URL;


const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	credentials: 'include',
});
  
// If no Cookie Session API will reject fetch calls with error. 
const baseQueryWithAuth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		alert("You must log in")
		api.dispatch(setRoute('login'));
	}
	return result;
}

export const emptySplitApi = createApi({
	baseQuery: baseQueryWithAuth,
	tagTypes: [
		'Assets', 
		'Assetfields',
		'Assettypes',
		'Asset', 
		'Accessories',
		'Accessory',
		'Cabinets',
		'Location',
		'Locations',
		'Locationlists',
		'Onestaff',
		'Shelves', 
		'Staff', 
		'Transfers', 
		'User',
		'Assetnotes',
		'Typefields',
		'TypeAssets',
		'TypeLists',
		
	],
	endpoints: () => ({}),
})

export default emptySplitApi;