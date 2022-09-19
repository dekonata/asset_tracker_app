import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import SuggestBox from '../SuggestBox/SuggestBox';
import AssetAccessoriesTransfer from './AssetAccessoriesTransfer';

import {useGetAllLocationsQuery, useGetOneLocationQuery} from '../../api/apiLocationsSlice';
import {useAddAssetTransferMutation} from '../../api/apiTransfersSlice';

const AssetTransferForm = ({asset_id, close_transfer, current_location}) => {
	const [transferTo, setTransferTo] = useState('');
	const [transferDate, setTransferDate] = useState(new Date());
	// List all asset ids to be transferred
	const [transferAssetIds, setTransferAssetIds] = useState([asset_id]);

	const {data: locations, isSuccess} = useGetAllLocationsQuery();
	const {data: locationData, isSuccess: gotLocationData} = useGetOneLocationQuery(current_location.split(':')[0]);

	const [addAssetTransfer] = useAddAssetTransferMutation()

	const onSelectAccessory = (event) => {
		const accessoryAssetId = event?.target?.value
		if(event.target.checked) {
			setTransferAssetIds(current => [...current, accessoryAssetId])
		} else {
			setTransferAssetIds(transferAssetIds.filter(accId => accId !== accessoryAssetId))
		}

	}

	const onCaptureTransfer = async(event) => {
		event.preventDefault();

		const transferData = {
			asset_ids: transferAssetIds,
			location_id: locations.codeToIdMap[transferTo],
			transfer_date: transferDate

		};

		try {
			const addTransfer = await addAssetTransfer(transferData);
			close_transfer();
			if(addTransfer.error) {
				return alert(addTransfer.error.data);
			}
			alert('Transfer Successful');
		} catch(err) {
			alert(err);
		}
	}

	return (
		<div>
			{!isSuccess
				?
				<h1> LOADING </h1>
				:			
				<form className='bg-black-10'>
					<SuggestBox 
						label="Transfer To"
						initial_input={transferTo}
						suggestlist={locations?.selectList}
						handleInputChange={selected => setTransferTo(selected)}
					/>
					<label className="dib w4 pr5 mv2"> Transfer Date: </label>
					<div className="dib">
						<DatePicker 
							selected={transferDate} 
							dateFormat='dd/MM/yyyy'
							onChange={(date) => setTransferDate(date)} /><br/>
					</div>
					{!gotLocationData 
						?
						<h1> LOADING </h1>
						: 
						<AssetAccessoriesTransfer
							accessory_list={locationData?.accessories}
							onSelectAccessory={onSelectAccessory}
						/>
					}

					<input
						className="db"
						type='submit'
						value='Capture'
						onClick={onCaptureTransfer}
					/>
				</form>	
			}
		</div>
	)
}

export default AssetTransferForm;