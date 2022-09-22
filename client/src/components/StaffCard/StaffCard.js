import React,{useState} from 'react';
import { useSelector } from 'react-redux';

import ViewEditField from '../ViewEditField/ViewEditField';
import AssetList from '../AssetList/AssetList';
import LocationAccessoryList from '../LocationAccessoryList/LocationAccessoryList';

import { 
	useGetOneStaffQuery, 
	useEditStaffMutation,
	useChangeStaffPwMutation
} from '../../api/apiStaffSlice'

const StaffCard = () => {
	const [newPassword, setNewPassword] = useState('')

	const staffId = useSelector(state => state.staff.staffId);
	const {access} = useSelector(state => state.user)

	const {data: staffMember, isSuccess, refetch} = useGetOneStaffQuery(staffId);
	const [ editStaff ] = useEditStaffMutation();
	const [ changePW ]  = useChangeStaffPwMutation();

	const handleEdit = async (data_field, editvalue) => {
		const editData = {
			location_type_id: staffMember.location_type_id,
			payload: {
				[data_field]: editvalue
			}
		};

		try {
			const edit = await editStaff(editData).unwrap();
			refetch();
			alert(edit);

		} catch(err) {
			if(Number(err.data.code) === 23505) {
				alert("Email already in use")
			}
			console.log(err);
		}
	}

	const handleChangePw = async (event) => {
		event.preventDefault();

		const editData = {
			location_type_id: staffId,
			password: newPassword
		};

		try {
			const edit = await changePW(editData).unwrap();
			refetch();
			setNewPassword('')
			alert(edit)
		} catch (err) {
			alert('Could not edit password');
			console.log(err);
		}
		return
	}

	return(
		<div className=''>
			{!isSuccess
				?
				<h1>LOADINNG</h1>
				: 
				<div className="">
					<h3 className="bb bw2 tc">Staff Details</h3>
					<div>
						<span className="dib w4 pr5 mv2">Staff ID:</span><span>{(staffMember?.parsed_id)}</span>
					</div>
					<ViewEditField
						input_type='text'
						asset_type={'staff'}
						serial={staffMember?.staff_id}
						label= 'Firstname:'
						value={staffMember?.firstname}
						data_field='firstname'
						handleEdit={handleEdit}
					/>
					<ViewEditField
						input_type='text'
						asset_type={'staff'}
						serial={staffMember?.staff_id}
						label= 'Lastname:'
						value={staffMember?.lastname}
						data_field='lastname'
						handleEdit={handleEdit}
					/>
					<ViewEditField
						input_type='text'
						asset_type={'staff'}
						serial={staffMember?.staff_id}
						label= 'Email:'
						value={staffMember?.email}
						data_field='email'
						handleEdit={handleEdit}
					/>
					{access === "admin"
						?   
						<div className="">
							<ViewEditField
								input_type='suggest'
								asset_type={'staff'}
								suggestlist={['admin', 'user']}
								serial={staffMember?.staff_id}
								label= 'Access:'
								value={staffMember?.access}
								data_field='access'
								handleEdit={handleEdit}
							/>
							<form>
								<input
									className="dn"
									type="text"
								/>
								<input 
									className="mb2 mr2 db center"
									value= {newPassword}
									type="password" 
									placeholder="Enter new Password"
									autoComplete="new-password" 
									onChange={(e) => setNewPassword(e.target.value) }
								/>
								<button
									type="submit"
									onClick={event => handleChangePw(event)}
								>Change Password
								</button>
							</form>
						</div>
						:
						<div></div>
					}
					<h3 className="bb bw2 tc">Assets</h3> 
					<AssetList
						asset_list={staffMember?.assets}
					/>
					<h3 className="bb bw2 tc">Accessories</h3>                     
					<LocationAccessoryList
						accessory_list={staffMember?.acc}
					/>                                                         
				</div>

			}      
		</div>
	);
}

export default StaffCard