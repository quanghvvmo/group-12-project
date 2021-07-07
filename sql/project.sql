--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-07-07 13:22:20

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

DROP DATABASE postgres;
--
-- TOC entry 3088 (class 1262 OID 13442)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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
-- TOC entry 3089 (class 0 OID 0)
-- Dependencies: 3088
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3090 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 655 (class 1247 OID 54015)
-- Name: enum_projects_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_projects_status AS ENUM (
    'InProgress',
    'Maintain',
    'Closed'
);


ALTER TYPE public.enum_projects_status OWNER TO postgres;

--
-- TOC entry 635 (class 1247 OID 43852)
-- Name: enum_teches_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_teches_status AS ENUM (
    'Active',
    'notActive'
);


ALTER TYPE public.enum_teches_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 53973)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id uuid NOT NULL,
    "workID" character varying(300),
    name character varying(300),
    username character varying(300),
    password character varying(300),
    "isActive" integer
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 53981)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id uuid NOT NULL,
    name character varying(300),
    description character varying(2000),
    "isDeleted" integer DEFAULT 0,
    "createBy" character varying(36),
    "updateBy" character varying(36),
    "createAt" timestamp with time zone,
    "updateAt" timestamp with time zone
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 53990)
-- Name: employee_teches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_teches (
    id uuid NOT NULL,
    "employeeID" character varying(300),
    "techID" character varying(300)
);


ALTER TABLE public.employee_teches OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 53964)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id uuid NOT NULL,
    name character varying(300),
    "workID" character varying(300),
    "DoB" character varying(300),
    address character varying(300),
    id_number integer,
    phone integer,
    exp_years integer,
    english character varying(300),
    degree character varying(300),
    "isDeleted" integer DEFAULT 0,
    "createBy" character varying(36),
    "updateBy" character varying(36),
    "createAt" timestamp with time zone,
    "updateAt" timestamp with time zone
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 54006)
-- Name: project_employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_employees (
    id uuid NOT NULL,
    "employeeID" character varying(300),
    "projectID" character varying(300)
);


ALTER TABLE public.project_employees OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 53998)
-- Name: project_teches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_teches (
    id uuid NOT NULL,
    "projectID" character varying(300),
    "techID" character varying(300)
);


ALTER TABLE public.project_teches OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 54021)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id uuid NOT NULL,
    name character varying(300),
    description character varying(2000),
    "customerID" character varying(300),
    "startDate" timestamp with time zone,
    status character varying(255),
    type_id character varying(300),
    "isDeleted" integer DEFAULT 0,
    "createBy" character varying(36),
    "updateBy" character varying(36),
    "createAt" timestamp with time zone,
    "updateAt" timestamp with time zone
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 54030)
-- Name: teches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teches (
    id uuid NOT NULL,
    name character varying(300),
    is_active integer DEFAULT 1,
    "isDeleted" integer DEFAULT 0,
    "createBy" character varying(36),
    "updateBy" character varying(36),
    "createAt" timestamp with time zone,
    "updateAt" timestamp with time zone
);


ALTER TABLE public.teches OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 54037)
-- Name: types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types (
    id uuid NOT NULL,
    name character varying(300),
    "isDeleted" integer DEFAULT 0,
    "createBy" character varying(36),
    "updateBy" character varying(36),
    "createAt" character varying(300),
    "updateAt" character varying(255)
);


ALTER TABLE public.types OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 54046)
-- Name: unit_employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unit_employees (
    id uuid NOT NULL,
    "employeeID" character varying(300),
    "unitID" character varying(300)
);


ALTER TABLE public.unit_employees OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 54054)
-- Name: unit_in_projs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unit_in_projs (
    id uuid NOT NULL,
    "unitID" character varying(300),
    "projectID" character varying(300)
);


ALTER TABLE public.unit_in_projs OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 54062)
-- Name: units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.units (
    id uuid NOT NULL,
    name character varying(300),
    description character varying(2000),
    "adminID" character varying(300),
    "isDeleted" integer DEFAULT 0,
    "createBy" character varying(36),
    "updateBy" character varying(36),
    "createAt" timestamp with time zone,
    "updateAt" timestamp with time zone
);


ALTER TABLE public.units OWNER TO postgres;

--
-- TOC entry 3072 (class 0 OID 53973)
-- Dependencies: 202
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admins (id, "workID", name, username, password, "isActive") VALUES ('9bb93a67-bb79-4b92-873d-236f22b95368', '3', 'admin3', 'superuser2', '$2b$12$DSWuoOcxGtr8/EX6jpqEsOpCMvaOgjsEqt71O/B1PUcU4dxjdwTd.', NULL);
INSERT INTO public.admins (id, "workID", name, username, password, "isActive") VALUES ('3d05b537-644a-4cb1-9746-d9089be30291', '1', 'admin', 'superuser', '$2b$12$umjtwuVvl4u.H8nbRAJqs.rYCSIrw/cwO7ou5QStkX85vjVq7DeJO', NULL);


--
-- TOC entry 3073 (class 0 OID 53981)
-- Dependencies: 203
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.customers (id, name, description, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('9022e945-dd37-4005-b664-4694f3c7f6ce', 'John Sena', 'Love Punch', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:06:22+07', NULL);
INSERT INTO public.customers (id, name, description, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('3886af6d-e093-4ea0-a58e-95fed25f042e', 'John Jena', 'Love Punch', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:06:31+07', NULL);
INSERT INTO public.customers (id, name, description, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('0e999d7b-bb00-4183-9821-fc27fd2ad7b8', 'John Pena', 'Love Punch', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:06:36+07', NULL);


--
-- TOC entry 3074 (class 0 OID 53990)
-- Dependencies: 204
-- Data for Name: employee_teches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('8a5ba97e-06b3-4009-9eb7-a1fa65762364', '60dba420-2786-4949-8c22-c0c8d49109a0', 'e83faeee-b76b-4b03-bb74-7a36fa9b65d1');
INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('c4421e0c-fb93-4eee-9489-3afc1234ecbd', '60dba420-2786-4949-8c22-c0c8d49109a0', 'f44990fd-fb85-4843-9152-53e958ccfe44');
INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('8d3a91df-9bc9-461a-a79a-64eb84f8e5ec', 'b88a0f03-9018-4bc9-98fa-dd0cf4fcc064', 'e83faeee-b76b-4b03-bb74-7a36fa9b65d1');
INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('0e46ee02-9c30-4dfc-a4d4-b30d0eed81ce', 'b88a0f03-9018-4bc9-98fa-dd0cf4fcc064', 'f44990fd-fb85-4843-9152-53e958ccfe44');
INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('49ee3bb7-daf8-4dc0-9246-ebb6d44224c7', 'b88a0f03-9018-4bc9-98fa-dd0cf4fcc064', '025987c5-6af0-419d-b9aa-4aef6a1477de');
INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('a9ebf46d-70ab-42d6-b27a-e84ff65b6af2', 'cad1b7d4-de28-4b2a-9e95-4db1da6ec67f', 'e83faeee-b76b-4b03-bb74-7a36fa9b65d1');
INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('a486c5fa-982a-43b2-8cf7-4e6ba3b21df8', 'cad1b7d4-de28-4b2a-9e95-4db1da6ec67f', 'f44990fd-fb85-4843-9152-53e958ccfe44');
INSERT INTO public.employee_teches (id, "employeeID", "techID") VALUES ('de5564d4-fa83-4959-bc7b-d9376b5561be', 'cad1b7d4-de28-4b2a-9e95-4db1da6ec67f', '025987c5-6af0-419d-b9aa-4aef6a1477de');


--
-- TOC entry 3071 (class 0 OID 53964)
-- Dependencies: 201
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employees (id, name, "workID", "DoB", address, id_number, phone, exp_years, english, degree, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('60dba420-2786-4949-8c22-c0c8d49109a0', 'Employee 59', '20', '2/20/1993', '19 Duy Tan', 7323, 41978400, 3, 'English', 'bachelor', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:09:13+07', NULL);
INSERT INTO public.employees (id, name, "workID", "DoB", address, id_number, phone, exp_years, english, degree, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('b88a0f03-9018-4bc9-98fa-dd0cf4fcc064', 'Employee 1', '15', '2/20/1993', '19 Duy Tan', 88323, 91978400, 3, 'English', 'bachelor', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:09:41+07', NULL);
INSERT INTO public.employees (id, name, "workID", "DoB", address, id_number, phone, exp_years, english, degree, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('cad1b7d4-de28-4b2a-9e95-4db1da6ec67f', 'Employee 1', '18', '2/20/1993', '19 Duy Tan', 88553, 91999400, 3, 'English', 'bachelor', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:09:54+07', NULL);


--
-- TOC entry 3076 (class 0 OID 54006)
-- Dependencies: 206
-- Data for Name: project_employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.project_employees (id, "employeeID", "projectID") VALUES ('1b36d137-1353-4346-8b5b-85c0c8a6bcf7', '60dba420-2786-4949-8c22-c0c8d49109a0', 'bc3ab7a5-3f43-4c44-9b52-01ce8120bdce');
INSERT INTO public.project_employees (id, "employeeID", "projectID") VALUES ('27ad8420-b22f-46ae-802f-8f73ffe76d70', 'b88a0f03-9018-4bc9-98fa-dd0cf4fcc064', 'bc3ab7a5-3f43-4c44-9b52-01ce8120bdce');


--
-- TOC entry 3075 (class 0 OID 53998)
-- Dependencies: 205
-- Data for Name: project_teches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.project_teches (id, "projectID", "techID") VALUES ('8252599e-3fb1-4a33-9ac8-d06022f9152f', 'bc3ab7a5-3f43-4c44-9b52-01ce8120bdce', 'e83faeee-b76b-4b03-bb74-7a36fa9b65d1');
INSERT INTO public.project_teches (id, "projectID", "techID") VALUES ('59f70fa3-ad25-4047-a0c8-c751738b72b0', 'bc3ab7a5-3f43-4c44-9b52-01ce8120bdce', 'f44990fd-fb85-4843-9152-53e958ccfe44');


--
-- TOC entry 3077 (class 0 OID 54021)
-- Dependencies: 207
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projects (id, name, description, "customerID", "startDate", status, type_id, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('bc3ab7a5-3f43-4c44-9b52-01ce8120bdce', 'project 3', 'deathline 1 year', '9022e945-dd37-4005-b664-4694f3c7f6ce', '2021-07-05 09:12:13+07', 'InProgress', 'ff244f5d-b2ce-4299-bf15-c84ad207b7f5', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:12:13+07', NULL);


--
-- TOC entry 3078 (class 0 OID 54030)
-- Dependencies: 208
-- Data for Name: teches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.teches (id, name, is_active, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('025987c5-6af0-419d-b9aa-4aef6a1477de', 'Django', 1, 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:07:08+07', NULL);
INSERT INTO public.teches (id, name, is_active, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('b9271e85-688c-4f7c-8441-7b29debf5a90', 'Nodejs', 1, 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:07:19+07', NULL);
INSERT INTO public.teches (id, name, is_active, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('f44990fd-fb85-4843-9152-53e958ccfe44', 'C', 1, 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:07:24+07', NULL);
INSERT INTO public.teches (id, name, is_active, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('755ce809-31ec-4157-9603-a6baa6c12d35', 'C++', 1, 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:07:29+07', NULL);
INSERT INTO public.teches (id, name, is_active, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('e83faeee-b76b-4b03-bb74-7a36fa9b65d1', 'C#', 1, 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:07:35+07', NULL);


--
-- TOC entry 3079 (class 0 OID 54037)
-- Dependencies: 209
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.types (id, name, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('2d3b22d0-1ee0-4345-93ad-26474a5333e8', 'Product', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, 'Mon Jul 05 2021 09:07:51 GMT+0700 (Indochina Time)', NULL);
INSERT INTO public.types (id, name, "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('ff244f5d-b2ce-4299-bf15-c84ad207b7f5', 'Out Source', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, 'Mon Jul 05 2021 09:08:03 GMT+0700 (Indochina Time)', NULL);


--
-- TOC entry 3080 (class 0 OID 54046)
-- Dependencies: 210
-- Data for Name: unit_employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.unit_employees (id, "employeeID", "unitID") VALUES ('3f829bc7-e19c-448a-98db-1a00db9eea8f', '60dba420-2786-4949-8c22-c0c8d49109a0', '6b3e6dc9-fa47-4dda-97e0-c0725aaf3e78');
INSERT INTO public.unit_employees (id, "employeeID", "unitID") VALUES ('95c30edf-f25c-4f35-961c-69c9c106b96c', 'b88a0f03-9018-4bc9-98fa-dd0cf4fcc064', '5db34446-39da-4dce-913e-9576dbd036c7');
INSERT INTO public.unit_employees (id, "employeeID", "unitID") VALUES ('5b44cfc3-0225-43e3-ab23-04b4e419ac0d', 'cad1b7d4-de28-4b2a-9e95-4db1da6ec67f', '5db34446-39da-4dce-913e-9576dbd036c7');


--
-- TOC entry 3081 (class 0 OID 54054)
-- Dependencies: 211
-- Data for Name: unit_in_projs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.unit_in_projs (id, "unitID", "projectID") VALUES ('356d5be4-c92f-48e7-ab36-35565cecea1b', '6b3e6dc9-fa47-4dda-97e0-c0725aaf3e78', 'bc3ab7a5-3f43-4c44-9b52-01ce8120bdce');


--
-- TOC entry 3082 (class 0 OID 54062)
-- Dependencies: 212
-- Data for Name: units; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.units (id, name, description, "adminID", "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('5db34446-39da-4dce-913e-9576dbd036c7', 'Center 3', 'NodeJS Main', '3', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:08:23+07', NULL);
INSERT INTO public.units (id, name, description, "adminID", "isDeleted", "createBy", "updateBy", "createAt", "updateAt") VALUES ('6b3e6dc9-fa47-4dda-97e0-c0725aaf3e78', 'Center 1', 'Django Main', '1', 0, '9bb93a67-bb79-4b92-873d-236f22b95368', NULL, '2021-07-05 09:08:49+07', NULL);


--
-- TOC entry 2920 (class 2606 OID 53980)
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- TOC entry 2922 (class 2606 OID 53989)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 2924 (class 2606 OID 53997)
-- Name: employee_teches employee_teches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_teches
    ADD CONSTRAINT employee_teches_pkey PRIMARY KEY (id);


--
-- TOC entry 2918 (class 2606 OID 53972)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- TOC entry 2928 (class 2606 OID 54013)
-- Name: project_employees project_employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_employees
    ADD CONSTRAINT project_employees_pkey PRIMARY KEY (id);


--
-- TOC entry 2926 (class 2606 OID 54005)
-- Name: project_teches project_teches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_teches
    ADD CONSTRAINT project_teches_pkey PRIMARY KEY (id);


--
-- TOC entry 2930 (class 2606 OID 54029)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 2932 (class 2606 OID 54036)
-- Name: teches teches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teches
    ADD CONSTRAINT teches_pkey PRIMARY KEY (id);


--
-- TOC entry 2934 (class 2606 OID 54045)
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (id);


--
-- TOC entry 2936 (class 2606 OID 54053)
-- Name: unit_employees unit_employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_employees
    ADD CONSTRAINT unit_employees_pkey PRIMARY KEY (id);


--
-- TOC entry 2938 (class 2606 OID 54061)
-- Name: unit_in_projs unit_in_projs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unit_in_projs
    ADD CONSTRAINT unit_in_projs_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 54070)
-- Name: units units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_pkey PRIMARY KEY (id);


-- Completed on 2021-07-07 13:22:20

--
-- PostgreSQL database dump complete
--

