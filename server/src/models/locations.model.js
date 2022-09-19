// To Do: Create single access point for all Storage Types (cabinets, shelves, etc)
const db = require('../services/knex.js');

const { getUnusedIds } = require('../services/utils.js');
const {queryParsedLocations} = require('../services/utils.js');

const ID_RANGE = 100;

const DISPOSAL = {
	location: "DISPOSAL", 
	location_type_id: 1, 
	location_type: "disposal", 
	location_id: 99, 
	location_detail: "DISPOSAL"
}

const TEST_LOCATION = {
	location_type: 'staff',
	location_data: {
		location_name: 'Kriegler',
		description: 'Disposed: no longer part of stock'
	}
};

// TODO: 
async function addLocationType() {
	//TODO: Add functionality to add a location type with specified fields
	location_type = "storage"
	fields = 
	[
		{
			cname: "description",
			ctype: "string"
		},
		{
			cname: "location",
			ctype: "string"
		},
		{
			cname: "code",
			ctype: "string"
		}
	]
	const query = await db.schema.createTable('test', function (table) {
		table.increments(`${location_type}_id`).primary();
		table.integer('location_id');
		table.foreign('location_id')
				.references('transfer_location.location_id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		fields.forEach((field) => {
			if(field.ctype === "string") {
				table.string(field.cname);
			}
		})
	})
}

async function addLocation(data) {
	// location type needs to match location type table name
	const {location_type, location_data} = data;
	try {
		return await db.transaction(async trx => {
			const transfer_location = 
				await trx('transfer_location')
					.insert({
						location_type: location_type
					}, 'location_id');

			const insert_data = Object.assign({}, location_data, transfer_location[0]);

			const addStorage = 
				await trx(location_type)
					.insert(
						insert_data);

			return await transfer_location[0];
		});
	} catch(err) {
		throw err;
	}
}

async function getIdSuggestlist(location_type) {
	const usedIds = 
		await db.table(location_type)
			.pluck('location_type_id');

	const unusedIds = getUnusedIds(ID_RANGE, usedIds );

	const loc_code = 
		await db.table('location_code')
			.pluck('code')
			.where('location_type', location_type);

	const unusedIdCodes = unusedIds.map(id => loc_code[0]+String(id).padStart(2, '0'));

	return unusedIdCodes;
}


async function getAllLocationsList() {

	const locTypes = await
		db.table('transfer_location')
		.pluck('location_type')
		.distinct('location_type')
		// Must Exlude 1 to use as first select in union
		.whereNot('location_type', 'cabinet')

	const subquery = locTypes.map((locType => {
							return db.select(
								db.raw
									(`CONCAT(
										(select code from location_code WHERE location_type = '${locType}'), 
										TO_CHAR(location_type_id, 'FM00'),
										': ', 
										location_name
										) as location_code`),
								'location_id',
								)
								.from(locType)
							})) 


	const allLocationsQuery = await
		db.select(
				db.raw(`CONCAT((select code from location_code WHERE location_type = 'cabinet'), TO_CHAR(location_type_id, 'FM00'), ': ' , location_name) as location_code`),
				'location_id',
			)
			.from('cabinet')
			.unionAll(
				subquery
			)
		
		// Create list of id + name only as code to be used in frontend dropdown selector
		const selectList = allLocationsQuery.map(loc => loc.location_code)

		// Create map to retrieve location_id value for each selector value to submit for transfers
		const codeToIdMap = {}
		
		allLocationsQuery.forEach((loc) => {
			codeToIdMap[loc.location_code] = loc.location_id
		})

		return {selectList, codeToIdMap}
}

async function getLocationIDByTypeID(location_type, location_type_id) {
	try {
		const locationIDQuery = await
			db.pluck('location_id')
				.from('all_locations')
				.where({
					location_type,
					location_type_id
				});

	return locationIDQuery[0];
	} catch(err) {
		throw(err);
	}

}

async function getLocationSuggestlists() {
	const locationsQuery = await
		db.select(
			db.raw(`CONCAT(location_code, TO_CHAR(location_type_id, 'FM00'), ': ', location_name) as location`),
		)
		.from('all_locations')
		.whereNot('location_type', 'staff')

	const allLocations = locationsQuery.map(location => location.location);

	return allLocations
}

async function getOneLocation(location_id) {
	try {
		const locationQuery = await 
			db.select(
				db.raw(`CONCAT(location_code, TO_CHAR(location_type_id, 'FM00')) as location_code`),
				'location_type_id',
				'location_type',
				'location_name',
				'located',
				'description'
				)
				.from('all_locations')
				.where('location_id', location_id)



		return locationQuery[0]
	} catch(err) {
		throw(err)
	}
}

async function getLocationAssets(location_id) {
	try {
		const locAssetQuery = await
			db.select(
				'all_asset_locations.asset_id',
				'all_asset_locations.transfer_date',
				'all_assets.asset_type',
				'all_assets.serialnumber',
				db.raw(`CONCAT(make, ': ', model) AS model`),
				'all_assets.asset_condition'
			) 
			.from('all_assets')
			.leftJoin('all_asset_locations', 'all_assets.asset_id', 'all_asset_locations.asset_id')
			.where('location_id', location_id)
			// exclude accessories that do not have serialnumber
			.whereNotNull('serialnumber')

		return locAssetQuery;
	} catch (err) {
		throw err
	}
}

async function getLocationAccessories(location_id) {
	try {
		const locAccQuery = await
			db.select(
				'all_asset_locations.location_id',
				'accessory.asset_id',
				'all_asset_locations.transfer_date',
				'accessory.accessory_id',
				db.raw(`CONCAT('ACC', TO_CHAR(accessory.accessory_id, 'FM00')) as parsedid`),
				'accessory.accessory_type',
				'accessory.make',
				'accessory.description'
			) 
			.from('accessory')
			.leftJoin('all_asset_locations', 'accessory.asset_id', 'all_asset_locations.asset_id')
			.where('location_id', location_id)


		return locAccQuery
	} catch (err) {
		throw err
	}
}




// Delete when complete
async function test() {
	const newStorage = await getAllLocationsList();
	console.log(newStorage)
}

// test()


module.exports = {
	addLocation,
	getIdSuggestlist,
	getAllLocationsList,
	getLocationIDByTypeID,
	getLocationSuggestlists,
	getOneLocation,
	getLocationAssets,
	getLocationAccessories,
}