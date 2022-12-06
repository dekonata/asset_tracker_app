CREATE TABLE asset_field (
	field_id SERIAL PRIMARY KEY,
	field_name VARCHAR(25) NOT NULL UNIQUE,
	input_type VARCHAR(25) NOT NULL,
	data_type VARCHAR(25) NOT NULL
);