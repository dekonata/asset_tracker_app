import{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SuggestBox from '../../components/SuggestBox/SuggestBox';
import ViewEditAsset from '../../pages/ViewEditAsset';
import ViewEditStorage from '../../pages/ViewEditLocation';
import ViewEditStaff from '../../pages/ViewEditStaff';
import ViewAllAccessories from '../../pages/ViewAllAccessories'

import { setViewEditPage, selectViewEditPage } from './viewEditSlice';


const ViewEdit= () => {
	const viewEditValue = useSelector(selectViewEditPage);
	const [addList] = useState(['Asset', 'Location', 'Staff', 'Accessories']);

	const dispatch = useDispatch()
	const onViewEditSelect = (input_value) => {
		dispatch(setViewEditPage(input_value))
	}

	const returnViewEditType = (view_edit_type) => {
		switch (view_edit_type){
			case "Asset":
				return (
					<ViewEditAsset
					/>
				);
			case "Location":
				return (
					<ViewEditStorage
						/>
				);
			case "Staff":
				return (
					<ViewEditStaff
					/>
				);
			case "Accessories":
				return (
					<ViewAllAccessories
					/>
				);				
			default:
				return <div></div>;
		}
	}


	return (
		<div>
			<form className="">
				<SuggestBox 
					initial_input={viewEditValue}
					label="View/Edit"
					handleInputChange={onViewEditSelect} 
					suggestlist={addList} />
			</form>
			{returnViewEditType(viewEditValue)}
		</div>
	);
}

export default ViewEdit