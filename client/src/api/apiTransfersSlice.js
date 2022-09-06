import { emptySplitApi } from './emptySplitApi';

const transfersApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getAssetTransfers: builder.query({
			query: (serialnumber) => `/transfers/asset/${serialnumber}`,
			providesTags: ['Transfers']
		}),
		addAssetTransfer: builder.mutation({
			query: transferData => ({
				url: '/transfers/add',
				method: 'POST',
				body: transferData
			}),
			invalidatesTags: ['Transfers', 'Asset', 'Accessory', 'Onestaff', 'Cabinets', 'Shelves']
		}),
		deleteAssetTransfer: builder.mutation({
			query: transfer_id => ({
				url: `/transfers/deltransfer/${transfer_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Transfers', 'Asset', 'Accessory', 'Onestaff', 'Cabinets', 'Shelves']
		}),
	})
})

export const { useGetAssetTransfersQuery, useAddAssetTransferMutation, useDeleteAssetTransferMutation } = transfersApi;