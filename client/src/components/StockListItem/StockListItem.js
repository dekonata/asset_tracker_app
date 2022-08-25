import React, {useState} from 'react'
import SuggestBox from '../SuggestBox/SuggestBox';

const StockListItem = (label, value, suggestlist) => {
	const [changeOpen, setChangeOpen] = useState(false)
	const [changeValue, setChangeValue] = useState('')

	const handleClickChange = (event) =>{
		setChangeOpen(true)
	}

	const handleSubmit = (event) => {
		console.log(event)
		setChangeOpen(false)
	}
	
	return(
		<div>
		{ 	!changeOpen ?
				<div>
					<span className="dib w4 pr5 mv2">{label}</span>
					<span className="">{value}</span>
					<button className="link dim gray f6 f5-ns dib mr3 mv2 pointer fr" href=''
						value='stock_type'
						onClick={handleClickChange}>
					</button>	
				</div>	
			:
				<div>
					<SuggestBox 
						label={label}
						value={changeValue} 
						suggestlist={suggestlist}
						handleInputChange={input_value => setChangeValue(input_value)}
						/>
					<button className="link dim gray f6 f5-ns dib mr3 mv2 pointer fr" href=''
						value={value}
						onClick={handleSubmit}>
							Submit
					</button>	


				</div>

		}
		</div>

	)
}

export default StockListItem;