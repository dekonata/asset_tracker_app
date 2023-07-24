--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: all_assets; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.all_assets AS
 SELECT cellphone.cellphone_id AS type_id,
    'cellphone'::text AS asset_type,
    cellphone.serialnumber,
    cellphone.asset_id,
    cellphone.make,
    cellphone.model,
    cellphone.description,
    cellphone.asset_condition,
    cellphone.imei
   FROM public.cellphone
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
   FROM public.laptop
UNION ALL
 SELECT misc.misc_id AS type_id,
    'misc'::text AS asset_type,
    misc.serialnumber,
    misc.asset_id,
    misc.make,
    misc.model,
    misc.description,
    misc.asset_condition,
    ''::bpchar AS imei
   FROM public.misc
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
   FROM public.modem
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
   FROM public.monitor
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
   FROM public.pc
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
   FROM public.tablet
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
   FROM public.accessory;


ALTER TABLE public.all_assets OWNER TO postgres;

--
-- PostgreSQL database dump complete
--

