import React, { useState, useMemo} from 'react';
import { useDispatch } from 'react-redux';

import { formatId } from '../utils/utils.js'

import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import {
	useGetShelfListsQuery,
	useAddShelfMutation
} from '../api/apiShelvesSlice'

const ID_CODE = 'SHE';
const ID_PADDING = 2

const AddNewCabinet = () => {
	const [storageID, setStorageID] = useState('');
	const [storageLocation, setStorageLocation] = useState('');
	const [storageDescription, setStorageDescription] = useState('');
	const {data: shelflists, isSuccess }  = useGetShelfListsQuery();

	const [addShelf] = useAddShelfMutation();

	const dispatch = useDispatch();

	const formattedIds = useMemo(() => {
		if(isSuccess) {
			return shelflists.unusedIds.map(id => formatId(id, ID_CODE , ID_PADDING))
		}
	}, [shelflists, isSuccess]);

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const shelf_id = storageID.substring(ID_CODE.length);

		const postData = {
			shelf_id: shelf_id,
			located: storageLocation,
			description: storageDescription
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
				suggestlist= {isSuccess ? formattedIds : ['loading']}
				addNewEnabled={true}
				handleInputChange={(value) => setStorageID(value)}
				/>
			<SuggestBox 
				label="Location:"
				suggestlist= {isSuccess ? shelflists.locatedList : ['loading']}
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