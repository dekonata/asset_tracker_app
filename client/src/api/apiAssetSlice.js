import { emptySplitApi } from './emptySplitApi';

const assetsApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getAssets: builder.query({
			query: () => '/assets/all'
		}),
		getTypeAssets: builder.query({
			query: (asset_type) => `/assets/alltype/${asset_type}`
		}),
		getAssetLists: builder.query({
			query: () => '/assets/assetlists',
			providesTags: ['Assets']
		}),
		getOneAsset: builder.query({
			query: (serialnumber) => `/assets/asset/${serialnumber}`,
			providesTags: ['Asset']
		}),
		addAsset: builder.mutation({
			query: assetData => ({
				url: '/assets/add',
				method: 'POST',
				body: assetData
			}),
			invalidatesTags: ['Assets']
		}),
		addMultipleAssets: builder.mutation({
			query: assetsData => ({
				url: '/assets/addmultiple',
				method: 'POST',
				body: assetsData
			}),
			invalidatesTags: ['Assets']
		}),
		editAsset: builder.mutation({
			query: editData => ({
				url: '/assets/edit',
				method: 'PUT',
				body: editData
			}),
			invalidatesTags: ['Asset']
		}),
		getAssetNotes: builder.query({
			query: (asset_id) => `/assets/notes/${asset_id}`,
			providesTags: ['Assetnotes']
		}),
		addAssetNote: builder.mutation({
			query: noteData => ({
				url: '/assets/addnote',
				method: 'POST',
				body: noteData
			}),
			invalidatesTags: ['Assetnotes']
		}),
		editAssetNote: builder.mutation({
			query: editData => ({
				url: '/assets/editnote',
				method: 'PUT',
				body: editData
			}),
			invalidatesTags: ['Assetnotes']
		}),
		deleteAssetNote: builder.mutation({
			query: note_id => ({
				url: `/assets/delnote/${note_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Assetnotes']
		}),
	})
});

export const { 
	useGetAssetsQuery, 
	useGetTypeAssetsQuery,
	useGetAssetListsQuery,
	useGetOneAssetQuery,
	useAddAssetMutation,
	useAddMultipleAssetsMutation,
	useEditAssetMutation,
	useGetAssetNotesQuery,
	useAddAssetNoteMutation,
	useEditAssetNoteMutation,
	useDeleteAssetNoteMutation,
} = assetsApi;