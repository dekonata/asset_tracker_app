import { useEffect } from 'react';
import SuggestBox from '../SuggestBox/SuggestBox';
import TextInput from '../TextInput/TextInput';


const AddAssetAccessory = ({assetlists, id, addAccBaseState, updateAccData, removeAccessory }) => {
	useEffect(() => {
		addAccBaseState(id)
	}, []);


	return (
		<div>	
			<h4 className="dib">Add Accessory</h4>
			<span className="link dim gray pointer f6"
				onClick={event => removeAccessory(id)}
				> remove 
			</span>
			<SuggestBox 
				label="Accessory Type:"
				suggestlist= {assetlists.acc.typeList} 
				addNewEnabled={true}
				handleInputChange={(value) => updateAccData({data:{accessory_type: value}, id: id})}
				/>
			<SuggestBox 
				label="Make"
				suggestlist= {assetlists.acc.makeList} 
				addNewEnabled={true}
				handleInputChange={(value) => updateAccData({data:{make: value}, id: id})}
				/>
			<TextInput
				label="Description:"
				handleInputChange={event => updateAccData({data: {description: event.target.value}, id: id})}
				/>
		</div>
	)
}	


export default AddAssetAccessory;