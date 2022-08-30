import React from 'react';
import { useDispatch } from 'react-redux';
import { DateTime } from "luxon";

import {useGetAssetTransfersQuery } from '../../api/apiTransfersSlice';
import { setViewEditPage } from '../../containers/ViewEdit/viewEditSlice.js';
import { setLocationId } from '../LocationCard/locationCardSlice.js';
import { setStaffId } from '../StaffCard/staffCardSlice.js'

const AssetMovementTable = ({ serialnumber, deleteMovement }) => {
	const {data: transferslist, isSuccess } = useGetAssetTransfersQuery(serialnumber);

	const dispatch = useDispatch()

	const onRowClick = (transfer) => {
		if(transfer.location_type === 'staff') {
			dispatch(setViewEditPage('Staff'))
			dispatch(setStaffId((transfer.location.substr(5,2))))
		} else {
			dispatch(setViewEditPage('Location'))
			dispatch(setLocationId((transfer.location.substr(0,5))))
		}
	}

	return(
		<div className="pa2">
			<h3  className="bb">Asset Transfers</h3>
			{!isSuccess 
				?
					<h1>LOADING</h1>
				: 
					<div className="overflow-auto">
					    <table className="f7 w-100 mw8 center" cellSpacing="0">
						    <thead>
						      	<tr className="stripe-dark">
						      	 	<th className="fw6 tl pa2 bg-white">Transferred To</th>
						      	 	<th className="fw6 tl pa2 bg-white">Transfer Date</th>
						      	 	<th className="fw6 tl pa2 bg-white">Capture Date</th>
					      	 	</tr>
					      	</thead>
					      	<tbody className="lh-copy">		
			    				{transferslist.map((transfer,i) => {
			    					const transferDate = DateTime.fromISO(transfer.transfer_date).toLocaleString();
			    					const captureDate = DateTime.fromISO(transfer.capture_time).toLocaleString(DateTime.DATETIME_SHORT);
									return (
										<tr 
											className="stripe-dark" 
											key={i}
											onClick={() => onRowClick(transfer) }>
												<td className="pa1">{transfer.location}</td>
												<td className="pa1">{transferDate}</td>
												<td className="pa1">{captureDate}</td>
												<td 
													className="fw6 bold link dim  pointer pr2"
													onClick={() => deleteMovement()}
													>x</td>
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

export default AssetMovementTable;