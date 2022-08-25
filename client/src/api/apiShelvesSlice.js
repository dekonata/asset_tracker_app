import { emptySplitApi } from './emptySplitApi';

const shelvesApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getShelfLists: builder.query({
			query: () => '/shelves/shelflists',
			providesTags: ['Shelves']
		}),
		addShelf: builder.mutation({
			query: shelfData => ({
				url: '/shelves/add',
				method: 'POST',
				body: shelfData
			}),
			invalidatesTags: ['Shelves']
		})
	})
})

export const { useGetShelfListsQuery, useAddShelfMutation } = shelvesApi;