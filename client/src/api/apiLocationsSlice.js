import { emptySplitApi } from './emptySplitApi';

const locationsApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		addLocation: builder.mutation({
			query: assetData => ({
				url: '/locations/add',
				method: 'POST',
				body: assetData
			})
		}),
		getLocationIdList: builder.query({
			query: (location_type) => `/locations/typeids/${location_type}`,
			providesTags: ['Locations']
		}),
		getAllLocations: builder.query({
			query: () => '/locations/all',
			providesTags: ['Locations']
		}),
		getLocationLists: builder.query({
			query: () => '/locations/locationslists',
			providesTags: ['Locationlists']
		}),
		getOneLocation: builder.query({
			query: (location_id) => `/locations/location/${location_id}`,
			providesTags: ['Location']
		}),
	})
});

export const { 
	useAddLocationMutation,
	useGetLocationIdListQuery,
	useGetAllLocationsQuery,
	useGetLocationListsQuery,
	useGetOneLocationQuery
} = locationsApi;

