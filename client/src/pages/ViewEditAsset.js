import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssetFields from '../components/AssetFields/AssetFields';
import AssetCard from '../components/AssetCard/AssetCard';
import AssetMovementTable from '../components/AssetMovementTable/AssetMovementTable';
import AssetTypeList from '../components/AssetTypeList/AssetTypeList'
import TextInput from '../components/TextInput/TextInput';
import SuggestBox from '../components/SuggestBox/SuggestBox';

import { setAsset } from '../components/AssetCard/assetCardSlice';
import { useGetAllAssettypesQuery } from '../api/apiAssettypesSlice'
import { useGetTypeListsQuery}  from '../api/apiAssettypesSlice';

const ViewEditAsset = () => {
	const [assetType, setAssetType] = useState('');
	const [fieldInputData, setFieldInputData] = useState({});
	const [serialList, setSerialList] = useState([]);
	const [modelFilter, setModelFilter] = useState('');
	const [locationFilter, setLocationFilter] = useState('');

	const dispatch = useDispatch();
	const serial = useSelector(state => state.asset.serial);

	// Increase update state +1 to rerun fetch and update values
	const [update, setUpdate] = useState(0);

	const {data: assetlists, isSuccess} = useGetTypeListsQuery();
	const {data: typeList} = useGetAllAssettypesQuery();

	useEffect(() => {
		// set serial list based on asset type selected
		if(isSuccess && assetlists[assetType.toLowerCase()]) {
			const  { serialList } = assetlists[assetType.toLowerCase()]
			setSerialList(serialList)
		}
	}, [isSuccess, assetType, assetlists])


	const selectAssetType = (assetType) => {
		setAssetType(assetType);
		dispatch(setAsset(''));
	}

	// To be Re-Implemented
	const deleteMovement = () => {
		return
	}

	const handleFieldInput = (input_value) => {
		setFieldInputData({...fieldInputData, ...input_value})
	}

	// const returnFilterFields = () => {
		
	// }

	return (
		<div>
			<form className="">
			{console.log(fieldInputData)}
				<SuggestBox 
					label="Asset Type:"
					suggestlist={typeList}
					handleInputChange={input_value => selectAssetType(input_value)}
				/>
				<TextInput
					label="Filter Locations:"
					value={locationFilter}
					handleInputChange={event => setLocationFilter(event.target.value)}
				/>
			</form>
			{assetType && 
				<AssetFields
					assettype={assetType}
					fieldInputData={fieldInputData}
					handleFieldInput={input_value => handleFieldInput(input_value)}
				/>
			}
			{assetType && !serial && 
				<AssetTypeList
					asset_type={assetType.toLowerCase()}
					model_filter={modelFilter}
					location_filter={locationFilter}
				/>}
			{serial &&
				<div>
					<div>
						<button
							type="button"
							onClick={() => dispatch(setAsset(''))}
						>BACK
						</button>
					</div>
					<AssetCard
						serial_number={serial}
						// getStockItemDetails={getStockItemDetails}
						update={update}
						setUpdate={setUpdate}
					/>
					<AssetMovementTable
						serialnumber = {serial}
						deleteMovement={deleteMovement}
					/>
				</div>
			}
		</div>
	);
}

export default ViewEditAsset;



