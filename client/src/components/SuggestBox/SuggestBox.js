import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import useRoveFocus from "./useRoveFocus";
import ListItem from "./ListItem"

// Suggestbox accepts a array of values as suggeslist to show in dropdown
// Initial input may be provided to set initial text box value
// function must be provided to for changing value that will be captured
const SuggestBox = ({initial_input, label, suggestlist, addNewEnabled, handleInputChange}) => {
	const [suggestOpen, setSuggestOpen] = useState(false)
	const [filteredList, setFilteredList] = useState(['']);

	// Set filteredList value to first 10 values of suggestlist provided
	useEffect(() => {
		// // clear field and parent value for field if suggestlist chagnes
		// handleInputChange('');
		// setInputValue('')


    	if (Array.isArray(suggestlist)) {
    		const shortlist = suggestlist.slice(0,10)
    		setFilteredList(shortlist)
    	} else {
    		setFilteredList([])
    	}
    }, [suggestlist]);

	const [inputValue, setInputValue] = useState('')
	useEffect(() => {
    // If initial_input is provides, set inputValue
   		if(initial_input !== undefined) {
    		setInputValue(initial_input)
    	}
    }, [initial_input]);

	// Set/Change list item focus using arrow keys or during events
	const [focus, setFocus] = useRoveFocus(filteredList.length)

    // Ref added to input to enable closing suggestbox when user clicks outside this div
	const inputEl = useRef(null)

	useLayoutEffect(() => {
		// Add Event listener to body to close suggestbox when clicked
		const onBodyClick = event => {
			if(inputEl.current.contains(event.target)) {
				return
			} else {
				setSuggestOpen(false)
			}
		}
		document.body.addEventListener("click", onBodyClick)
		// Cleanup = Remove event listener 
		return () => {
			document.body.removeEventListener("click", onBodyClick)
		}
	}, [])

	const toggleSuggest = (event) => {
		if(suggestOpen) {
			setSuggestOpen(false)
			setFocus(-1)
		} else {
			setSuggestOpen(true)
			setFocus(-1)
		}
	}

	const handleInput = (event) => {
		setInputValue(event.target.value)
		handleInputChange(''); 
		setSuggestOpen(true)
		if (event.target.value && Array.isArray(suggestlist)) {
			const filtered = suggestlist.filter(suggest => {
				if(typeof suggest === 'string') {
					return suggest.toLowerCase().includes(event.target.value.toLowerCase());
				} else {
					return null
				}
			});
			setFilteredList(filtered.slice(0,10))
		} else if (Array.isArray(suggestlist)) {
			setFilteredList(suggestlist.slice(0,10));
		}
	}

	const handleSelect = (event) => {
		setInputValue(event.target.innerHTML);
		handleInputChange(event.target.innerHTML);
		// setFilteredList(suggestlist.slice(0,10));
		setSuggestOpen(false);
		setFocus(event.target.value)
		}

	const handleAddNew = event => {
		handleInputChange(inputValue)
		setSuggestOpen(false);
		setFilteredList([])
	}

	const handleKeyPress = (event) => {
		// Incomplete
		if(event.key === 'ArrowDown') {
			setSuggestOpen(true);
		} else if(event.keyCode === 9 ) {
			// tab
			setSuggestOpen(false)
		} else if(event.key === 'Enter') {
			handleInputChange(inputValue)
			setSuggestOpen(false)
		} else {
			return
		}
	}

	return (
	<div ref={inputEl}>
		{ Array.isArray(filteredList) ?
			<div className="relative pv1 flex items-center">
				<label className="dib w4 pr5 mv2">{label} </label>
				<div className="dib " >
					<input 
						className="pr5 h2 pv0"
						type='text'
						autoComplete='off'
						value={inputValue}
						onChange={handleInput}
						onClick={toggleSuggest}
						onKeyDown={handleKeyPress}
						/>
					{/*Add x to clear field. Currently set to dn (display:none)*/}
						<span className="dn absolute link pointer fw6 bold link dim" style={{right:"45px", top:"5px"}}>x</span>
					{suggestOpen ?
						<div className="" >
						 	<ul className="absolute w5 bg-white list ml0 mt0 pa1 center ba overflow z-max">
							 	{filteredList.map((item, index) => {
							 		return(
							 			<ListItem
							 				key={index}
							 				setFocus={setFocus}
							 				index={index}
							 				focus={focus === index}
							 				value={item}
							 				handleSelect={handleSelect}
							 				setSuggestOpen={setSuggestOpen}
							 			/>
							 		)
							 	})}
							 	{!filteredList.length && addNewEnabled ?
								 	<p onClick={handleAddNew} className="f6 link underline  b mv1 pointer">New {label}</p>
								 	: !filteredList.length ?
								 		<div className='b f6'>Invalid {label}</div>
								 		:
								 		<div></div>
							 	}
							</ul>
						</div>
					:
					<div></div>
					}
				</div>
			</div>
			:
			<div>Suggestlist not in correct Format</div>
		}
	</div>
	)
}


export default SuggestBox;