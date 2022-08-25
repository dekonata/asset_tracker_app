import React from 'react';
import { DateFormatter } from '../../utils/utils';

const AccessoryMovementTable = ({ accessory_id, movements, deleteMovement }) => {
	return(
		<div className="pa2">
			<h3 className="bb">Transfers</h3>
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
			    				{movements.map((transfer,i) => {
									const parsedTransferDate = DateFormatter(new Date(transfer.transfer_date));
									const parsedCaptureDate = DateFormatter(new Date(transfer.capture_time));
									return (
										<tr 
											className="stripe-dark" 
											key={'movement ' + i}
											onClick={event => console.log(transfer)}>
												<td className="pa1">{transfer.location}</td>
												<td className="pa1">{parsedTransferDate}</td>
												<td className="pa1">{parsedCaptureDate}</td>
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
		</div>
	)
}

export default AccessoryMovementTable;