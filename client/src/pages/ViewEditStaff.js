import { useDispatch ,useSelector } from 'react-redux';

import SuggestBox from '../components/SuggestBox/SuggestBox';
import StaffCard from '../components/StaffCard/StaffCard'

import { setStaffId } from '../components/StaffCard/staffCardSlice'
import { 
	useGetStaffListsQuery,
	 } 
	 from '../api/apiStaffSlice';

const ViewEditStaff = () => {
	const dispatch = useDispatch();

	const staffId = useSelector(state => state.staff.staffId)
	const {data: stafflists} = useGetStaffListsQuery()

	return (
		<div className="">
			<SuggestBox 
				label="Search by Name:"
				suggestlist={stafflists?.staffList}
				initial_input={staffId}
				handleInputChange={(staffmember) => dispatch(setStaffId((staffmember.substr(5,2))))}
			/>
		{staffId && 
			<div>
	            <button
	                onClick={(() => dispatch(setStaffId('')))}
	                 >BACK
	            </button>
				<StaffCard/>
			</div>
		}
		</div>
	);
}

export default ViewEditStaff;


