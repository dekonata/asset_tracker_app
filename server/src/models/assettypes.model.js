const db = require('../services/knex.js');

const TEST_ASSET_TYPE = {
	name: "server2",
	fields: [{name: 'Model', data_type: 'string', input_type: 'suggest'}, {name: 'Serialnumber', data_type: 'string', input_type: 'text'}]
}

async function addAssetType(data) {
	const { name, code, fields } = data;
	const formattedName = name.toLowerCase().replaceAll(' ', '_');
	const query = await db.transaction(async trx => {
		// Add asset type into seet type table  to be able to dynamically join all tables
		await trx('asset_type')
			.insert(
				{
					type_name: name, 
					type_code: code
				}
			);
		//create table with lowercase name and id and fields provided
		await trx.schema.createTable(formattedName, (table) => {
			table.increments(`${formattedName.toLowerCase()}_id`).unique().primary();
			fields.forEach((field) => {
				const formattedFieldName = field['name'].toLowerCase().replaceAll(' ', '_');
				table.string(formattedFieldName, 25);
			})
		});

		// add new field details into field table
		const addFieldPromises = [];
		fields.forEach(field => {
			const formattedFieldName = field['name'].toLowerCase().replaceAll(' ', '_');
			addFieldPromises.push(
				trx('asset_field')
					.insert({
						field_name: formattedFieldName,
						input_type: field.input_type,
						data_type: field.data_type
					}, 'field_id')
					.onConflict('field_name')
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
							.pluck('type_name')
	return query
}

async function getAssetTypeFields(assettype) {
	const columns = await db('laptop')
					.columnInfo();

	const fieldsPromises = Object.keys(columns).map(column => {
		const fieldData = db('asset_field')
			.where({field_name: column});;
		return fieldData
	});

	const fieldsArray = await Promise.all(fieldsPromises);

	// Create object with field name as keys, and field data object as values
	const fields = fieldsArray.map(field => {
		if(field.length !== 0) {
			console.log('field: ' + field[0]);
			const { field_name, ...data } = field[0];
			return {[field_name]: data}
		} else {
			return 'Field not found'
		}
	})


	return fields;
}


async function test() {
	try {
		const query = await addAssetType(TEST_ASSET_TYPE);
		console.log(query)
	} catch(err) {
		console.log('error: ' + err)
	}
}
// test();


module.exports = {
    addAssetType, 
    getAllAssetTypes, 
	getAssetTypeFields,
}