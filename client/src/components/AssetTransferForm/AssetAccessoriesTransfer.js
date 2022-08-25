const AssetAccessoriesTransfer = ({accessory_list, onSelectAccessory}) => {

    return(
    	<div className="">
        	{accessory_list.length === 0
        		?
					<div><h3 className="tc"> No Accessories</h3></div> 
            	:
			        <div className="overflow-visible">  
			        	<h4 className="bb mb0"> Transfer Accessories </h4>      		
			            <table className="f7 w-100 mw8 center" cellSpacing="0">
			                <thead className="pt">
			                    <tr className="">		                    
			                        <th className="fw6 tl pa2">Id</th>                        
			                        <th className="fw6 tl pa2">Type</th>
			                        <th className="fw6 tl pa2">Make</th>                            
			                        <th className="fw6 tl pa2">Transferred</th>
			                    </tr>
			                </thead>
			                <tbody className="lh-copy ">     
			                    {accessory_list.map((accessory,i) => {
			                        return (                            	
			                            <tr 
			                                className="pointer hide-child ba" 
			                                key={'movement ' + i}
										>
		                                	<td className="pa1">
			                                	<label className="pa1">
			                                    	<input type="checkbox" 
			                                    		value={accessory.asset_id}
			                                    		className="v-mid"
			                                    		onChange={onSelectAccessory}
			                                    	/> {accessory.parsedid}
			                                    </label>		
			                                </td>	                             
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

export default AssetAccessoriesTransfer;
