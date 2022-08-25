import { emptySplitApi } from './emptySplitApi';

const locationsApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getAllLocations: builder.query({
			query: () => '/locations/all',
			providesTags: ['Locations']
		}),
		getLocationLists: builder.query({
			query: () => '/locations/locationslists',
			providesTags: ['Locationlists']
		}),
		getOneLocation: builder.query({
			query: (location_id) => `/locations/${location_id}`,
			providesTags: ['Location']
		}),
	})
});

export const { 
	useGetAllLocationsQuery,
	useGetLocationListsQuery,
	useGetOneLocationQuery
} = locationsApi;

