import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SuggestBox from '../components/SuggestBox/SuggestBox';
import LocationCard from '../components/LocationCard/LocationCard';

import { setLocationId } from '../components/LocationCard/locationCardSlice';
import { 
	useGetLocationListsQuery
} from '../api/apiLocationsSlice'

const ViewEditLocation = () => {
	const dispatch = useDispatch();

	const parsed_id = useSelector(state => state.locations.locationId)
	const {data:locationList} = useGetLocationListsQuery();

	const onLocationSelect = (location) => {
		const parsed_id = location.substr(0,5);
		dispatch(setLocationId(parsed_id));
	}

	return (
		<div>
			<SuggestBox 
				label="Search Locations:"
				suggestlist={locationList}
				initial_input={parsed_id}
				handleInputChange={onLocationSelect}
			/>
			{parsed_id && 
			<div>
				<button
					onClick={(() => dispatch(setLocationId('')))}
				>BACK
				</button>
				<LocationCard/>
			</div>}
		</div>
	);
}

export default ViewEditLocation;


