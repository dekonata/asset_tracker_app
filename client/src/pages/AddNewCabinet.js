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

const AddNewCabinet = () => {
	const [storageID, setStorageID] = useState('');
	const [locationName, setLocationName] = useState('');
	const [storageLocation, setStorageLocation] = useState('');
	const [storageDescription, setStorageDescription] = useState('');
	const {data: idSuggsetList, isSuccess }  = useGetLocationIdListQuery('cabinet');

	const [addCabinet] = useAddLocationMutation();

	const dispatch = useDispatch();

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const cabinet_id = storageID.substring(ID_CODE.length);

		const postData = {
			location_type: 'cabinet',
			location_data: {
				location_type_id: cabinet_id,
				location_name: locationName,
				located: storageLocation,
				description: storageDescription
			}
		}
		console.log(postData)
		try {
			await addCabinet(postData).unwrap();
			alert('Cabinet Added');
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
					label="Cabinet ID:"
					suggestlist= {isSuccess ? idSuggsetList : ['loading']}
					addNewEnabled={true}
					handleInputChange={(value) => setStorageID(value)}
				/>
				<TextInput
					label="Cabinet Name"
					value={locationName}
					handleInputChange={event => setLocationName(event.target.value)}
				/>
				<SuggestBox 
					label="Location:"
					suggestlist= {isSuccess ? ['AS Office, Unit 4'] : ['loading']}
					addNewEnabled={true}
					handleInputChange={(value) => setStorageLocation(value)}
				/>
				<TextInput
					label="Storage Description"
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

export default AddNewCabinet;