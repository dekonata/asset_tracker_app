import React, { useState } from 'react';

import TextInput from '../components/TextInput/TextInput';
import SuggestBox from '../components/SuggestBox/SuggestBox';

import { 
	useGetAssetFieldsQuery
} from '../api/apiAssetSlice';
import { 
	useAddAssetTypeMutation,
} from '../api/apiAssettypesSlice';

const AddNewAssetType = () => {
	const [assetTypeName, setAssetTypeName] = useState('');
	const [typeCode, setTypeCode] = useState('');
	const [dataTypes] = useState(['Mixed Length Text']);
	const [inputTypes] = useState(['Suggest', 'Text']);
	const [existFieldName, setExistFieldName] = useState('');
	const [newFieldName, setNewFieldName] = useState('');
	const [newFieldData, setNewFieldData] = useState('');
	const [newFieldInput, setNewFieldInput] = useState('');
	const [fields, setFields] = useState([]);

	const {data:existingfields, isSuccess} = useGetAssetFieldsQuery();
	const [addType] = useAddAssetTypeMutation();

	const inputTypeCode = (input_value) => {
		if(input_value.length > 5) {
			alert('Asset code must be 5 characters or less');
		} else {
			setTypeCode(input_value.toUpperCase());
		}
	}

	const addField = (event) => {
		event.preventDefault();
		console.log(existingfields[existFieldName])
		if(fields.some(field => field.name === newFieldName || field.name === existFieldName)) {
			alert('Cannot add duplicate fields');
			return;
		}
		// Check if field already exists in database
		if(existingfields[existFieldName]) {
			console.log('exist')
			setFields([...fields, {
				name: existFieldName, 
				data_type: existingfields[existFieldName]?.data_type, 
				input_type: existingfields[existFieldName]?.input_type 
			}]);		
		} else {
			setFields([...fields, {name: newFieldName, data_type: newFieldData, input_type: newFieldInput }]);
		}
		setExistFieldName('');
		setNewFieldName('');
		setNewFieldData('');
		setNewFieldInput('');
		return
	}

	const deleteField = (fieldDelete) => {
		const updatedFields = fields.filter(field => field.name !== fieldDelete);

		setFields(updatedFields);
		return
	}

	const onCreate = async (event) => {
		event.preventDefault();
		if(!fields.length) {
			alert('Asset type must have at least one field');
			return
		}

		const postData = {
			name: assetTypeName,
			code: typeCode,
			fields: fields
		};
		try {
			const post = await addType(postData);
			// Handle post errors
			if(post.error) {
				if(post.error.data.code === '42P07') {
					alert(
						'Asset type with this name already exists. Choose different name or edit existing asset type'
					);
					return;
				}
				alert("Could not add asset. Contact system administrator")
				console.log(postData)
				return;
			}

			// If no errors
			alert('Asset type added');
			setAssetTypeName('');
			setFields([]);
			setTypeCode('');
		} catch(err) {
			alert('Could not add asset');
		}
		return
	} 

	return (
		<div>
			{!isSuccess 
				?
				<h1> LOADING </h1>
				:
				<div>
					<form>
						<TextInput
							label="Asset Type Name:"
							value={assetTypeName}
							handleInputChange={event => setAssetTypeName(event.target.value)}
						/>
						<TextInput
							label="Asset Type Code:"
							value={typeCode}
							handleInputChange={event => inputTypeCode(event.target.value)}
						/>
					</form>
					<h4  className="bb mb0">Asset Fields</h4>
					{ !fields.length
						?
						<p>No Fields</p>
						:
						<div className="overflow-auto">
							<table className="f7 w-100 mw8 center bb" cellSpacing="0">
								<thead>
									<tr className="stripe-dark">
										<th className="fw6 tl pa2 bg-white">Name</th>
										<th className="fw6 tl pa2 bg-white">Data Type</th>
										<th className="fw6 tl pa2 bg-white">Input Type</th>
									</tr>
								</thead>
								<tbody className="lh-copy">		
									{fields.map((field,i) => {
										return (
											<tr 
												className="stripe-dark" 
												key={i}>
												<td className="pa1">{field.name}</td>
												<td className="pa1">{field.data_type}</td>
												<td className="pa1">{field.input_type}</td>
												<td 
													className="fw6 bold link dim  pointer pr2"
													onClick={() => deleteField(field.name)}
												>x</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					}
					<div className='mb2'>
						<h4  className="bb mb0">Add Existing Field</h4>
						<form>
							<SuggestBox 
								label="Field Name:"
								initial_input={existFieldName}
								suggestlist={Object.keys(existingfields)} 
								addNewEnabled={false}
								handleInputChange={input_value => setExistFieldName(input_value)}
							/>
							<div className="pv3 h1 flex items-center">
								<label className="dib w4 pr5 mv1"> Data Type: </label>
								<div className="dib">
									<p>{existingfields[existFieldName]?.data_type}</p> 
								</div>
							</div>
							<div className="pv3 h1 flex items-center">
								<label className="dib w4 pr5 mv1"> Data Type: </label>
								<div className="dib">
									<p>{existingfields[existFieldName]?.input_type}</p> 
								</div>
							</div>
							<input className="b"
								type="submit" 
								value="Add Field" 
								onClick={event => addField(event)}
							/>
						</form>
					</div>
					<div className='mb2 bb'>
						<h4  className="bb mb0">Add New Field</h4>
						<form>
							<TextInput
								label="Field Name:"
								value={newFieldName}
								handleInputChange={event => {
									setNewFieldName(event.target.value)
									setExistFieldName('')
								}}
							/>
							<SuggestBox 
								label="Data Type:"
								initial_input={newFieldData}
								suggestlist={dataTypes} 
								addNewEnabled={false}
								handleInputChange={input_value => setNewFieldData(input_value)}
							/>
							<SuggestBox 
								label="Input Type:"
								initial_input={newFieldInput}
								suggestlist={inputTypes} 
								addNewEnabled={false}
								handleInputChange={input_value => setNewFieldInput(input_value)}
							/>
							{ newFieldName && newFieldData && newFieldInput && 
								<input className="b"
									type="submit" 
									value="Add Field" 
									onClick={event => addField(event)}
								/>
							}
						</form>
					</div>

					{ assetTypeName && 
					<div className='flex justify-center'>
						<input className="f6 dim br3 ph3 pv2 mb2 dib white bg-black"
							type="submit" 
							value="Create Asset Type" 
							onClick={event => onCreate(event)}
						/>
					</div>
					}
				</div>
			}

		</div>
	)
}

export default AddNewAssetType;