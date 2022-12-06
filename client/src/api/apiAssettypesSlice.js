import { emptySplitApi } from './emptySplitApi';

const assettypesApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		addAssetType: builder.mutation({
			query: (typeData) => ({
				url: '/assettypes/add',
				method: 'POST',
				body: typeData
			}),
			invalidatesTags: ['Assettypes', 'Assetfields']
		}),
	})
});

export const { 
	useAddAssetTypeMutation,
} = assettypesApi;