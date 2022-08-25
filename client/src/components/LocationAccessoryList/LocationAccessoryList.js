import React from 'react';
import { useDispatch } from 'react-redux'

import { setAccessory } from '../AccessoryCard/accessoryCardSlice';
import { setViewEditPage } from '../../containers/ViewEdit/viewEditSlice'

// set select_enabled to true to allow for selecting accessory
const LocationAccessoryList = ({accessory_list}) => {
	const dispatch = useDispatch()

	const selectAccessory = (acc_id) => {
		dispatch(setAccessory(acc_id))
		dispatch(setViewEditPage('Accessories'))
	}

    return(
    	<div className="">
        	{accessory_list.length === 0
        		?
					<div><h3 className="tc"> No Accessories</h3></div> 
            	:
			        <div className="overflow-visible">        		
			            <table className="f7 w-100 mw8 center" cellSpacing="0">
			                <thead className="pt">
			                    <tr className="stripe-dark">
			                        <th className="fw6 tl pa2 bg-white">Id</th>                        
			                        <th className="fw6 tl pa2 bg-white">Type</th>
			                        <th className="fw6 tl pa2 bg-white">Make</th>                            
			                        <th className="fw6 tl pa2 bg-white">Transferred</th>
			                    </tr>
			                </thead>
			                <tbody className="lh-copy">     
			                    {accessory_list.map((accessory,i) => {
			                        return (                            	
			                            <tr 
			                                className="stripe-dark pointer hide-child" 
			                                key={'movement ' + i}
			                                onClick={event => selectAccessory(accessory?.accessory_id)}>
			                                    <td className="pa1">{accessory.parsedid}</td>
			                                    <td className="relative pa1">{accessory.accessory_type}
			                                        <span 
			                                            className="z-8 absolute dib white child bg-black-70 bottom-2 left-4 pa2 cover"
			                                            style={{pointerEvents: "none"}}>
			                                                {accessory.description ? accessory.description : 'No Description'}
			                                        </span></td>                                                
			                                    <td className="pa1">{accessory.make}</td>
			                                    <td className="pa1">{accessory.transfer_date}</td> 			                                                                                 
			                            </tr>
			                        )
			                    })}
			                </tbody>
	            		</table>
            	    </div>					
        	}
        </div>
    )
}

export default LocationAccessoryList;
