const {
	addLocation,
	getIdSuggestlist,
	getAllLocationsList,
	getLocationIDByTypeID,
	getLocationSuggestlists,
	getOneLocation,
	getLocationAssets,
	getLocationAccessories
} = require('../../models/locations.model.js');

const { getOneCabinetId } = require('../../models/cabinets.model.js');
const { getOneShelfId } = require('../../models/shelf.model.js');
const { getOneStaff } = require('../../models/staff.model.js')

async function httpAddLocation(req, res) {
	try {
			const location_data = req.body;
			return res.status(200).json(await addLocation(location_data));
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
}

async function httpGetIdSuggestList(req, res) {
	try {
		const locType = req.params.loctype;
		return res.status(200).json(await getIdSuggestlist(locType));
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}

}

async function httpGetAllLocationsList(req, res) {
	return res.status(200).json(await getAllLocationsList());
}

async function httpGetLocationSuggestlists(req, res) {
		return res.status(200).json(await getLocationSuggestlists());
}

async function httpGetOneLocation(req, res) {
	try {
		// Id in frontend location type id formatted as CAB01 or SHE01 or STAFF01

		const parsed_id = req.params.locationsid;
		console.log(parsed_id)
		// Extract the first part identifying the location taype CAB, SHE or STAFF
		const location_type = parsed_id.match(/[a-zA-Z]+/)[0];
		// Extract the location id number
		const location_type_id = Number(parsed_id.match(/[0-9]+/)[0]);

		let location_id;

		switch(location_type) {
			case 'CAB':
				location_id = await getLocationIDByTypeID('cabinet', location_type_id);
				break
			case 'SHE':
				location_id = await getLocationIDByTypeID('shelf', location_type_id);
				break
			case 'STAFF':
				location_id = await getLocationIDByTypeID('staff', location_type_id);
				break
			case 'LOC':
				location_id = await getLocationIDByTypeID('other_location', location_type_id);
				break
			default:
				return res.status(400).json('Invalid Location id');
		}

		if(!location_id) {
			return res.status(400).json("Location not found");
		}

		const location = await getOneLocation(location_id);
		const assets = await getLocationAssets(location_id);
		const accessories = await getLocationAccessories(location_id);

		const location_data = Object.assign({}, location, {assets:assets}, {accessories:accessories})

		return res.status(200).json(location_data);
	} catch (err) {
		return res.status(400).json(err);
	}
}

module.exports = {
	httpAddLocation,
	httpGetIdSuggestList,
	httpGetAllLocationsList,
	httpGetLocationSuggestlists,
	httpGetOneLocation,
}