import React from 'react';
import { useDispatch } from 'react-redux'

import { setAccessory } from '../AccessoryCard/accessoryCardSlice';

import {useGetAccessoriesQuery } from '../../api/apiAccessoriesSlice';

const AccessoryList = () => {
    const {data: accessories, isSuccess } = useGetAccessoriesQuery();

    const dispatch = useDispatch();


    return(
        <div className="pa2">
            <h3 className="z-0">Accessories</h3>
            {!isSuccess 
                ?
                    <h1>LOADING</h1>
                : 
                    <div className="overflow-visible">
                        <table className="f7 w-100 mw8 center" cellSpacing="0">
                            <thead className="pt">
                                <tr className="stripe-dark">
                                    <th className="fw6 tl pa2 bg-white">Id</th>                        
                                    <th className="fw6 tl pa2 bg-white">Type</th>
                                    <th className="fw6 tl pa2 bg-white">Make</th>                            
                                    <th className="fw6 tl pa2 bg-white">Location</th>
                                </tr>
                            </thead>
                            <tbody className="lh-copy">     
                                {accessories.map((accessory,i) => {
                                    return (                            	
                                        <tr 
                                            className="stripe-dark pointer hide-child" 
                                            key={'movement ' + i}
                                            onClick={event => dispatch(setAccessory(accessory.accessory_id))}>
                                                <td className="pa1">{accessory.acc_id}</td>
                                                <td className="relative pa1">{accessory.accessory_type}
                                                    <span 
                                                        className="z-8 absolute dib white child bg-black-70 bottom-2 left-4 pa2 cover"
                                                        style={{pointerEvents: "none"}}>
                                                            {accessory.description ? accessory.description : 'No Description'}
                                                    </span></td>                                                
                                                <td className="pa1">{accessory.make}</td>                                             
                                                <td className="pa1">{accessory.location}</td>
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

export default AccessoryList;