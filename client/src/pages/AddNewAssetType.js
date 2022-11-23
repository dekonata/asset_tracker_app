import React, { useState } from 'react';

import TextInput from '../components/TextInput/TextInput';
import SuggestBox from '../components/SuggestBox/SuggestBox';



const AddNewAssetType = () => {
	const [assetTypeName, setAssetTypeName] = useState('');
	const [dataTypes] = useState(['Mixed Length Text'])
	const [inputTypes] = useState(['Suggest', 'Text'])
	const [newFieldName, setNewFieldName] = useState('');
	const [newFieldData, setNewFieldData] = useState('');
	const [newFieldInput, setNewFieldInput] = useState('');
	const [fields, setFields] = useState([])

	const addField = (event) => {
		event.preventDefault();
		if(fields.some(field => field.name === newFieldName)) {
			alert('Cannot create duplicate fields');
			return
		}
		setFields([...fields, {name: newFieldName, dataType: newFieldData, inputType: newFieldInput }])
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

	const onCreate = (event) => {
		event.preventDefault();
		console.log(fields);
		return
	} 

	return (
		<div>
			<form>
				<TextInput
					label="Asset Type Name:"
					value={assetTypeName}
					handleInputChange={event => setAssetTypeName(event.target.value)}
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
										<td className="pa1">{field.dataType}</td>
										<td className="pa1">{field.inputType}</td>
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

			<div className='bb mb2'>
				<h4  className="bb mb0">Add Field</h4>
				<form>
					<TextInput
						label="Field Name:"
						value={newFieldName}
						handleInputChange={event => setNewFieldName(event.target.value)}
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
						value="Submit" 
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
	)
}

export default AddNewAssetType;