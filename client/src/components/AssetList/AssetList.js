import React from 'react';
import { useDispatch } from 'react-redux';

import { setAsset } from '../AssetCard/assetCardSlice';
import { setViewEditPage } from '../../containers/ViewEdit/viewEditSlice'

const AssetList = ({ asset_list }) => {

	const dispatch = useDispatch();

	const selectAsset = (serial) => {
		dispatch(setAsset(serial));
		dispatch(setViewEditPage('Asset'));
	}

	return(
		<div className="">
			{asset_list.length === 0
				? 
					<div><h3 className="tc"> No Assets</h3></div> 
				:
					<div className="overflow-auto">
					    <table className="f7 w-100 mw8 center" cellSpacing="0">
						    <thead>
						      	<tr className="stripe-dark">
						      	 	<th className="tl pa2 bg-white">Serialnumber</th>				      	
						      	 	<th className="tl pa2 bg-white">Type</th>
						      	 	<th className="tl pa2 bg-white">Model</th>
						     		<th className="tl pa2 bg-white">Transferred</th>
					      	 	</tr>
					      	</thead>
					      	<tbody className="lh-copy">		
			    				{asset_list.map((asset,i) => {
									return (
										<tr 
											className="stripe-dark pointer" 
											key={'movement ' + i}
											onClick={event => selectAsset(asset?.serialnumber)}>
												<td className="pa1">{asset.serialnumber}</td>								
												<td className="pa1">{asset.asset_type.toUpperCase()}</td>									
												<td className="pa1">{asset.model}</td>
												<td className="pa1">{asset.transfer_date}</td>																				
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>					
			}
		</div>
	);
}

export default AssetList;