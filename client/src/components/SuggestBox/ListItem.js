import { useRef, useEffect } from 'react';

const ListItem = ({ value, focus, index, setFocus, handleSelect, setSuggestOpen }) => {
	const itemRef = useRef(null);

	useEffect(() => {
		if (focus) {
			// Focus on this element if its index is equal to focus value as set in paramaters 
			itemRef.current.focus();
		}
	}, [focus]);

	const handleKeyPres = (event) => {
		if (event.key === "Enter") {
			handleSelect(event)
		} if (event.keyCode === 9) {
			// close suggestbox if tab is pressed and focus shifts to next component
			setSuggestOpen(false)

		}
	};

	return(
 		<li 
 			// set value as index to set focus on this element when selected using handleselect
 			value={index}
	 		className="hover-bg-gray pointer" 
	 		tabIndex={-1}
	 		ref={itemRef}
	 		onClick={handleSelect}
	 		onKeyDown={handleKeyPres}
 		>{value}</li>
	)
}

export default ListItem