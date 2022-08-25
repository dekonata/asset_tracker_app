import { emptySplitApi } from './emptySplitApi';

const staffApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		getStaffLists: builder.query({
			query: () => '/staff/stafflists',
			providesTags: ['Staff']
		}),
		getOneStaff: builder.query({
			query: (staff_id) => `/staff/one/${staff_id}`,
			providesTags: ['Onestaff']
		}),
		addStaff: builder.mutation({
			query: staffData => ({
				url: '/staff/add',
				method: 'POST',
				body: staffData
			}),
			invalidatesTags: ['Staff']
		}),
		editStaff: builder.mutation({
			query: editData => ({
				url: '/staff/edit',
				method: 'PUT',
				body: editData
			}),
			invalidatesTags: ['Onestaff', 'Staff']
		}),
		changeStaffPw: builder.mutation({
			query: editData => ({
				url: '/staff/editpw',
				method: 'PUT',
				body: editData
			}),
			invalidatesTags: ['Onestaff', 'Staff']
		})
	})
})

export const { 
	useGetStaffListsQuery, 
	useGetOneStaffQuery, 
	useAddStaffMutation, 
	useEditStaffMutation,
	useChangeStaffPwMutation
} = staffApi;