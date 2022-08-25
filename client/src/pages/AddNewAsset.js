import React, { useState} from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AddAssetAccessory from '../components/AddAssetAccessory/AddAssetAccessory.js'

import { 
	useAddAssetMutation,
	useAddMultipleAssetsMutation,
	useGetAssetListsQuery,

	 } 
	 from '../api/apiAssetSlice';

const ASSET_TYPES = ['Laptop', 'Monitor', 'Modem', 'Cellphone' , 'PC', 'Tablet', 'Misc']

const AddNewAsset = () => {
	const [transfer_date, setTransferDate] = useState(new Date());
	const [asset_type, setAssetType] = useState('');
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [asset_condition, setCondition] = useState('');
	const [serialnumber, setSerialNumber] = useState('');
	const [imei, setImei] = useState('');
	const [description, setDescription] = useState('')
	const [addAccessoryCount, setAddAccessoryCount] = useState(0)
	const [accPostData, setAccPostData] = useState([])
	// const [postData, setPostData] = useState([])

	const {data: assetlists, isSuccess} = useGetAssetListsQuery();
	const [addAssets] = useAddMultipleAssetsMutation();

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

	const updateAccData = (accData, id) => {
		const newValue = accData.data;
		// map over accessory object state and update at id
		const newState = accPostData.map(acc => {
			if(acc.id === accData.id) {
				const newAssetData = {...acc.asset, ...newValue};
				return {...acc, asset: newAssetData, transfer_date: transfer_date};
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
		event.preventDefault()

		const assetPostData = {
			asset_type: asset_type.toLowerCase(),
			asset: {
				serialnumber,
				make,
				model,
				asset_condition,
			},
			transfer_date,
		}

		// add imei to post data if modem of cellphone
		if(imei) {
			assetPostData.asset.imei = imei
		}
		// add description for misc assets
		if(description) {
			assetPostData.asset.description = description
		}

		// remove accessory ids for submission - not expected by server
		const accPostDataNoIds = accPostData.map((acc) => {
			const {id, ...accNoId} = acc;
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
				setMake('');
				setModel('');
				setCondition('');
				setSerialNumber('');
				setImei('');
				setDescription('');
				setAddAccessoryCount(0);
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
			{!isSuccess
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
										onChange={(date) => setTransferDate(date)} /><br/>
								</div>
						</div>
						<SuggestBox 
							label="Asset Type:"
							initial_input={asset_type}
							suggestlist={ASSET_TYPES} 
							addNewEnabled={false}
							handleInputChange={input_value => setAssetType(input_value)}
							/>
						{(asset_type === 'misc') &&
							<TextInput
								label="Description"
								value={description}
								handleInputChange={event => setDescription(event.target.value)}
								/> 
							}
						<SuggestBox 
							label="Make:"
							initial_input={make} 
							suggestlist={assetlists[asset_type.toLowerCase()]?.makeList}
							addNewEnabled={true} 
							handleInputChange={input_value => setMake(input_value)}
							/>
						<SuggestBox 
							label="Model:"
							initial_input={model} 
							suggestlist={assetlists[asset_type.toLowerCase()]?.modelList} 
							addNewEnabled={true} 
							handleInputChange={input_value => setModel(input_value)}
							/>	
						<SuggestBox 
							label="Condition:"
							initial_input={asset_condition} 
							suggestlist={assetlists[asset_type.toLowerCase()]?.conditionList} 
							addNewEnabled={true} 
							handleInputChange={input_value => setCondition(input_value)}
							/>	
						<TextInput
							label="Serial Number:"
							value={serialnumber}
							handleInputChange={event => setSerialNumber(event.target.value)}
							/>
						{(asset_type.toLowerCase() === 'cellphone' || asset_type.toLowerCase() === 'modem') &&
							<TextInput
								label="IMEI"
								value={imei}
								handleInputChange={event => setImei(event.target.value)}
								/> 
							}
						{/*function returns Add Accessory components */}
						{addAccessories()}
						<button
							type="button"
							onClick={(event) => addAccessory(event)}
							> Add Accessory </button><br></br>

						{/*Conditionally render submit button only if fields specified have been filled*/}
						{ asset_type && transfer_date && make && model && serialnumber && asset_condition && checkAccData() &&
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