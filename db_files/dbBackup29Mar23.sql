--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

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
-- Name: access_type; Type: TYPE; Schema: public; Owner: albadmin
--

CREATE TYPE public.access_type AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.access_type OWNER TO albadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accessory; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.accessory (
    accessory_id integer NOT NULL,
    asset_id integer NOT NULL,
    accessory_type character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.accessory OWNER TO albadmin;

--
-- Name: accessory_accessory_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.accessory_accessory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accessory_accessory_id_seq OWNER TO albadmin;

--
-- Name: accessory_accessory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.accessory_accessory_id_seq OWNED BY public.accessory.accessory_id;


--
-- Name: asset_transfer; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.asset_transfer (
    transfer_id integer NOT NULL,
    asset_id integer NOT NULL,
    location_id integer NOT NULL,
    transfer_date date NOT NULL,
    capture_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.asset_transfer OWNER TO albadmin;

--
-- Name: all_asset_locations; Type: VIEW; Schema: public; Owner: albadmin
--

CREATE VIEW public.all_asset_locations AS
 SELECT DISTINCT ON (asset_transfer.asset_id) asset_transfer.asset_id,
    asset_transfer.location_id,
    asset_transfer.transfer_date
   FROM public.asset_transfer
  ORDER BY asset_transfer.asset_id, asset_transfer.transfer_date DESC, asset_transfer.capture_time DESC;


ALTER TABLE public.all_asset_locations OWNER TO albadmin;

--
-- Name: cellphone; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.cellphone (
    cellphone_id integer NOT NULL,
    asset_id integer NOT NULL,
    serialnumber character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    model character varying(25) NOT NULL,
    asset_condition character varying(25) NOT NULL,
    imei character(15) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.cellphone OWNER TO albadmin;

--
-- Name: laptop; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.laptop (
    laptop_id integer NOT NULL,
    asset_id integer NOT NULL,
    serialnumber character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    model character varying(25) NOT NULL,
    asset_condition character varying(25) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.laptop OWNER TO albadmin;

--
-- Name: misc; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.misc (
    misc_id integer NOT NULL,
    asset_id integer NOT NULL,
    description character varying(25) NOT NULL,
    serialnumber character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    model character varying(25) NOT NULL,
    asset_condition character varying(25) NOT NULL
);


ALTER TABLE public.misc OWNER TO albadmin;

--
-- Name: modem; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.modem (
    modem_id integer NOT NULL,
    asset_id integer NOT NULL,
    serialnumber character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    model character varying(25) NOT NULL,
    asset_condition character varying(25) NOT NULL,
    imei character(15) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.modem OWNER TO albadmin;

--
-- Name: monitor; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.monitor (
    monitor_id integer NOT NULL,
    asset_id integer NOT NULL,
    serialnumber character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    model character varying(25) NOT NULL,
    asset_condition character varying(25) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.monitor OWNER TO albadmin;

--
-- Name: pc; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.pc (
    pc_id integer NOT NULL,
    asset_id integer NOT NULL,
    serialnumber character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    model character varying(25) NOT NULL,
    asset_condition character varying(25) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.pc OWNER TO albadmin;

--
-- Name: tablet; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.tablet (
    tablet_id integer NOT NULL,
    asset_id integer NOT NULL,
    serialnumber character varying(25) NOT NULL,
    make character varying(25) NOT NULL,
    model character varying(25) NOT NULL,
    asset_condition character varying(25) NOT NULL,
    imei character(15),
    description character varying(255)
);


ALTER TABLE public.tablet OWNER TO albadmin;

--
-- Name: all_assets; Type: VIEW; Schema: public; Owner: albadmin
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
    misc.description AS asset_type,
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


ALTER TABLE public.all_assets OWNER TO albadmin;

--
-- Name: cabinet; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.cabinet (
    location_type_id integer NOT NULL,
    location_id integer NOT NULL,
    location_name character varying(25) NOT NULL,
    located character varying(25) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.cabinet OWNER TO albadmin;

--
-- Name: other_location; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.other_location (
    location_type_id integer NOT NULL,
    location_id integer,
    location_name character varying(25) NOT NULL,
    description character varying(255),
    located character varying(25)
);


ALTER TABLE public.other_location OWNER TO albadmin;

--
-- Name: shelf; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.shelf (
    location_type_id integer NOT NULL,
    location_id integer NOT NULL,
    location_name character varying(25) NOT NULL,
    located character varying(25) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.shelf OWNER TO albadmin;

--
-- Name: staff; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.staff (
    location_type_id integer NOT NULL,
    location_id integer NOT NULL,
    location_name character varying(25) NOT NULL,
    firstname character varying(25) NOT NULL,
    lastname character varying(25) NOT NULL,
    email character varying(255) NOT NULL,
    hash character(60) NOT NULL,
    access public.access_type NOT NULL
);


ALTER TABLE public.staff OWNER TO albadmin;

--
-- Name: all_locations; Type: VIEW; Schema: public; Owner: albadmin
--

CREATE VIEW public.all_locations AS
 SELECT cabinet.location_type_id,
    'cabinet'::text AS location_type,
    'CAB'::text AS location_code,
    cabinet.location_name,
    cabinet.location_id,
    cabinet.located,
    cabinet.description,
    ''::text AS firstname,
    ''::text AS lastname
   FROM public.cabinet
UNION ALL
 SELECT shelf.location_type_id,
    'shelf'::text AS location_type,
    'SHE'::text AS location_code,
    shelf.location_name,
    shelf.location_id,
    shelf.located,
    shelf.description,
    ''::text AS firstname,
    ''::text AS lastname
   FROM public.shelf
UNION ALL
 SELECT staff.location_type_id,
    'staff'::text AS location_type,
    'STAFF'::text AS location_code,
    staff.location_name,
    staff.location_id,
    ''::character varying AS located,
    ''::character varying AS description,
    staff.firstname,
    staff.lastname
   FROM public.staff
UNION ALL
 SELECT other_location.location_type_id,
    'other_location'::text AS location_type,
    'LOC'::text AS location_code,
    other_location.location_name,
    other_location.location_id,
    ''::character varying AS located,
    other_location.description,
    ''::text AS firstname,
    ''::text AS lastname
   FROM public.other_location;


ALTER TABLE public.all_locations OWNER TO albadmin;

--
-- Name: asset_note; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.asset_note (
    note_id integer NOT NULL,
    asset_id integer NOT NULL,
    note character varying(255) NOT NULL,
    capture_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.asset_note OWNER TO albadmin;

--
-- Name: asset_notes_note_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.asset_notes_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asset_notes_note_id_seq OWNER TO albadmin;

--
-- Name: asset_notes_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.asset_notes_note_id_seq OWNED BY public.asset_note.note_id;


--
-- Name: cabinet_cabinet_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.cabinet_cabinet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabinet_cabinet_id_seq OWNER TO albadmin;

--
-- Name: cabinet_cabinet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.cabinet_cabinet_id_seq OWNED BY public.cabinet.location_type_id;


--
-- Name: cellphone_cellphone_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.cellphone_cellphone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cellphone_cellphone_id_seq OWNER TO albadmin;

--
-- Name: cellphone_cellphone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.cellphone_cellphone_id_seq OWNED BY public.cellphone.cellphone_id;


--
-- Name: laptop_laptop_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.laptop_laptop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.laptop_laptop_id_seq OWNER TO albadmin;

--
-- Name: laptop_laptop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.laptop_laptop_id_seq OWNED BY public.laptop.laptop_id;


--
-- Name: location_code; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.location_code (
    code character varying(10) NOT NULL,
    location_type character varying(25) NOT NULL
);


ALTER TABLE public.location_code OWNER TO albadmin;

--
-- Name: misc_accessory_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.misc_accessory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.misc_accessory_id_seq OWNER TO albadmin;

--
-- Name: misc_accessory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.misc_accessory_id_seq OWNED BY public.misc.misc_id;


--
-- Name: modem_modem_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.modem_modem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modem_modem_id_seq OWNER TO albadmin;

--
-- Name: modem_modem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.modem_modem_id_seq OWNED BY public.modem.modem_id;


--
-- Name: monitor_monitor_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.monitor_monitor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.monitor_monitor_id_seq OWNER TO albadmin;

--
-- Name: monitor_monitor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.monitor_monitor_id_seq OWNED BY public.monitor.monitor_id;


--
-- Name: other_location_other_location_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.other_location_other_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.other_location_other_location_id_seq OWNER TO albadmin;

--
-- Name: other_location_other_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.other_location_other_location_id_seq OWNED BY public.other_location.location_type_id;


--
-- Name: pc_pc_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.pc_pc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pc_pc_id_seq OWNER TO albadmin;

--
-- Name: pc_pc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.pc_pc_id_seq OWNED BY public.pc.pc_id;


--
-- Name: shelf_shelf_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.shelf_shelf_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shelf_shelf_id_seq OWNER TO albadmin;

--
-- Name: shelf_shelf_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.shelf_shelf_id_seq OWNED BY public.shelf.location_type_id;


--
-- Name: staff_staff_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.staff_staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.staff_staff_id_seq OWNER TO albadmin;

--
-- Name: staff_staff_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.staff_staff_id_seq OWNED BY public.staff.location_type_id;


--
-- Name: tablet_tablet_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.tablet_tablet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tablet_tablet_id_seq OWNER TO albadmin;

--
-- Name: tablet_tablet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.tablet_tablet_id_seq OWNED BY public.tablet.tablet_id;


--
-- Name: transfer_id; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.transfer_id (
    asset_id integer NOT NULL,
    asset_type character varying(25) NOT NULL
);


ALTER TABLE public.transfer_id OWNER TO albadmin;

--
-- Name: transfer_asset_asset_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.transfer_asset_asset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transfer_asset_asset_id_seq OWNER TO albadmin;

--
-- Name: transfer_asset_asset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.transfer_asset_asset_id_seq OWNED BY public.transfer_id.asset_id;


--
-- Name: transfer_location; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.transfer_location (
    location_id integer NOT NULL,
    location_type character varying(25) NOT NULL
);


ALTER TABLE public.transfer_location OWNER TO albadmin;

--
-- Name: transfer_location_location_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.transfer_location_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transfer_location_location_id_seq OWNER TO albadmin;

--
-- Name: transfer_location_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.transfer_location_location_id_seq OWNED BY public.transfer_location.location_id;


--
-- Name: transfer_notes; Type: TABLE; Schema: public; Owner: albadmin
--

CREATE TABLE public.transfer_notes (
    note_id integer NOT NULL,
    transfer_id integer NOT NULL,
    note character varying(255) NOT NULL,
    capture_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.transfer_notes OWNER TO albadmin;

--
-- Name: transfer_notes_note_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.transfer_notes_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transfer_notes_note_id_seq OWNER TO albadmin;

--
-- Name: transfer_notes_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.transfer_notes_note_id_seq OWNED BY public.transfer_notes.note_id;


--
-- Name: transfer_transfer_id_seq; Type: SEQUENCE; Schema: public; Owner: albadmin
--

CREATE SEQUENCE public.transfer_transfer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transfer_transfer_id_seq OWNER TO albadmin;

--
-- Name: transfer_transfer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: albadmin
--

ALTER SEQUENCE public.transfer_transfer_id_seq OWNED BY public.asset_transfer.transfer_id;


--
-- Name: accessory accessory_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.accessory ALTER COLUMN accessory_id SET DEFAULT nextval('public.accessory_accessory_id_seq'::regclass);


--
-- Name: asset_note note_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.asset_note ALTER COLUMN note_id SET DEFAULT nextval('public.asset_notes_note_id_seq'::regclass);


--
-- Name: asset_transfer transfer_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.asset_transfer ALTER COLUMN transfer_id SET DEFAULT nextval('public.transfer_transfer_id_seq'::regclass);


--
-- Name: cabinet location_type_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cabinet ALTER COLUMN location_type_id SET DEFAULT nextval('public.cabinet_cabinet_id_seq'::regclass);


--
-- Name: cellphone cellphone_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cellphone ALTER COLUMN cellphone_id SET DEFAULT nextval('public.cellphone_cellphone_id_seq'::regclass);


--
-- Name: laptop laptop_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.laptop ALTER COLUMN laptop_id SET DEFAULT nextval('public.laptop_laptop_id_seq'::regclass);


--
-- Name: misc misc_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.misc ALTER COLUMN misc_id SET DEFAULT nextval('public.misc_accessory_id_seq'::regclass);


--
-- Name: modem modem_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.modem ALTER COLUMN modem_id SET DEFAULT nextval('public.modem_modem_id_seq'::regclass);


--
-- Name: monitor monitor_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.monitor ALTER COLUMN monitor_id SET DEFAULT nextval('public.monitor_monitor_id_seq'::regclass);


--
-- Name: other_location location_type_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.other_location ALTER COLUMN location_type_id SET DEFAULT nextval('public.other_location_other_location_id_seq'::regclass);


--
-- Name: pc pc_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.pc ALTER COLUMN pc_id SET DEFAULT nextval('public.pc_pc_id_seq'::regclass);


--
-- Name: shelf location_type_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.shelf ALTER COLUMN location_type_id SET DEFAULT nextval('public.shelf_shelf_id_seq'::regclass);


--
-- Name: staff location_type_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.staff ALTER COLUMN location_type_id SET DEFAULT nextval('public.staff_staff_id_seq'::regclass);


--
-- Name: tablet tablet_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.tablet ALTER COLUMN tablet_id SET DEFAULT nextval('public.tablet_tablet_id_seq'::regclass);


--
-- Name: transfer_id asset_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_id ALTER COLUMN asset_id SET DEFAULT nextval('public.transfer_asset_asset_id_seq'::regclass);


--
-- Name: transfer_location location_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_location ALTER COLUMN location_id SET DEFAULT nextval('public.transfer_location_location_id_seq'::regclass);


--
-- Name: transfer_notes note_id; Type: DEFAULT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_notes ALTER COLUMN note_id SET DEFAULT nextval('public.transfer_notes_note_id_seq'::regclass);


--
-- Data for Name: accessory; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.accessory (accessory_id, asset_id, accessory_type, make, description) FROM stdin;
1	4	Laptop Power Suppy	Lenovo	Squary Connector Lenovo PSU
2	25	Wireless Headset	Jabra	Evolve 65
3	26	Laptop Backpack	Targus	Grey Laptop Backpack
5	42	Tablet Pouch	e.	Bamboo Craft Tablet Pouch
6	47	Laptop Power Suppy	Apple	2021 Macbook PSU
7	48	Laptop Case	Thule	18" Protective Laptop Case
8	49	Thunderbolt Adapter	Apple	Thunderbolt 3 to 2 Adapter
9	54	iPhone 12 Case	Apple	iPhone 12 Protective Case
10	55	iPhone Power Supply	Apple	20W USB-C Power Adaptor 
11	56	Lightning Cable	Apple	1M USB C to Lightning Cable
12	57	Laptop Backpack	Thule	15" Laptop Backpack
14	66	Trackpad	Apple	Apple TrackPad: (Model: A1339)
15	67	Mouse	Apple	Apple Mouse: (Model: A1657)
16	68	Laptop Power Suppy	Apple	MacBook Pro Charger: (Model : A1424)
17	69	Laptop Backpack	Targus	Grey Laptop Backpack
18	70	Laptop Case	Thule	
22	88	Mouse	Microsoft	Wireless Bluetooth Mouse
23	90	Laptop Backpack	Targus	
24	91	Mouse	Microsoft	Bluetooth Mouse
28	98	QDOS Connector/Adapter	Apple	QDOS Connector/Adapter
29	99	Laptop Case	Thule	\N
30	100	Laptop Power Suppy	Apple	2019 Macbook PSU
31	102	Apple Pen	Apple	QDOS Connector/Adapter
32	103	Ipad Charger	Apple	\N
48	126	Cellphone Charger	Huawei	
49	127	Laptop Power Suppy	Lenovo	Square Connector Lenovo PSU
50	129	Jabra Bluetooth Dongle	Jabra	Bluetooth dongle to connect Jabra Headset to Laptop
51	131	Jabra Bluetooth Dongle	Jabra	Bluetooth Dongle Used with Jabra Evolve Headset
52	134	Jabra Bluetooth Dongle	Jabra	Bluetooth Dongle used with Jabra Headset
53	138	Laptop Power Suppy	HP	45W TPN-LA15 PSU
54	139	Laptop Case	Thule	15.6 Inch Hard Shell Cover
55	151	Laptop Case	Thule	Macbook Pro-14 Inch Gauntlet 4.0
56	152	Laptop Case	Thule	Macbook Pro 14- Inch Gauntlet 4.
\.


--
-- Data for Name: asset_note; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.asset_note (note_id, asset_id, note, capture_time) FROM stdin;
1	43	Do not have passcode to unlock. Cannot read serialnumber	2022-09-20 13:23:28.315
2	45	Cannot turn on. Serial and model not on body.	2022-09-20 13:25:45.045771
3	62	Does not boot. SSD may have failed.	2022-11-10 11:11:15.106537
4	62	Tried to do restore from Web, machine takes long time to load into recovery. Restore started but failed after a few hours.	2022-11-14 11:51:32.942
5	62	DigiCape are replacing SSD Drive. Advised data cannot be recovered.	2022-11-22 13:38:38.83668
\.


--
-- Data for Name: asset_transfer; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.asset_transfer (transfer_id, asset_id, location_id, transfer_date, capture_time) FROM stdin;
1	1	2	2022-09-20	2022-09-20 08:49:16.351279
2	2	2	2022-09-20	2022-09-20 08:51:21.900898
3	3	2	2022-09-19	2022-09-20 08:55:40.776389
4	4	2	2022-09-19	2022-09-20 08:55:40.776389
5	7	2	2022-09-20	2022-09-20 09:09:34.44763
6	8	2	2022-09-19	2022-09-20 09:12:08.154317
7	9	4	2022-09-20	2022-09-20 09:19:02.545546
8	11	5	2022-09-20	2022-09-20 11:00:23.306127
9	12	5	2022-09-19	2022-09-20 11:01:38.04594
10	13	5	2022-09-19	2022-09-20 11:04:09.046643
11	14	5	2022-09-19	2022-09-20 11:06:45.468456
12	15	5	2022-09-19	2022-09-20 11:07:29.768798
13	16	5	2022-09-19	2022-09-20 11:08:42.694267
14	17	5	2022-09-19	2022-09-20 11:09:57.240507
15	18	5	2022-09-20	2022-09-20 11:14:54.529034
16	19	4	2022-09-19	2022-09-20 11:22:57.731854
17	20	4	2022-09-19	2022-09-20 11:25:03.258385
18	21	4	2022-09-19	2022-09-20 11:26:49.812519
19	22	4	2022-09-20	2022-09-20 11:39:15.97678
20	23	4	2022-09-19	2022-09-20 11:40:36.331203
21	24	4	2022-09-20	2022-09-20 11:45:12.333441
22	25	2	2022-09-20	2022-09-20 11:47:47.425057
23	26	2	2022-09-20	2022-09-20 11:48:30.69809
24	27	5	2022-09-20	2022-09-20 11:54:39.759623
25	28	5	2022-09-19	2022-09-20 11:55:56.64108
26	29	5	2022-09-19	2022-09-20 11:59:30.40431
27	30	5	2022-09-19	2022-09-20 12:01:00.663426
28	31	6	2022-09-20	2022-09-20 12:21:44.75119
29	32	6	2022-09-19	2022-09-20 12:23:33.122931
30	33	6	2022-09-19	2022-09-20 12:24:56.952277
31	34	6	2022-09-19	2022-09-20 12:26:05.562126
32	35	6	2022-09-19	2022-09-20 12:28:31.233653
33	36	6	2022-09-19	2022-09-20 12:30:28.980428
34	37	6	2022-09-19	2022-09-20 12:32:12.599736
35	38	6	2022-09-19	2022-09-20 12:35:30.224375
36	39	5	2022-09-20	2022-09-20 12:56:20.927427
38	41	5	2022-09-19	2022-09-20 12:58:30.173382
39	42	5	2022-09-20	2022-09-20 12:58:30.173382
40	43	5	2022-09-20	2022-09-20 13:20:42.483843
41	45	5	2022-09-20	2022-09-20 13:24:29.229165
42	46	8	2022-09-21	2022-09-21 12:48:03.284179
43	47	8	2022-09-21	2022-09-21 12:48:03.284179
44	48	8	2022-09-21	2022-09-21 12:48:03.284179
45	49	8	2022-09-21	2022-09-21 12:48:03.284179
46	53	8	2022-09-21	2022-09-21 12:56:11.279026
47	54	8	2022-09-21	2022-09-21 12:56:11.279026
48	55	8	2022-09-21	2022-09-21 12:56:11.279026
49	56	8	2022-09-21	2022-09-21 12:56:11.279026
50	57	8	2022-09-21	2022-09-21 12:57:05.540102
51	58	8	2022-09-21	2022-09-21 12:58:09.30125
52	59	8	2022-09-20	2022-09-21 12:59:41.982336
53	60	8	2022-09-20	2022-09-21 13:00:36.503004
55	62	13	2022-09-21	2022-09-21 13:03:18.650534
56	63	13	2022-09-20	2022-09-21 13:04:49.657008
57	64	13	2022-09-21	2022-09-21 13:06:01.034566
58	65	13	2022-09-20	2022-09-21 13:06:39.01807
59	66	13	2022-09-21	2022-09-21 13:07:18.974905
60	67	13	2022-09-21	2022-09-21 13:07:37.356397
61	68	13	2022-09-21	2022-09-21 13:07:52.004088
62	69	13	2022-09-21	2022-09-21 13:08:16.733481
63	70	13	2022-09-21	2022-09-21 13:08:32.984334
64	73	13	2022-09-21	2022-09-21 13:10:04.389757
66	75	13	2022-09-20	2022-09-21 13:11:57.974176
71	75	10	2022-09-21	2022-09-21 13:56:02.087655
73	80	10	2022-09-21	2022-09-21 14:34:43.059494
76	81	9	2022-09-22	2022-09-22 11:23:03.880086
77	82	9	2022-09-21	2022-09-22 11:24:11.283975
78	83	12	2022-09-21	2022-09-22 11:26:34.357021
79	86	14	2022-09-22	2022-09-22 11:31:53.187282
80	87	14	2022-09-22	2022-09-22 11:44:09.56226
81	88	12	2022-09-22	2022-09-22 11:44:54.559047
82	89	12	2022-09-22	2022-09-22 11:45:41.109026
83	90	10	2022-09-22	2022-09-22 11:47:12.056571
84	91	10	2022-09-22	2022-09-22 11:47:45.994503
85	92	10	2022-09-22	2022-09-22 11:48:21.723221
90	97	11	2022-09-22	2022-09-22 12:16:08.134312
91	98	11	2022-09-22	2022-09-22 12:16:08.134312
92	99	11	2022-09-22	2022-09-22 12:16:08.134312
93	100	11	2022-09-22	2022-09-22 12:16:08.134312
94	101	11	2022-09-21	2022-09-22 12:17:35.899528
95	102	11	2022-09-21	2022-09-22 12:17:35.899528
96	103	11	2022-09-21	2022-09-22 12:17:35.899528
100	110	11	2022-09-21	2022-09-22 12:19:49.727333
101	111	11	2022-09-21	2022-09-22 12:19:49.727333
102	112	11	2022-09-21	2022-09-22 12:19:49.727333
103	113	11	2022-09-22	2022-09-22 12:19:49.727333
104	114	11	2022-09-21	2022-09-22 12:19:49.727333
105	115	11	2022-09-21	2022-09-22 12:19:49.727333
106	116	11	2022-09-21	2022-09-22 12:19:49.727333
107	117	11	2022-09-21	2022-09-22 12:20:22.910465
108	118	11	2022-09-21	2022-09-22 12:20:22.910465
109	119	11	2022-09-21	2022-09-22 12:20:22.910465
110	120	11	2022-09-22	2022-09-22 12:20:22.910465
111	121	11	2022-09-21	2022-09-22 12:20:22.910465
112	122	11	2022-09-21	2022-09-22 12:20:22.910465
114	124	8	2022-09-22	2022-09-22 13:13:34.583653
115	125	14	2022-09-23	2022-09-23 13:00:36.184889
116	126	10	2022-09-28	2022-09-28 06:43:46.190313
117	127	10	2022-09-28	2022-09-28 06:45:22.001398
118	12	13	2022-11-09	2022-11-09 09:08:03.093295
119	62	2	2022-11-10	2022-11-10 11:10:40.605847
120	62	5	2022-11-14	2022-11-14 14:41:07.269187
121	62	17	2022-11-18	2022-11-22 13:38:00.061461
122	62	13	2022-11-24	2022-11-29 07:32:39.574349
123	12	5	2022-11-24	2022-11-29 07:33:25.575025
124	18	2	2023-01-10	2023-01-10 13:23:56.770341
125	128	2	2023-02-03	2023-02-06 08:57:59.206666
126	129	2	2023-02-03	2023-02-06 08:57:59.206666
127	130	10	2023-02-02	2023-02-06 09:00:01.434314
128	131	10	2023-02-02	2023-02-06 09:00:01.434314
129	133	12	2023-02-06	2023-02-06 09:03:29.020374
130	134	12	2023-02-06	2023-02-06 09:03:29.020374
131	136	6	2023-02-06	2023-02-06 13:59:10.966289
132	137	2	2023-02-09	2023-02-13 14:05:33.136895
133	138	2	2023-02-09	2023-02-13 14:05:33.136895
134	137	12	2023-02-14	2023-02-14 10:58:52.858446
135	139	12	2023-02-14	2023-02-14 11:00:21.824318
136	138	12	2023-02-14	2023-02-14 11:05:46.139248
137	82	2	2023-02-15	2023-02-20 13:55:22.537926
138	81	5	2023-02-15	2023-02-20 13:56:45.059978
139	140	11	2023-03-14	2023-03-27 09:14:23.130592
140	141	18	2023-03-14	2023-03-27 09:17:00.069621
141	142	18	2023-03-27	2023-03-27 10:32:39.775877
142	145	18	2023-03-26	2023-03-27 10:34:00.520931
143	146	6	2023-03-27	2023-03-27 10:44:31.174591
144	147	6	2023-03-26	2023-03-27 10:45:31.385981
145	148	6	2023-03-26	2023-03-27 10:45:59.282547
146	149	6	2023-03-26	2023-03-27 10:46:27.757587
147	150	6	2023-03-27	2023-03-27 10:50:14.446266
148	146	19	2023-03-28	2023-03-29 07:15:02.715417
149	151	11	2023-03-29	2023-03-29 07:27:40.368068
150	152	11	2023-03-29	2023-03-29 07:28:17.315827
151	152	18	2023-03-29	2023-03-29 07:29:01.342241
\.


--
-- Data for Name: cabinet; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.cabinet (location_type_id, location_id, location_name, located, description) FROM stdin;
1	5	Unit 4 Tech Cabinet	AS Office, Unit 4	Technical Asset Storage Cabinet
10	7	Server Cabinet 1	AS Office, Unit 5	Server Rack Mount Cabinet
\.


--
-- Data for Name: cellphone; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.cellphone (cellphone_id, asset_id, serialnumber, make, model, asset_condition, imei, description) FROM stdin;
1	1	R5CRC0JH89V	Samsung	Galaxy S21 5G	Used	354647889432092	\N
2	2	F4GZ922TN735	Apple	iPhone 11	Used	354005102257244	\N
3	8	9WVDU1861301533	Huawei	P20 lite	Used	863675045945685	\N
4	18	EPHUT20312004148	Huawei	P40 lite	Used	861324046759439	\N
5	27	923052	Apple	iPhone 5	Used	013345009230529	\N
6	28	015677	Apple	iPhone 5	Used	013719000156778	\N
7	29	FFNVHXTTHXR5	Apple	iPhone 6	Used	359480083431438	\N
8	30	DPAP1P170300360	Doopro	P1 Pro	Used	358751080007194	\N
9	43	Unkown	Apple	iPhone 6	Used	Unkown         	\N
11	45	Unkown2	HOMTOM	Unkown	Used	Unkown2        	\N
13	53	G6TFV0TT0D8X	Apple	iPhone 12	Used	xxxxxxxxxxxxxxx	\N
14	60	RF8M80E80KR 	Samsung	Galaxy S10 SM-G973F 	Used	xxxxxxxxxxxxxx1	\N
16	80	WCV0219417000692	Huawei	P30 Lite	Used	868161041349052	\N
17	82	FK1ZG1YQN70X	Apple	iPhone 11	Used	353918101382972	iPhone 11 Pro Max
18	87	F4GZG79EN73C	Apple	iPhone 11	Used	xxxxxxxxxxxxxx2	\N
19	117	G6VVPBG8JCLH	Apple	iPhone X	Used	xxxxxxxxxxxxxx3	\N
\.


--
-- Data for Name: laptop; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.laptop (laptop_id, asset_id, serialnumber, make, model, asset_condition, description) FROM stdin;
1	3	PF0NQFTY	Lenovo	Thinkpad E560	Used	\N
2	11	C02R88GPG8WP	Apple	Macbook Pro 15" (A1398)	Used	\N
3	12	C02ML38EFD57	Apple	Macbook Pro 15" (A1398)	Used	\N
4	13	C02G9ELVDRJ9	Apple	Macbook Pro A1278	Used	\N
5	14	W89492097XK	Apple	Macbook Pro A1286	Used	\N
6	15	C02GLTY5DV7L	Apple	Macbook Pro A1286	Used	\N
8	17	YB04338791	Lenovo	Yoga 2 Pro	Used	\N
9	46	F19NKG7J4C	Apple	Macbook Pro A2442	Used	MacBook Pro 14 Inch (2021) 
11	75	MP12LJ4M	Lenovo	E41-80	Used	\N
12	81	C02SG349G8WN	Apple	Macbook Pro A1398	Used	Macbook Pro (Retina, 15-inch, Mid 2015)
13	83	MP10GLA6	Lenovo	E50-80	Used	\N
17	97	C02ZPLKUMD6P	Apple	Macbook Pro A2141	Used	MacBook Pro (16-inch, 2019) 
18	125	C02RD30FG8WP	Apple	Macbook Pro A1398	Used	Macbook Pro(Retina, 15 Inch, Mid 2015)
10	62	C02SP1NZG8WL	Apple	Macbook Pro A1398	Faulty	MacBook Pro (Retina, 15-inch, Mid 2015)
7	16	2CE24919BS	HP	Probook 4540s	Used	\N
19	137	5CD236CCDN	HP	15s-f15009ni	New	\N
20	140	SDM97HL69M6	Apple	Macboo Pro 14 M2	New	\N
21	141	SR7Y2J7VFXW	Apple	Macboo Pro 14 M2	New	\N
22	146	6SZVHW3	Dell	XPS 13 Plus (9320)	New	\N
\.


--
-- Data for Name: location_code; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.location_code (code, location_type) FROM stdin;
CAB	cabinet
STAFF	staff
LOC	other_location
SHE	shelf
\.


--
-- Data for Name: misc; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.misc (misc_id, asset_id, description, serialnumber, make, model, asset_condition) FROM stdin;
3	7	Bluetooth Mouse	2136LZX94D88	Logitech	M171	Used
4	22	Cash Drawer	CRHBV0498	Posiflex	CR-4100-B	Used
5	23	B/W Laser Printer	E68021J2J301579	Brother	HL-45	Used
6	24	B/W Laser Printer	E75673E6N220277	Brother	MFC-L5900DW	Used
7	37	65" TV	031816-101942	JVC	LT-65N675	Used
8	38	Printer	NUZ06585	Canon	MF4770n (F164102)	Used
9	39	Bamboo Craft Tablet	0ABP026049	Wacom	CTH-461	Used
10	58	Headphones	FL6SPELLH8VG	Beats	Sole 3 A1796 	Broken
13	73	Apple Pencil	FQ9SJ8AWGWTJ	Apple	Pencil	Used
14	89	Ear Piece Headset	AG3MHX	Plantronics	Unkown	Used
15	92	Bluetooth earpiece 	AGEP6B	Legend	Unkown	Used
19	110	Airpods	H0YFQ49WP3WC	Apple	AirPods Max A2096	Used
20	128	Jabra Evolve 65 SE	00276629740	Jabra	HSC018Wa	New
21	130	Jabra Evolve 65 Headset	00276425730	Jabra	HSC018Wa	New
22	133	Jabra Evolve 65 Headset	00276425758	Jabra	HSC018Wa	New
23	136	600W Power Station	P2GBZ7XE8121451	EcoFlow	EF4 PRO	New
24	142	Apple Magic Mouse White	CC223540GD017YMAG	Apple	Magic Mouse	New
27	145	Apple Magic Keyboard	F0T2433RNK812J0AR	Apple	A1657	New
\.


--
-- Data for Name: modem; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.modem (modem_id, asset_id, serialnumber, make, model, asset_condition, imei, description) FROM stdin;
1	59	TBC	Vodafone	R218h	Used	xxxxxxxxxxxxxxx	Mobile Wi-Fi Dongle
\.


--
-- Data for Name: monitor; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.monitor (monitor_id, asset_id, serialnumber, make, model, asset_condition, description) FROM stdin;
1	9	906INSE84478	LG	W2343TV	Used	\N
2	19	Q379QJQ000216	Proline	MONAP236W	Used	\N
3	31	1588-3003	HP	Z32	Used	\N
4	33	C02P10QWF2GC	Apple	A1407	Used	\N
5	34	939WUGA22R0401	Mecer	PR235	Used	\N
6	35	906INWA84489	LG	W2343TV	Used	\N
7	36	0JMAHNTT203239L	Samsung	S32BM801UU	Used	\N
11	124	C02QV0VGF2GC	Apple	A1407	Used	27 Inch Apple Thunderbolt Display Model
8	64	C02GF41QDJGR	Apple	A1407	Used	\N
9	65	C02QQ4M6F2GC	Apple	A1407	Used	\N
12	147	JDY6DH3	Dell	P3222QE	New	\N
13	148	7FY6DH3	Dell	P3222QE	New	\N
14	149	8FY6DH3	Dell	P3222QE	New	\N
15	150	8DY6DH3	Dell	P3222QE	New	\N
\.


--
-- Data for Name: other_location; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.other_location (location_type_id, location_id, location_name, description, located) FROM stdin;
1	4	AS Office Unit 4 	Office Unit General	The Royal
2	6	AS Office Unit 3		AS Office, Unit 3
3	17	DigiCape	Apple Sales and Repair Store	Cape Town
\.


--
-- Data for Name: pc; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.pc (pc_id, asset_id, serialnumber, make, model, asset_condition, description) FROM stdin;
1	20	W8037029H9L	Apple	iMac A1312	Used	\N
2	21	C02LN22XF2GC	Apple	iMac A1407	Used	\N
3	32	DGKKL047DNMP	Apple	iMac A1419	Used	\N
\.


--
-- Data for Name: shelf; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.shelf (location_type_id, location_id, location_name, located, description) FROM stdin;
\.


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.staff (location_type_id, location_id, location_name, firstname, lastname, email, hash, access) FROM stdin;
1	2	Kriegler van der Merwe	Kriegler	Van der merwe	kriegler@albatrosgolf.co.za	$2b$10$6xYJeRBU.EyAJrgbuJJFT.BPzZpIW9wwuVQMUwuueTupNYkgkYBlq	admin
3	9	Eben Johansen	Eben	Johansen	eben@albatrosgolf.co.za	$2b$10$tB67zQ0RYyC2asFbS5E2NecRxI1bOVKGbWu6Pk6SQURd1eKwq9T7y	user
4	10	Aslam Mallick	Aslam	Mallick	aslam@albatrosgolf.co.za	$2b$10$fno4fyKTKvBGbFM6gS8bUOBFLQe1MPIOhOCF.Zd6TFzhVdB6UKFsW	user
6	12	Luchal Mc Dougal	Luchal	Mc Dougal	luchal@albatrosgolf.co.za	$2b$10$h85TaBTV/Zrv8tTmyRFfUu8fKdCom8yilYSnTaoGzGPq7KmhS3ssa	user
7	13	Aqeela Kariem	Aqeela	Kariem	aqeela@albatrosgolf.co.za	$2b$10$yCi1W2GG8prG9foybvcy5OFkYrXAKCgjCuyss3KdbEQl8TvUCVGRi	user
8	14	Brenda Little	Brenda	Little	brenda@albatrosgolf.co.za	$2b$10$7bcHOX6p/M8QBUIOOIW9DOMSoz4EvJZ9LQItBYt3RT/Ytx89FWOWe	user
2	8	Nic Lanham	Nic	Lanham	nic@albatrosgolf.co.za	$2b$10$lbw5nzWbs7r6wpqjvKe.ou6BU0SPduXFJVhs08h8r3AZAjeY7Hphm	admin
5	11	Grant Little	Grant	Little	grant@albatrosgolf.co.za	$2b$10$Pqo8KKXWpjGRvx2C6BjaAeEO9qqLsZ7jHUOcHoYuMukYXKg4cUjQy	user
9	18	Yandisa Tupa	Yandisa	Tupa	yandisa@albatrosgolf.co.za	$2b$10$bPOqh5uNXxIRARAIcDFPDuVKcJzZmH3QA.dhAwmPpcTLZtdf1T5DK	user
10	19	Justin Behrendt	Justin	Behrendt	justin@albatrosgolf.co.za	$2b$10$upPdTQ474YONCJcN3QM1t.LxzTPxKNL41e28tyySncUX/bpx6hEVy	user
\.


--
-- Data for Name: tablet; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.tablet (tablet_id, asset_id, serialnumber, make, model, asset_condition, imei, description) FROM stdin;
1	41	DLXQVGYLGMW3	Apple	iPad A1652	Used	\N	\N
2	63	DLXCV1DGGJ262	Apple	iPad ?	Used	\N	\N
3	86	F4KK43L4F19J	Apple	iPad Mini MD540HC/a	Used	\N	Wi/Fi Cellular 16GB Tablet
4	101	DLXV231VJ294	Apple	Ipad Pro MQED2HC	Used	\N	Ipad Pro 12.9 inch 2nd Gen
\.


--
-- Data for Name: transfer_id; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.transfer_id (asset_id, asset_type) FROM stdin;
1	cellphone
2	cellphone
3	laptop
4	accessory
7	misc
8	cellphone
9	monitor
11	laptop
12	laptop
13	laptop
14	laptop
15	laptop
16	laptop
17	laptop
18	cellphone
19	monitor
20	pc
21	pc
22	misc
23	misc
24	misc
25	accessory
26	accessory
27	cellphone
28	cellphone
29	cellphone
30	cellphone
31	monitor
32	pc
33	monitor
34	monitor
35	monitor
36	monitor
37	misc
38	misc
39	misc
41	tablet
42	accessory
43	cellphone
45	cellphone
46	laptop
47	accessory
48	accessory
49	accessory
53	cellphone
54	accessory
55	accessory
56	accessory
57	accessory
58	misc
59	modem
60	cellphone
62	laptop
63	tablet
64	monitor
65	monitor
66	accessory
67	accessory
68	accessory
69	accessory
70	accessory
73	misc
75	laptop
80	cellphone
81	laptop
82	cellphone
83	laptop
86	tablet
87	cellphone
88	accessory
89	misc
90	accessory
91	accessory
92	misc
97	laptop
98	accessory
99	accessory
100	accessory
101	tablet
102	accessory
103	accessory
110	misc
111	accessory
112	accessory
113	accessory
114	accessory
115	accessory
116	accessory
117	cellphone
118	accessory
119	accessory
120	accessory
121	accessory
122	accessory
124	monitor
125	laptop
126	accessory
127	accessory
128	misc
129	accessory
130	misc
131	accessory
133	misc
134	accessory
136	misc
137	laptop
138	accessory
139	accessory
140	laptop
141	laptop
142	misc
145	misc
146	laptop
147	monitor
148	monitor
149	monitor
150	monitor
151	accessory
152	accessory
\.


--
-- Data for Name: transfer_location; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.transfer_location (location_id, location_type) FROM stdin;
2	staff
4	other_location
5	cabinet
6	other_location
7	cabinet
8	staff
9	staff
10	staff
11	staff
12	staff
13	staff
14	staff
17	other_location
18	staff
19	staff
\.


--
-- Data for Name: transfer_notes; Type: TABLE DATA; Schema: public; Owner: albadmin
--

COPY public.transfer_notes (note_id, transfer_id, note, capture_time) FROM stdin;
\.


--
-- Name: accessory_accessory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.accessory_accessory_id_seq', 56, true);


--
-- Name: asset_notes_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.asset_notes_note_id_seq', 5, true);


--
-- Name: cabinet_cabinet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.cabinet_cabinet_id_seq', 1, false);


--
-- Name: cellphone_cellphone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.cellphone_cellphone_id_seq', 19, true);


--
-- Name: laptop_laptop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.laptop_laptop_id_seq', 22, true);


--
-- Name: misc_accessory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.misc_accessory_id_seq', 27, true);


--
-- Name: modem_modem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.modem_modem_id_seq', 1, true);


--
-- Name: monitor_monitor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.monitor_monitor_id_seq', 15, true);


--
-- Name: other_location_other_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.other_location_other_location_id_seq', 1, false);


--
-- Name: pc_pc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.pc_pc_id_seq', 3, true);


--
-- Name: shelf_shelf_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.shelf_shelf_id_seq', 1, false);


--
-- Name: staff_staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.staff_staff_id_seq', 1, false);


--
-- Name: tablet_tablet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.tablet_tablet_id_seq', 4, true);


--
-- Name: transfer_asset_asset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.transfer_asset_asset_id_seq', 152, true);


--
-- Name: transfer_location_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.transfer_location_location_id_seq', 19, true);


--
-- Name: transfer_notes_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.transfer_notes_note_id_seq', 1, false);


--
-- Name: transfer_transfer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: albadmin
--

SELECT pg_catalog.setval('public.transfer_transfer_id_seq', 151, true);


--
-- Name: accessory accessory_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.accessory
    ADD CONSTRAINT accessory_pkey PRIMARY KEY (accessory_id);


--
-- Name: asset_note asset_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.asset_note
    ADD CONSTRAINT asset_notes_pkey PRIMARY KEY (note_id);


--
-- Name: cabinet cabinet_location_name_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cabinet
    ADD CONSTRAINT cabinet_location_name_key UNIQUE (location_name);


--
-- Name: cabinet cabinet_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cabinet
    ADD CONSTRAINT cabinet_pkey PRIMARY KEY (location_type_id);


--
-- Name: cellphone cellphone_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cellphone
    ADD CONSTRAINT cellphone_pkey PRIMARY KEY (cellphone_id);


--
-- Name: cellphone cellphone_serialnumber_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cellphone
    ADD CONSTRAINT cellphone_serialnumber_key UNIQUE (serialnumber);


--
-- Name: laptop laptop_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.laptop
    ADD CONSTRAINT laptop_pkey PRIMARY KEY (laptop_id);


--
-- Name: laptop laptop_serialnumber_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.laptop
    ADD CONSTRAINT laptop_serialnumber_key UNIQUE (serialnumber);


--
-- Name: location_code loc_code_location_type_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.location_code
    ADD CONSTRAINT loc_code_location_type_key UNIQUE (location_type);


--
-- Name: location_code loc_code_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.location_code
    ADD CONSTRAINT loc_code_pkey PRIMARY KEY (code);


--
-- Name: misc misc_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.misc
    ADD CONSTRAINT misc_pkey PRIMARY KEY (misc_id);


--
-- Name: misc misc_serial_number_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.misc
    ADD CONSTRAINT misc_serial_number_key UNIQUE (serialnumber);


--
-- Name: modem modem_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.modem
    ADD CONSTRAINT modem_pkey PRIMARY KEY (modem_id);


--
-- Name: modem modem_serialnumber_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.modem
    ADD CONSTRAINT modem_serialnumber_key UNIQUE (serialnumber);


--
-- Name: monitor monitor_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.monitor
    ADD CONSTRAINT monitor_pkey PRIMARY KEY (monitor_id);


--
-- Name: monitor monitor_serialnumber_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.monitor
    ADD CONSTRAINT monitor_serialnumber_key UNIQUE (serialnumber);


--
-- Name: other_location other_location_loc_name_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.other_location
    ADD CONSTRAINT other_location_loc_name_key UNIQUE (location_name);


--
-- Name: other_location other_location_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.other_location
    ADD CONSTRAINT other_location_pkey PRIMARY KEY (location_type_id);


--
-- Name: pc pc_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.pc
    ADD CONSTRAINT pc_pkey PRIMARY KEY (pc_id);


--
-- Name: pc pc_serialnumber_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.pc
    ADD CONSTRAINT pc_serialnumber_key UNIQUE (serialnumber);


--
-- Name: shelf shelf_location_name_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.shelf
    ADD CONSTRAINT shelf_location_name_key UNIQUE (location_name);


--
-- Name: shelf shelf_location_name_ukey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.shelf
    ADD CONSTRAINT shelf_location_name_ukey UNIQUE (location_name);


--
-- Name: shelf shelf_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.shelf
    ADD CONSTRAINT shelf_pkey PRIMARY KEY (location_type_id);


--
-- Name: staff staff_email_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_email_key UNIQUE (email);


--
-- Name: staff staff_location_name_key; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_location_name_key UNIQUE (location_name);


--
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (location_type_id);


--
-- Name: tablet tablet_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.tablet
    ADD CONSTRAINT tablet_pkey PRIMARY KEY (tablet_id);


--
-- Name: transfer_id transfer_asset_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_id
    ADD CONSTRAINT transfer_asset_pkey PRIMARY KEY (asset_id);


--
-- Name: transfer_location transfer_location_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_location
    ADD CONSTRAINT transfer_location_pkey PRIMARY KEY (location_id);


--
-- Name: transfer_notes transfer_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_notes
    ADD CONSTRAINT transfer_notes_pkey PRIMARY KEY (note_id);


--
-- Name: asset_transfer transfer_pkey; Type: CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.asset_transfer
    ADD CONSTRAINT transfer_pkey PRIMARY KEY (transfer_id);


--
-- Name: accessory accessory_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.accessory
    ADD CONSTRAINT accessory_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: asset_note asset_notes_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.asset_note
    ADD CONSTRAINT asset_notes_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id);


--
-- Name: cabinet cabinet_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cabinet
    ADD CONSTRAINT cabinet_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.transfer_location(location_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cellphone cellphone_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.cellphone
    ADD CONSTRAINT cellphone_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: laptop laptop_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.laptop
    ADD CONSTRAINT laptop_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: misc misc_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.misc
    ADD CONSTRAINT misc_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: modem modem_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.modem
    ADD CONSTRAINT modem_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: monitor monitor_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.monitor
    ADD CONSTRAINT monitor_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: other_location other_location_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.other_location
    ADD CONSTRAINT other_location_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.transfer_location(location_id);


--
-- Name: pc pc_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.pc
    ADD CONSTRAINT pc_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shelf shelf_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.shelf
    ADD CONSTRAINT shelf_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.transfer_location(location_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: staff staff_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.transfer_location(location_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tablet tablet_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.tablet
    ADD CONSTRAINT tablet_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: asset_transfer transfer_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.asset_transfer
    ADD CONSTRAINT transfer_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.transfer_id(asset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: asset_transfer transfer_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.asset_transfer
    ADD CONSTRAINT transfer_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.transfer_location(location_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transfer_location transfer_location_location_type_fk; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_location
    ADD CONSTRAINT transfer_location_location_type_fk FOREIGN KEY (location_type) REFERENCES public.location_code(location_type);


--
-- Name: transfer_notes transfer_notes_transfer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: albadmin
--

ALTER TABLE ONLY public.transfer_notes
    ADD CONSTRAINT transfer_notes_transfer_id_fkey FOREIGN KEY (transfer_id) REFERENCES public.asset_transfer(transfer_id);


--
-- Name: TABLE accessory; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.accessory TO as_asset_tracker;


--
-- Name: TABLE asset_transfer; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.asset_transfer TO as_asset_tracker;


--
-- Name: TABLE all_asset_locations; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.all_asset_locations TO as_asset_tracker;


--
-- Name: TABLE cellphone; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.cellphone TO as_asset_tracker;


--
-- Name: TABLE laptop; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.laptop TO as_asset_tracker;


--
-- Name: TABLE misc; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.misc TO as_asset_tracker;


--
-- Name: TABLE modem; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.modem TO as_asset_tracker;


--
-- Name: TABLE monitor; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.monitor TO as_asset_tracker;


--
-- Name: TABLE pc; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.pc TO as_asset_tracker;


--
-- Name: TABLE tablet; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.tablet TO as_asset_tracker;


--
-- Name: TABLE cabinet; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.cabinet TO as_asset_tracker;


--
-- Name: TABLE shelf; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.shelf TO as_asset_tracker;


--
-- Name: TABLE staff; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.staff TO as_asset_tracker;


--
-- Name: TABLE transfer_id; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.transfer_id TO as_asset_tracker;


--
-- Name: TABLE transfer_location; Type: ACL; Schema: public; Owner: albadmin
--

GRANT ALL ON TABLE public.transfer_location TO as_asset_tracker;


--
-- PostgreSQL database dump complete
--

