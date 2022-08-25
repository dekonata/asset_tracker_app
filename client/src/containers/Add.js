import React, { useState } from 'react';

import AddNewAsset from '../pages/AddNewAsset.js';
import AddNewStaff from '../pages/AddNewStaff';
import AddNewAccessory from '../pages/AddNewAccessory';
import AddNewCabinet from '../pages/AddNewCabinet';
import AddNewShelf from '../pages/AddNewShelf'

import SuggestBox from '../components/SuggestBox/SuggestBox';


const Add = () => {
	const [addValue, setAddValue] = useState('');
	const [addList] = useState(['Asset', 'Cabinet', 'Shelf' ,'Staff', 'Accessory']);

	const onAddSelect = (input_value) => {
		setAddValue(input_value);
	};

	const returnAddType = (addType) => {
		switch (addType){
			case "Asset":
				return <AddNewAsset/>
            case "Cabinet":
             	return <AddNewCabinet/>
            case "Shelf":
             	return <AddNewShelf/>
            case "Staff":
             	return <AddNewStaff/>
            case "Accessory":
             // Todo Create Add Accessory Page
             	return <AddNewAccessory/>
			default:
				return <div></div>
		}
	}

	return (
		<div>
			<form className="">
				<SuggestBox 
					label="Add"
					handleInputChange={onAddSelect} 
					suggestlist={addList} />
			</form>
			{returnAddType(addValue)}
		</div>
	);
}

export default Add