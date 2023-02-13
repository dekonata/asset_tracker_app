const db = require('../services/knex.js');

const TEST_ASSET_TYPE = {
	name: "server2",
	fields: [{name: 'Model', data_type: 'string', input_type: 'suggest'}, {name: 'Serialnumber', data_type: 'string', input_type: 'text'}]
}

async function addAssetType(data) {
	const { name, code, fields } = data;
	//create formatted table  name
	const tableName = name.toLowerCase().replaceAll(' ', '_');
	const query = await db.transaction(async trx => {
		// Add asset type into asset type table  to be able to dynamically join all tables
		await trx('asset_type')
			.insert(
				{
					table_name: tableName, 
					type_code: code.toUpperCase(),
					display_name: name,
				}
			);
		//create table with formatted name and id and fields provided
		// Foreign key references transfer_id table where global asset id will be generated
		await trx.schema.createTable(tableName, (table) => {
			table.increments(`type_id`).unique().primary();
			table.integer('asset_id').notNullable();
			table.foreign('asset_id').references('asset_id').inTable('transfer_id');
			fields.forEach((field) => {
				// Create formatter column name to be used in database tables
				const columnName = field['name'].toLowerCase().replaceAll(' ', '_');
				if(field.unique) {
					table.string(columnName, 25).unique();
				} else {
					table.string(columnName, 25);
				}
			})
		});
		

		// add new field details into field table
		const addFieldPromises = [];
		fields.forEach(field => {
			const columnName = field['name'].toLowerCase().replaceAll(' ', '_');
			addFieldPromises.push(
				trx('asset_field')
					.insert({
						column_name: columnName,
						input_type: field.input_type,
						data_type: field.data_type,
						is_unique: field.is_unique,
						display_name: field.name,
					}, 'field_id')
					.onConflict('column_name')
					.ignore()
			)
		});
		const addFields = await Promise.all(addFieldPromises);

		return;
	})

	return query;
}

async function getAllAssetTypes() {
	const query = await db('asset_type')
		.select('*');

	const typeObject = {};
	for(assettype of query) {
		const {display_name, ...rest} = assettype;
		typeObject[display_name] = {...rest};
	}
	return typeObject;
}

async function getAssetTypeFields(assettype) {
	if(!assettype) {
		throw new Error('No assettype provided')
	}
	// Convert assettype from Display Name to table name format
	const formattedName = assettype.toLowerCase().replaceAll(' ', '_');
	const columns = await db(formattedName)
					.columnInfo();

	const fieldsList = Object.keys(columns)

	const fieldsData = {};

	for(const field of fieldsList) {
		const data = await db('asset_field')
			.where({field_name: field})
			.whereNotNull('field_id');

		if(data.length) {
			fieldsData[field] = data[0];
		}

	}

	return fieldsData;
}

async function getTypeAssets(assettype) {
	// Convert assettype from Display Name to table name format
	const formattedName = assettype.toLowerCase().replaceAll(' ', '_');

	// Get Asset Type Data from asset_type table 
	// Naming gets confusing here because table is named asset_type
	const typeCode = await db('asset_type')
		.pluck('type_code')
		.where('type_name', formattedName)

	const columns = await db(formattedName)
		.columnInfo();

	// Get asset fields and add location fields to dynamically create query
	const columnFields = Object.keys(columns);
	const fields = columnFields.map(fieldname => {
		if(fieldname === 'asset_id') {
			return `${formattedName}.asset_id`
		}
		return fieldname
	})
	fields.push('location_code')
	


	const assets = await db(formattedName)
		.select(fields)
		.leftJoin('asset_transfer', 'asset_transfer.asset_id',`${formattedName}.asset_id`)
		.leftJoin('all_locations', 'all_locations.location_id', 'asset_transfer.location_id')
		.orderBy(`${formattedName}.serialnumber`)
		.orderBy('asset_transfer.transfer_date', 'desc');


	const assetsWithCode = assets.map((asset => {
		asset.type_id = typeCode[0] + String(asset.type_id).padStart(2, '0')
		return asset;
	}))

	return assets
}

async function getTypeSuggestLists(assettype) {
	// Get Asset fields
	const columns = await db(assettype)
					.columnInfo();

	const fields = Object.keys(columns)

	// Get Suggestlist for each field
	const suggestLists = {} 

	for(const field of fields) {
		const list = await db(assettype)
			.pluck(field)
			.distinctOn(field)
			.whereNotNull(field)

		suggestLists[field] = list;
	}

	return suggestLists;
}


// Function move to assettypes model - REMOVE
async function getAllTypeAssets2(asset_type) {
	try {
		return await 
			db(asset_type)
			.distinctOn(`${asset_type}.serialnumber`)
			.select(
					'serialnumber',
					db.raw(`CONCAT(make, ': ', model) AS model`),
					db.raw(`CONCAT(location_code, TO_CHAR(location_type_id, 'FM00'), ': ', location_name) as location`),
					'asset_condition'
				)
				.leftJoin('asset_transfer', 'asset_transfer.asset_id',`${asset_type}.asset_id`)
				.leftJoin('all_locations', 'all_locations.location_id', 'asset_transfer.location_id')
			.orderBy(`${asset_type}.serialnumber`)
			.orderBy('asset_transfer.transfer_date', 'desc');
		} catch (err) {
			throw err
		}
}

async function test() {
	try {
		const query = await getAllAssetTypes('test type');
		console.log(query)
	} catch(err) {
		console.log(err.message)
	}
}
// test();


module.exports = {
    addAssetType, 
    getAllAssetTypes, 
	getAssetTypeFields,
	getTypeAssets,
	getTypeSuggestLists,
}