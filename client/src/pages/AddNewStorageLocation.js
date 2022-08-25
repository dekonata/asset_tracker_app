import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchSuggestLists } from '../components/SuggestBox/suggestBoxSlice';
import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';
import LocationIdSelect from '../components/AddLocationIDSelect/AddLocationIDSelect'

const AddNewStorageLocation = () => {
	const [storageID, setStorageID] = useState('');
	const [storageType, setStorageType] = useState('');
	const [storageLocation, setStorageLocation] = useState('');

	const dispatch = useDispatch();

// 	const onSubmitAddLocation = (event) => {
// 	event.preventDefault();

// 	const postAddLocation= async () => {
// 		try {
// 			const url = 'http://localhost:3000/addlocation'
// 			const config = {
// 				method: 'post',
// 				headers: {'Content-Type': 'application/json'},
// 				body: JSON.stringify({
// 					location_type: locationType,
// 					location_id: locationID,
// 					location_name: locationName
// 				})
// 			};
// 			const response = await fetch(url, config);
// 			const json_response =  await response.json();
// 			console.log(json_response);
// 			if(!response.ok) {
// 				throw new Error(json_response.code);
// 			} 
// 			alert(`Location with location id ${json_response} has been added`);
// 			dispatch(fetchSuggestLists());
// 			dispatch(setRoute(''));
// 		} catch (errcode) {
// 			console.log(errcode)
// 			if (errcode.message === '23505') {
// 				alert('Another location has already been assigned this name or Location ID. Enter a different Location ID and/or name')
// 			}
// 			console.log('POST submit add stock failed with error: ', errcode)
// 		}
// 	}

// 	postAddLocation()
// }

return (
	<div>	
		<form>
			<SuggestBox 
				label="Storage ID:"
				suggestlist= {["CB01", "SH01", "U1"]} 
				addNewEnabled={true}
				handleInputChange={(value) => setStorageID(value)}
				/>
			<SuggestBox 
				label="Storage Type:"
				suggestlist= {["Cabinet", "Shelf", "Albatros Warehouse"]} 
				handleInputChange={(value) => setStorageID(value)}
				/>
			<SuggestBox 				
				label="Storage Location:"
				suggestlist= {["Cabinet", "Shelf", "Albatros Warehouse"]} 
				handleInputChange={(value) => setStorageID(value)}
				/>
			{ storageID  && storageType && storageLocation &&
				<input 
					type="submit" 
					value="Submit" 
					// onClick={onSubmitAddLocation}
					/>
			}
		</form>
	</div>
	)	
}

export default AddNewStorageLocation;