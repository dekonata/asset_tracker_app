
CREATE VIEW all_assets
SELECT cellphone.cellphone_id AS type_id,
    'cellphone'::text AS asset_type,
    cellphone.serialnumber,
    cellphone.asset_id,
    cellphone.make,
    cellphone.model,
    cellphone.description,
    cellphone.asset_condition,
    cellphone.imei
   FROM cellphone
UNION ALL
 SELECT laptop.laptop_id AS type_id,
    'laptop'::text AS asset_type,
    laptop.serialnumber,
    laptop.asset_id,
    laptop.make,
    laptop.model,
    laptop.description,
    laptop.asset_condition,
    ''::bpchar AS imei
   FROM laptop
UNION ALL
 SELECT misc.misc_id AS type_id,
    misc.description AS asset_type,
    misc.serialnumber,
    misc.asset_id,
    misc.make,
    misc.model,
    misc.description,
    misc.asset_condition,
    ''::bpchar AS imei
   FROM misc
UNION ALL
 SELECT modem.modem_id AS type_id,
    'modem'::text AS asset_type,
    modem.serialnumber,
    modem.asset_id,
    modem.make,
    modem.model,
    modem.description,
    modem.asset_condition,
    modem.imei
   FROM modem
UNION ALL
 SELECT monitor.monitor_id AS type_id,
    'monitor'::text AS asset_type,
    monitor.serialnumber,
    monitor.asset_id,
    monitor.make,
    monitor.model,
    monitor.description,
    monitor.asset_condition,
    ''::bpchar AS imei
   FROM monitor
UNION ALL
 SELECT pc.pc_id AS type_id,
    'pc'::text AS asset_type,
    pc.serialnumber,
    pc.asset_id,
    pc.make,
    pc.model,
    pc.description,
    pc.asset_condition,
    ''::bpchar AS imei
   FROM pc
UNION ALL
 SELECT tablet.tablet_id AS type_id,
    'tablet'::text AS asset_type,
    tablet.serialnumber,
    tablet.asset_id,
    tablet.make,
    tablet.model,
    tablet.description,
    tablet.asset_condition,
    tablet.imei
   FROM tablet
UNION ALL
 SELECT accessory.accessory_id AS type_id,
    accessory.accessory_type AS asset_type,
    NULL::character varying(25) AS serialnumber,
    accessory.asset_id,
    accessory.make,
    ''::character varying AS model,
    accessory.description,
    ''::character varying(25) AS asset_condition,
    ''::text AS imei
   FROM accessory;