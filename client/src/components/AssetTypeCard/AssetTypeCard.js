import React from 'react'
import { useSelector } from 'react-redux';

const AssetTypeCard = () => {
	const assettype = useSelector(state => state.assettype.typeId);

	return(
		<div className=''>
			{console.log(assettype)}
		</div>
	)
}

export default AssetTypeCard;