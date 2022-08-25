export const DateFormatter = (date) => {
	const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	const year = date.getFullYear()
	const formatted_date = day + '-' + month + '-' + year
	return formatted_date
}

// Format id from database to coded ID with padding
export const formatId = (idNumber, code, padding) => {
	const paddedID = idNumber.toString().padStart(padding, '0');
	return code + paddedID;
}

export const parsedLocationId = (location_type_id, location_type) => {
	const ID_PADDING = 2;
	const paddedID = location_type_id.toString().padStart(ID_PADDING, '0');
	if(location_type === 'staff') {
		return 'STAFF' + paddedID;
	} else if (location_type === 'cabinet' || location_type === 'shelf') {
		return location_type.slice(0, 3).toUpperCase() + paddedID
	}
}

