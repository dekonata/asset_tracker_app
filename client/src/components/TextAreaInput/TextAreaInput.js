const TextAreaInput = ({label, handleInputChange}) => {
	return (
		<div className="pv1 flex items-center">
			<label className="dib w4 pr5 mv2"> {label} </label>
			<div className="dib">
				<textarea
					className="pr5 pb0 h3"
					title=""
					type="textarea" 
					onChange={handleInputChange}
					>
				</textarea>
			</div>
		</div>
		)
}

export default TextAreaInput