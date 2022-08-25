import { emptySplitApi } from './emptySplitApi';

const accessoriesApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getAccessories: builder.query({
			query: () => '/accessories/all',
			providesTags: ['Accessories']
		}),
		getOneAccessory: builder.query({
			query: (accid) => `/accessories/one/${accid}`,
			providesTags: ['Accessory']
		}),
		editAccessory: builder.mutation({
			query: editData => ({
				url: '/accessories/edit',
				method: 'PUT',
				body: editData
			}),
			invalidatesTags: ['Accessory']
		})

	})
});

export const {
	useGetAccessoriesQuery,
	useGetOneAccessoryQuery,
	useEditAccessoryMutation,
} = accessoriesApi;
