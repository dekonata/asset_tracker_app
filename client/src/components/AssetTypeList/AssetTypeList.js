import React, { useEffect, useState }from 'react';
import { useDispatch } from 'react-redux';

import { setAsset } from '../AssetCard/assetCardSlice'

// import { useGetTypeAssetsQuery } from '../../api/apiAssetSlice';
import { useGetTypeAssetsQuery } from '../../api/apiAssettypesSlice';

const AssetTypeList = ({asset_type, model_filter='', location_filter=''}) => {
	const dispatch = useDispatch();

	const {data: assets, isSuccess } = useGetTypeAssetsQuery(asset_type);
	const [assetList, setAssetList] = useState([])

	useEffect(() => {
		if(model_filter) {
			const filteredAssets = assets?.filter(asset => asset.model.toLowerCase().includes(model_filter.toLowerCase()));
			setAssetList(filteredAssets)
		} else if(location_filter) {
			const filteredAssets = assets?.filter(asset => asset.location.toLowerCase().includes(location_filter.toLowerCase()));
			setAssetList(filteredAssets)
		} else {
			setAssetList(assets)
		}
	}, [model_filter, location_filter, assets])


	return(
		<div className="pa2">
			<h3 className="z-0">{asset_type.toUpperCase()}</h3>

			{!isSuccess 
				?
				<h1>LOADING</h1>
				: 
				<div className="overflow-visible">
					<table className="f7 w-100 mw8 center" cellSpacing="0">
						<thead className="pt">
							<tr className="stripe-dark">
								<th className="fw6 tl pa2 bg-white">Serial</th>                        
								<th className="fw6 tl pa2 bg-white">Model</th>
								<th className="fw6 tl pa2 bg-white">Location</th>                            
								<th className="fw6 tl pa2 bg-white">Condition</th>
							</tr>
						</thead>
						<tbody className="lh-copy">
							{assetList?.map((asset,i) => {
								return (                            	
									<tr
										className="stripe-dark pointer"
										key={i}
										onClick={() => dispatch(setAsset(asset.serialnumber))}>
										<td className="pa1">{asset.serialnumber}</td>
										<td className="pa1">{asset.model}</td>
										<td className="pa1">{asset.location}</td>
										<td className="pa1">{asset.asset_condition}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			}
		</div>
	)
}

export default AssetTypeList;