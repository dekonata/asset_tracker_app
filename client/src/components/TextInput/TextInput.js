const TextInput = ({label, handleInputChange, value, type="text", autoComplete}) => {
	return (
		<div className="pv1 flex items-center">
			<label className="dib w4 pr5 mv2"> {label} </label>
			<div className="dib">
				<input 
					className="pr5 pb0 h2"
					value={value}
					title=""
					type={type} 
					required 
					autoComplete={autoComplete}
					onChange={handleInputChange}/> 
			</div>
		</div>
		)
}

export default TextInput