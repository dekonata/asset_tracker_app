import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import { useGetLocationIdListQuery } from '../api/apiLocationsSlice';
import { useAddStaffMutation } from '../api/apiStaffSlice';

const AddNewStorageLocation = () => {
	const [staffCodeId, setStaffCodeId] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [access, setAccess] = useState('');
	const {data: stafflists, isSuccess }  = useGetLocationIdListQuery('staff');

	const [addStaff] = useAddStaffMutation();

	const dispatch = useDispatch();

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const location_type_id = staffCodeId.substring(5);

		const postData = {
			location_type_id,
			firstname,
			lastname,
			location_name: firstname + ' ' + lastname,
			email,
			password,
			access,
		}
		try {
			await addStaff(postData).unwrap();
			console.log(addStaff)
			alert('Staff Added');
			dispatch(setRoute(''));
		} catch (err) {
			if(Number(err.data.code) === 23505) {
				alert("Email already in use.")
				return
			}
			console.log("Error: ", err)
			alert("Could not add staff.");
		}
	}

	return (
		<div>	
			<form>
				<SuggestBox 
					label="Staff ID:"
					suggestlist= {isSuccess ? stafflists : ['loading']}
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