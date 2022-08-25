import React, { useState, useMemo} from 'react';
import { useDispatch } from 'react-redux';

import { formatId } from '../utils/utils.js'

import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import {
	useGetCabinetListsQuery,
	useAddCabinetMutation
} from '../api/apiCabinetsSlice'

const ID_CODE = 'CAB';
const ID_PADDING = 2

const AddNewCabinet = () => {
	const [storageID, setStorageID] = useState('');
	const [storageLocation, setStorageLocation] = useState('');
	const [storageDescription, setStorageDescription] = useState('');
	const {data: cabinetlists, isSuccess }  = useGetCabinetListsQuery();

	const [addCabinet] = useAddCabinetMutation();

	const dispatch = useDispatch();

	const formattedIds = useMemo(() => {
		if(isSuccess) {
			return cabinetlists.unusedIds.map(id => formatId(id, ID_CODE , ID_PADDING))
		}
	}, [cabinetlists, isSuccess]);

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const cabinet_id = storageID.substring(ID_CODE.length);

		const postData = {
			cabinet_id: cabinet_id,
			located: storageLocation,
			description: storageDescription
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
				suggestlist= {isSuccess ? formattedIds : ['loading']}
				addNewEnabled={true}
				handleInputChange={(value) => setStorageID(value)}
				/>
			<SuggestBox 
				label="Location:"
				suggestlist= {isSuccess ? cabinetlists.locatedList : ['loading']}
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