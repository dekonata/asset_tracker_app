import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import {
	useAddLocationMutation,
	useGetLocationIdListQuery
} from '../api/apiLocationsSlice';

const ID_CODE = 'CAB';

const AddNewLocation = () => {
	const [storageID, setStorageID] = useState('');
	const [locationName, setLocationName] = useState('');
	const [storageLocation, setStorageLocation] = useState('');
	const [storageDescription, setStorageDescription] = useState('');
	const {data: idSuggsetList, isSuccess }  = useGetLocationIdListQuery('other_location');

	const [addStorage] = useAddLocationMutation();

	const dispatch = useDispatch();

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const other_location_id = storageID.substring(ID_CODE.length);

		const postData = {
			location_type: 'other_location',
			location_data: {
				location_type_id: other_location_id,
				location_name: locationName,
				located: storageLocation,
				description: storageDescription
			}
		}
		console.log(postData)
		try {
			await addStorage(postData).unwrap();
			alert('Storge Location Added');
			dispatch(setRoute(''));
		} catch (err) {
			console.log(err)
			alert(err);
		}
	};

	return (
		<div>	
			<form>
				<SuggestBox 
					label="Location ID:"
					suggestlist= {isSuccess ? idSuggsetList : ['loading']}
					addNewEnabled={true}
					handleInputChange={(value) => setStorageID(value)}
				/>
				<TextInput
					label="Location Name"
					value={locationName}
					handleInputChange={event => setLocationName(event.target.value)}
				/>
				<SuggestBox 
					label="Located:"
					suggestlist= {isSuccess ? ['AS Office, Unit 4'] : ['loading']}
					addNewEnabled={true}
					handleInputChange={(value) => setStorageLocation(value)}
				/>
				<TextInput
					label="Location Description"
					value={storageDescription}
					handleInputChange={event => setStorageDescription(event.target.value)}
				/>
				{ storageID  && storageLocation && setStorageDescription &&
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

export default AddNewLocation;