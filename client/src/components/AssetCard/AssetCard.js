import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ViewEditField from '../ViewEditField/ViewEditField';
import AssetTransferForm from '../AssetTransferForm/AssetTransferForm';
import AssetNoteList from '../AssetNoteList/AssetNoteList';

import { setAsset } from './assetCardSlice'

import { 
	useGetOneAssetQuery,
	useGetAssetListsQuery,
	useEditAssetMutation
} from '../../api/apiAssetSlice';

const AssetCard = () => {
	const [moveOpen, setMoveOpen] = useState(false);

	const dispatch = useDispatch();
	const serial_number = useSelector(state => state.asset.serial)

	const {data:asset, isSuccess, refetch} = useGetOneAssetQuery(serial_number);
	const {data:suggestlists} = useGetAssetListsQuery();
	const [editAsset] = useEditAssetMutation();

	const handleEdit = async (data_field, editvalue) => {
		const editData = {
			asset_type: asset.asset_type,
			serialnumber: serial_number,
			payload: {
				[data_field]: editvalue
			}
		}

		if(data_field === "serialnumber") {
			dispatch(setAsset(editvalue))
		}

		try {
			await editAsset(editData).unwrap();
			refetch()
		} catch(err) { 
			alert(err.data.detail);
		}
	}

	const closeTransfer = () => {
		setMoveOpen(false)
	}

	return(
		<div className=''>
			{console.log(asset)}
			{!isSuccess
				?
				<h1>LOADINNG</h1>
				: 
				<div>
					<h3 className="bb"> Asset Details </h3>
					<ViewEditField
						input_type='suggest'
						asset_type={asset?.asset_type}
						serial={serial_number}
						suggestlist={suggestlists?.[asset?.asset_type]?.makeList}
						label= 'Make:'
						value={asset?.make}
						data_field='make'
						handleEdit={handleEdit}
					/>		
					<ViewEditField
						input_type='suggest'
						asset_type={asset?.asset_type}
						serial={serial_number}
						suggestlist={suggestlists?.[asset?.asset_type]?.modelList}
						label= 'Model:'
						value={asset?.model}
						data_field='model'
						handleEdit={handleEdit}
					/>
					<ViewEditField
						input_type='text'
						asset_type={asset?.asset_type}
						serial={serial_number}
						label= 'Description:'
						value={asset?.description}
						data_field='description'
						handleEdit={handleEdit}
					/>
					<ViewEditField
						input_type='suggest'
						asset_type={asset?.asset_type}
						serial={serial_number}
						suggestlist={suggestlists?.[asset?.asset_type]?.conditionList}
						label= 'Condition:'
						value={asset?.asset_condition}
						data_field='asset_condition'
						handleEdit={handleEdit}
					/>
					<ViewEditField
						input_type='text'
						asset_type={asset?.asset_type}
						serial={serial_number}
						label= 'Serial:'
						value={asset?.serialnumber}
						data_field='serialnumber'
						handleEdit={handleEdit}
					/>
					<div>
						<span className="dib w4 pr5 mv2">Location:</span><span>{asset?.location}</span>
					</div>
					{moveOpen 
						?	
						<AssetTransferForm
							asset_id={asset?.asset_id}
							close_transfer={closeTransfer}
							current_location={asset?.location}
						/> 
						: 
						<button 
							className="mt3"
							onClick={() => setMoveOpen(true)}
						>Capure Stock Movement</button>
					}
					<AssetNoteList
						asset_id={asset?.asset_id}


					/>				
				</div>


			}
			
		</div>
	)
}

export default AssetCard;