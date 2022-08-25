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
	})
})

export const { useGetAssetTransfersQuery, useAddAssetTransferMutation } = transfersApi;