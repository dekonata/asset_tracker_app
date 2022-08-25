import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import {
	useGetStaffListsQuery,
	useAddStaffMutation
} from '../api/apiStaffSlice'

const AddNewStorageLocation = () => {
	const [staffCodeId, setStaffCodeId] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [access, setAccess] = useState('');
	const {data: stafflists, isSuccess }  = useGetStaffListsQuery();

	const [addStaff] = useAddStaffMutation();

	const dispatch = useDispatch();

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const staff_id = staffCodeId.substring(5);

		const postData = {
			staff_id,
			firstname,
			lastname,
			email,
			password,
			access,
		}
		try {
			await addStaff(postData).unwrap();
			alert('Staff Added');
			dispatch(setRoute(''));
		} catch (err) {
			console.log(err)
			alert(err);
		}
	}

return (
	<div>	
		<form>
			<SuggestBox 
				label="Staff ID:"
				suggestlist= {isSuccess ? stafflists.unusedIds : ['loading']}
				addNewEnabled={false}
				handleInputChange={(value) => setStaffCodeId(value)}
				/>
			<TextInput
				label="First Name:"
				value={firstname}
				handleInputChange={event => setFirstName(event.target.value)}
				/>
			<TextInput
				label="Last Name:"
				value={lastname}
				handleInputChange={event => setLastName(event.target.value)}
				/>
			<TextInput
				label="Company Email Address:"
				value={email}
				handleInputChange={event => setEmail(event.target.value)}
				/>
			<TextInput
				label="Password:"
				value={password}
				type="password"
				handleInputChange={event => setPassword(event.target.value)}
				/>
			<SuggestBox 
				label="Access Type:"
				suggestlist= {['admin', 'user']}
				addNewEnabled={false}
				handleInputChange={(value) => setAccess(value)}
				/>
			{ staffCodeId  && firstname && lastname &&
				<input 
					type="submit" 
					value="Submit" 
					onClick={onSubmitNewStaff}
					/>
			}
		</form>
	</div>
	)	
}

export default AddNewStorageLocation;