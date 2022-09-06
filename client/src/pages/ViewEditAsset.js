import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SuggestBox from '../components/SuggestBox/SuggestBox';
import AssetCard from '../components/AssetCard/AssetCard';
import AssetMovementTable from '../components/AssetMovementTable/AssetMovementTable';
import AssetTypeList from '../components/AssetTypeList/AssetTypeList'
import TextInput from '../components/TextInput/TextInput';

import { setAsset } from '../components/AssetCard/assetCardSlice'
import { useGetAssetListsQuery}  from '../api/apiAssetSlice';

const ASSET_TYPES = ['Laptop', 'Monitor', 'Modem', 'Cellphone' , 'PC', 'Tablet', 'Misc']

const ViewEditAsset = () => {
	const [assetType, setAssetType] = useState('');
	const [serialList, setSerialList] = useState([]);
	const [modelFilter, setModelFilter] = useState('');
	const [locationFilter, setLocationFilter] = useState('');

	const dispatch = useDispatch();
	const serial = useSelector(state => state.asset.serial);

	// Increase update state +1 to rerun fetch and update values
	const [update, setUpdate] = useState(0);

	const {data: assetlists, isSuccess} = useGetAssetListsQuery();

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

	return (
		<div>
			<form className="">
				<SuggestBox 
					label="Asset Type:"
					suggestlist={ASSET_TYPES}
					handleInputChange={input_value => selectAssetType(input_value)}
				/>
				<SuggestBox 
					label="Search Serials:"
					suggestlist={serialList}
					initial_input={serial}
					handleInputChange={input_value => dispatch(setAsset((input_value)))}
				/>						
				<TextInput
					label="Filter Models:"
					value={modelFilter}
					handleInputChange={event => setModelFilter(event.target.value)}
				/>
				<TextInput
					label="Filter Locations:"
					value={locationFilter}
					handleInputChange={event => setLocationFilter(event.target.value)}
				/>
			</form>
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



