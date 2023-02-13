import { emptySplitApi } from './emptySplitApi';

const assettypesApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		addAssetType: builder.mutation({
			query: (typeData) => ({
				url: '/assettypes/add',
				method: 'POST',
				body: typeData
			}),
			invalidatesTags: ['Assettypes', 'Typefields']
		}),
		getAllAssettypes: builder.query({
			query: () => `/assettypes/all`,
			providesTags: ['Assettypes']
		}),
		getAssettypeFields: builder.query({
			query: (assettype) => `/assettypes/fields/${assettype}`,
			providesTags: ['Typefields']
		}),
		getTypeAssets: builder.query({
			query: (assettype) => `/assettypes/assets/${assettype}`,
			providesTags: ['TypeAssets']
		}),
		getTypeLists: builder.query({
			query: (assettype) => `/assettypes/suggestlists/${assettype}`,
			providesTags: ['TypeLists']
		})
	})
});

export const { 
	useAddAssetTypeMutation,
	useGetAllAssettypesQuery,
	useGetAssettypeFieldsQuery,
	useGetTypeAssetsQuery,
	useGetTypeListsQuery,
} = assettypesApi;