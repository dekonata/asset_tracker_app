import React, { useState } from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import { 
	useAddAssetMutation,
	useGetAssetListsQuery,
} 
	from '../api/apiAssetSlice';
import { useGetAllLocationsQuery } from '../api/apiLocationsSlice';


const AddNewAccessory = () => {
	const [accType, setAccType] = useState('');
	const [make, setMake] = useState('');
	const [description, setDescription] = useState('');
	const [locationCode, setLocationCode] = useState([]);

	const {data: assetlists, isSuccess } = useGetAssetListsQuery()
	const [addAccessorry] = useAddAssetMutation()
	const {data: locations, isSuccess: gotLocations} = useGetAllLocationsQuery();

	const onSubmitAddAccessory = async (event) => {
		event.preventDefault();

		const postData = {
			asset_type: 'accessory',
			asset: {
				make: make,
				accessory_type: accType,
				description: description
			},
			location_id: locations.codeToIdMap[locationCode],
			transfer_date: new Date()
		};

		const addAsset = await addAccessorry(postData);
		if(addAsset.error) {
			alert('There was a problem');
			console.log(addAsset);
		} else {
			alert('Asset added');
			setAccType('');
			setMake('');
			setDescription('')
		}
	};

	return (
		<div>	
			{ !isSuccess || !gotLocations
				?
				<h1> LOADING </h1>
				:
				<form>
					<SuggestBox 
						label="Accessory Type:"
						initial_input={accType}
						suggestlist= {assetlists.acc.typeList} 
						addNewEnabled={true}
						handleInputChange={(value) => setAccType(value)}
					/>
					<SuggestBox 
						label="Make"
						initial_input={make}
						suggestlist= {assetlists.acc.makeList} 
						addNewEnabled={true}
						handleInputChange={(value) => setMake(value)}
					/>
					<TextInput
						label="Description:"
						value={description}
						handleInputChange={event => setDescription(event.target.value)}
					/>
					<SuggestBox 
						label="Location:"
						initial_input={locationCode} 
						suggestlist={locations?.selectList} 
						addNewEnabled={false} 
						handleInputChange={input_value => setLocationCode(input_value)}
					/>	
					{ accType && make && 
							<input 
								type="submit" 
								value="Submit" 
								onClick={onSubmitAddAccessory}
							/>
					}
				</form>
			}

		</div>
	)	
}

export default AddNewAccessory;