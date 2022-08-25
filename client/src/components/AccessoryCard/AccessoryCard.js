import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ViewEditField from '../ViewEditField/ViewEditField'
import AssetTransferForm from '../AssetTransferForm/AssetTransferForm'
import AccessoryMovementTable from '../AccessoryMovementTable/AccessoryMovementTable.js';

import { DateFormatter } from '../../utils/utils';

import {useGetOneAccessoryQuery, useEditAccessoryMutation } from '../../api/apiAccessoriesSlice';

import { 
    useGetAssetListsQuery,
     } 
     from '../../api/apiAssetSlice';

const AccessoriesCard = () => {
    const [moveOpen, setMoveOpen] = useState(false);

    const accessory_id  = useSelector(state => state.accessory.accId)

    const {data: accessory, isSuccess, refetch } = useGetOneAccessoryQuery(accessory_id);
    const {data:suggestlists} = useGetAssetListsQuery();
    const [editAccessory] = useEditAccessoryMutation();

    const handleEdit = async (data_field, editvalue) => {
        const editData = {
            accessory_id: accessory?.accessory_id,
            payload: {
                [data_field]: editvalue
            }
        }

        try {
            await editAccessory(editData).unwrap();
            refetch()
        } catch(err) { 
            alert(err.data.detail);
        }
    }

    const closeTransfer = () => {
        setMoveOpen(false)
    }

    const deleteMovement = () => {
            return
    }

    return(
        <div className=''>
            {!isSuccess
                ?
                    <h1>LOADINNG</h1>
                : 
                    <div>
                        <h3 className="bb"> Accessory Details</h3>
                        <div>
                            <span className="dib w4 pr5 mv2">Accessory ID:</span><span>{(accessory?.parsed_id)}</span>
                        </div>
                        <ViewEditField
                            input_type='suggest'
                            asset_type={'accessory'}
                            serial={accessory.accessory_id}
                            suggestlist={suggestlists?.acc?.typeList}
                            label= 'Type:'
                            value={accessory?.accessory_type}
                            data_field='accessory_type'
                            handleEdit={handleEdit}
                            />      
                        <ViewEditField
                            input_type='suggest'
                            asset_type={'accessory'}
                            serial={accessory.accessory_id}
                            suggestlist={suggestlists?.acc?.makeList}
                            label= 'Make:'
                            value={accessory?.make}
                            data_field='make'
                            handleEdit={handleEdit}
                            />
                        <ViewEditField
                            input_type='text'
                            asset_type={'accessory'}
                            serial={accessory.accessory_id}
                            label= 'Description:'
                            value={accessory?.description}
                            data_field='description'
                            handleEdit={handleEdit}
                            />     
                        <div>
                            <span className="dib w4 pr5 mv2">Location:</span><span>{(accessory?.location)}</span>
                        </div>                        
                        {moveOpen 
                        ?   
                            <AssetTransferForm
                                asset_id={accessory?.asset_id}
                                close_transfer={closeTransfer}
                                current_location={accessory?.location}
                            /> 
                        : 
                            <button 
                                className="mt3"
                                onClick={() => setMoveOpen(true)}
                                >Capure Stock Movement
                            </button>
                        }
                            <AccessoryMovementTable
                                accessory_id = {accessory?.accessory_id}
                                movements = {accessory?.transfers}
                                deleteMovement={deleteMovement}
                            />               
                    </div>

                        }
        }

            
        </div>
    )
}

export default AccessoriesCard;