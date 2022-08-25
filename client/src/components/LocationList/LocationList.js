import React from 'react';
import { useDispatch } from 'react-redux';

// import { setAsset } from '../AssetCard/assetCardSlice'

const LocationList = ({locations}) => {
    const dispatch = useDispatch();

    return(
        <div className="pa2">
            <h3 className="z-0">Locations</h3>
                <div className="overflow-visible">
                    <table className="f7 w-100 mw8 center" cellSpacing="0">
                        <thead className="pt">
                            <tr className="stripe-dark">
                                <th className="fw6 tl pa2 bg-white">Location Type</th>                        
                                <th className="fw6 tl pa2 bg-white">Location ID</th>
                                <th className="fw6 tl pa2 bg-white">Located</th>                            
                            </tr>
                        </thead>
                        <tbody className="lh-copy">     
                            {locations.map((location,i) => {
                                return (                            	
                                    <tr 
                                        className="stripe-dark pointer" 
                                        key={'movement ' + i}
                                        onClick={() => console.log('click')}>
                                            <td className="pa1">{location.location}</td>
                                            <td className="relative hide-child pa1">{location.location_type_id}</td>                                         
                                            <td className="pa1">{location.location_detail}</td>                                             
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default LocationList;