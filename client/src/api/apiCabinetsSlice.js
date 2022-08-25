import { emptySplitApi } from './emptySplitApi';

const cabinetsApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getCabinetLists: builder.query({
			query: () => '/cabinets/cabinetlists',
			providesTags: ['Cabinets']
		}),
		addCabinet: builder.mutation({
			query: cabinetData => ({
				url: '/cabinets/add',
				method: 'POST',
				body: cabinetData
			}),
			invalidatesTags: ['Cabinets']
		})
	})
})

export const { useGetCabinetListsQuery, useAddCabinetMutation } = cabinetsApi;