import React from 'react';
import { useDispatch } from 'react-redux';


import SuggestBox from '../components/SuggestBox/SuggestBox';
import AssetTypeCard from '../components/AssetTypeCard/AssetTypeCard';

import { useGetAllAssettypesQuery } from '../api/apiAssettypesSlice';
import { setAssetType } from '../components/AssetTypeCard/assetTypeCardSlice'

const ViewEditAssetType = () => {
	const dispatch = useDispatch();

	const {data:asset_types, isSuccess} = useGetAllAssettypesQuery();

	return (
		<div>
			{!isSuccess 
				? 
				<h1> LOADING </h1>
				:
				<div>
					<SuggestBox 
						label="Select Asset Type"
						suggestlist={Object.keys(asset_types)}
						initial_input={''}
						handleInputChange={(assettype) => dispatch(setAssetType(asset_types[assettype].type_id))}
					/>
				</div>
			}
			<div>
				<AssetTypeCard/>
			</div>
		</div>
	);
}

export default ViewEditAssetType;


