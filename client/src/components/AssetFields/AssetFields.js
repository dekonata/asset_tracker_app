import React from 'react';
import SuggestBox from '../SuggestBox/SuggestBox';
import TextInput from '../TextInput/TextInput';

import { 
	useGetAssettypeFieldsQuery, 
	useGetTypeListsQuery
} from '../../api/apiAssettypesSlice';

// Dynamic asset type specific input fields for adding assets
const AssetFields = ({assettype, handleFieldInput, fieldInputData}) => {
	const {data:fields, isSuccess: gotFields} = useGetAssettypeFieldsQuery(assettype.toLowerCase());
	const {data:typeLists, isSuccess: gotSuggestLists} = useGetTypeListsQuery(assettype.toLowerCase());
	// 

	
	const showCustomFields = () => {
		const customFields = Object.keys(fields).map((fieldname, i) => {
			if(fields[fieldname].input_type === 'Suggest') {
				return (<SuggestBox 
					key={i}
					label={fieldname + ':'}
					suggestlist={typeLists[fieldname]}
					addNewEnabled={true} 
					handleInputChange={input_value => {
						// Until a value is selected or add new is selected, input_value = undefined
						// If undefined is returned to handleFieldInput and page re-renders, it breaks Suggestbox funcionality
						if(input_value) {
							return handleFieldInput({[fieldname]:input_value})
						}
						return
					}
					}
				/>)
			} else if (fields[fieldname].input_type.toLowerCase() === 'text') {
				return (<TextInput
					key={i}
					label={fieldname + ':'}
					value={fieldInputData[fieldname] ? fieldInputData[fieldname] : ''}
					handleInputChange={event => handleFieldInput({[fieldname]:event.target.value})}
				/>
				)
			}
		});
		return customFields;
	}

	return (
		<div className="">
			{/* {console.log(fields)} */}
			{!gotFields || !gotSuggestLists
				? 
				<h1> LOADING </h1>
				:
				showCustomFields()
			}
		</div>
	);
}

export default AssetFields;