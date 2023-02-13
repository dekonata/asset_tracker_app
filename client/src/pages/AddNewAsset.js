import React, { useState } from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import DatePicker from "react-datepicker";
import AssetFields from '../components/AssetFields/AssetFields';
import "react-datepicker/dist/react-datepicker.css";

import AddAssetAccessory from '../components/AddAssetAccessory/AddAssetAccessory.js';

import { 
	useGetAllAssettypesQuery } from '../api/apiAssettypesSlice';
import { 
	useAddMultipleAssetsMutation,
	useGetAssetListsQuery,
} from '../api/apiAssetSlice';
import { useGetAllLocationsQuery } from '../api/apiLocationsSlice';

const AddNewAsset = () => {
	const [transfer_date, setTransferDate] = useState(new Date());
	const [asset_type, setAssetType] = useState('');
	const [addAccessoryCount, setAddAccessoryCount] = useState(0);
	const [accPostData, setAccPostData] = useState([]);
	const [locationCode, setLocationCode] = useState([]);
	const [fieldInputData, setFieldInputData] = useState({})

	const {data: assettypes, isSuccess: gotAssettypes} = useGetAllAssettypesQuery();
	const {data: assetlists, isSuccess} = useGetAssetListsQuery();
	const {data: locations, isSuccess: gotLocations} = useGetAllLocationsQuery();
	const [addAssets] = useAddMultipleAssetsMutation();

	const handleFieldInput = (input_value) => {
		setFieldInputData({...fieldInputData, ...input_value})

	}

	// Increase the count of the number of "Add Accessory" elements
	const addAccessory = (event) => {
		event.preventDefault();
		setAddAccessoryCount(addAccessoryCount + 1);

	}

	const removeAccessory = (id) => {
		setAddAccessoryCount(addAccessoryCount - 1);

		// remove accessory data from state
		const newDataState = accPostData.filter(acc => acc.id !== id);

		setAccPostData(newDataState);
	}

	// When "Add Accessory" element is added, add baseState to accPostData array
	const addAccBaseState = (id) => {
		const baseAccData = {
			id: id,
			asset_type: 'accessory',
			asset: {},                                                                                                                                                                                                                                                                    
		};

		setAccPostData(current => [...current, baseAccData]);
	}

	const updateAccData = (accData) => {
		const newValue = accData.data;
		// map over accessory object state and update at id
		const newState = accPostData.map(acc => {
			if(acc.id === accData.id) {
				const newAssetData = {...acc.asset, ...newValue};
				return {...acc, asset: newAssetData, location_id: locations.codeToIdMap[locationCode],transfer_date: transfer_date};
			}

			return acc;
		})

		setAccPostData(newState);
	}

	const addAccessories = () => {
		// each new accessory component must be added in the list to be returned
		const addlist = [];
		for(let i = 0; i < addAccessoryCount; i++) {
			addlist.push(
				<AddAssetAccessory
					assetlists= {assetlists}
					key={i}
					id={i}
					addAccBaseState={addAccBaseState}
					updateAccData={updateAccData}
					removeAccessory={removeAccessory}
				/>
			)
		}
		return addlist;
	}

	// Check if all rquired field in accessories have values
	const checkAccData = () => {
		if(addAccessoryCount === 0) {
			return true
		}

		const check = accPostData.reduce((previousAcc,currenAcc) => {
			if(!previousAcc) {
				return false
			} else if(currenAcc.asset.accessory_type && currenAcc.asset.make) {
				return true
			} else {
				return false
			}
		}, true)

		return check
	}

	const onSubmitAddNewAsset = async (event) => {
		console.log(fieldInputData)
		event.preventDefault()

		const assetPostData = {
			asset_type: asset_type.toLowerCase(),
			asset: fieldInputData,
			location_id: locations.codeToIdMap[locationCode],
			transfer_date,
		}

		// remove accessory ids for submission - not expected by server
		const accPostDataNoIds = accPostData.map((acc) => {
			const {...accNoId} = acc;
			return accNoId
		})

		const postData = {asset_list: [assetPostData, ...accPostDataNoIds]}
		try {
			const post = await addAssets(postData).unwrap();

			if(post.error) {
				alert('Could not add asset. Check Data');
			} else if (post.status === 401) {
				alert("Not Authorized")
			} else {
				alert('Asset added');
				setTransferDate('');
				setAssetType('');
				setAddAccessoryCount(0);
				setAccPostData([]);
				setFieldInputData({});
			}
		} catch(err) {
			if(Number(err.data.code) === Number(23502)) {
				alert("Check input values and make sure all required fields have values")
				return
			}
			alert("Could not add asset")
			return console.log(err)
		}
	}

	return (
		<div className="pt2">
			{!isSuccess || !gotLocations || !gotAssettypes
				? 
				<h1> LOADING </h1>
				:
				<div>
					<form className="bb">
						<div className="">
							<label className="dib w4 pr5 mv2"> Date Received: </label>
							<div className="dib">
								<DatePicker
									selected={transfer_date} 
									dateFormat='dd/MM/yyyy'
									onChange={(date) => setTransferDate(date)} /><br/>
							</div>
						</div>
						<SuggestBox 
							label="Asset Type:"
							initial_input={asset_type}
							suggestlist={assettypes} 
							addNewEnabled={false}
							handleInputChange={input_value => {setAssetType(input_value)}}
						/>
						<SuggestBox 
							label="Location:"
							initial_input={locationCode} 
							suggestlist={locations?.selectList} 
							addNewEnabled={false} 
							handleInputChange={input_value => setLocationCode(input_value)}
						/>
						{asset_type && 						
							<AssetFields
								assettype={asset_type}
								fieldInputData={fieldInputData}
								handleFieldInput={input_value => handleFieldInput(input_value)}
							/>
						}	
						{/*function returns Add Accessory components */}
						{addAccessories()}
						<button
							type="button"
							onClick={(event) => addAccessory(event)}
						> Add Accessory </button><br></br>

						{/*Conditionally render submit button only if fields specified have been filled*/}
						{ asset_type && checkAccData() && locationCode &&
							<input className="b"
								type="submit" 
								value="Submit" 
								onClick={onSubmitAddNewAsset}
							/>
						}
					</form>
				</div>
			}

		</div>
	)
} 

export default AddNewAsset