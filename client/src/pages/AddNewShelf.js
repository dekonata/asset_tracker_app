import React, { useState} from 'react';
import { useDispatch } from 'react-redux';

import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import {
	useAddLocationMutation,
	useGetLocationIdListQuery
} from '../api/apiLocationsSlice';

const ID_CODE = 'SHE';

const AddNewCabinet = () => {
	const [storageID, setStorageID] = useState('');
	const [locationName, setLocationName] = useState('')
	const [storageLocation, setStorageLocation] = useState('');
	const [storageDescription, setStorageDescription] = useState('');
	const {data: idSuggsetList, isSuccess }  = useGetLocationIdListQuery('shelf');

	const [addShelf] = useAddLocationMutation();

	const dispatch = useDispatch();

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const shelf_id = storageID.substring(ID_CODE.length);

		const postData = {
			location_type: 'shelf',
			location_data: {
				location_type_id: shelf_id,
				location_name: locationName,
				located: storageLocation,
				description: storageDescription
			}
		}

		try {
			await addShelf(postData).unwrap();
			alert('Shelf Added');
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
					label="Shelf ID:"
					suggestlist= {isSuccess ? idSuggsetList : ['loading']}
					addNewEnabled={true}
					handleInputChange={(value) => setStorageID(value)}
				/>
				<TextInput
					label="Shelf Name"
					value={locationName}
					handleInputChange={event => setLocationName(event.target.value)}
				/>
				<SuggestBox 
					label="Location:"
					suggestlist= {isSuccess ? ['AS Offices, Unit 5'] : ['loading']}
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