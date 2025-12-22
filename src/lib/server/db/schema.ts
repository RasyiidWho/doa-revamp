import { mysqlTable, primaryKey, int, varchar, date, text, mysqlEnum, tinyint, datetime } from "drizzle-orm/mysql-core"

export const form = mysqlTable("form", {
	no: int().autoincrement().notNull(),
	type: varchar({ length: 10 }).notNull(),
	nmpath: varchar({ length: 50 }),
	number: varchar({ length: 30 }),
	pdf: varchar({ length: 40 }),
	revision: varchar({ length: 2 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }),
	title: varchar({ length: 500 }),
	category: varchar({ length: 25 }),
	controlSheet: varchar("control_sheet", { length: 25 }),
	remark: varchar({ length: 50 }),
},
(table) => [
	primaryKey({ columns: [table.no], name: "form_no"}),
]);

export const history = mysqlTable("history", {
	no: int().autoincrement().notNull(),
	judul: varchar("Judul", { length: 100 }),
	username: varchar({ length: 30 }),
	nama: varchar({ length: 40 }),
	nmdoc: varchar({ length: 50 }),
	tanggal: varchar("Tanggal", { length: 20 }),
	remark: varchar({ length: 50 }),
},
(table) => [
	primaryKey({ columns: [table.no], name: "history_no"}),
]);

export const standard = mysqlTable("standard", {
	no: int().autoincrement().notNull(),
	type: varchar({ length: 10 }).notNull(),
	nmpath: varchar({ length: 100 }),
	number: varchar({ length: 100 }),
	pdf: varchar({ length: 100 }),
	revision: varchar({ length: 10 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date2: date({ mode: 'string' }).notNull(),
	title: varchar({ length: 500 }),
	category: varchar({ length: 25 }),
	controlSheet: varchar("control_sheet", { length: 25 }),
	remark: varchar({ length: 50 }),
	panel: text().notNull(),
	nik: text().notNull(),
	nama: text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.no], name: "standard_no"}),
]);

export const standard091224 = mysqlTable("standard091224", {
	no: int().autoincrement().notNull(),
	type: varchar({ length: 10 }).notNull(),
	nmpath: varchar({ length: 100 }),
	number: varchar({ length: 100 }),
	pdf: varchar({ length: 100 }),
	revision: varchar({ length: 10 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date2: date({ mode: 'string' }).notNull(),
	title: varchar({ length: 500 }),
	category: varchar({ length: 25 }),
	controlSheet: varchar("control_sheet", { length: 25 }),
	remark: varchar({ length: 50 }),
	panel: text().notNull(),
	nik: text().notNull(),
	nama: text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.no], name: "standard091224_no"}),
]);

export const standard150425 = mysqlTable("standard150425", {
	no: int().autoincrement().notNull(),
	type: varchar({ length: 10 }).notNull(),
	nmpath: varchar({ length: 100 }),
	number: varchar({ length: 100 }),
	pdf: varchar({ length: 100 }),
	revision: varchar({ length: 10 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date2: date({ mode: 'string' }).notNull(),
	title: varchar({ length: 500 }),
	category: varchar({ length: 25 }),
	controlSheet: varchar("control_sheet", { length: 25 }),
	remark: varchar({ length: 50 }),
	panel: text().notNull(),
	nik: text().notNull(),
	nama: text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.no], name: "standard150425_no"}),
]);

export const standard210425 = mysqlTable("standard210425", {
	no: int().autoincrement().notNull(),
	type: varchar({ length: 10 }).notNull(),
	nmpath: varchar({ length: 100 }),
	number: varchar({ length: 100 }),
	pdf: varchar({ length: 100 }),
	revision: varchar({ length: 10 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date2: date({ mode: 'string' }).notNull(),
	title: varchar({ length: 500 }),
	category: varchar({ length: 25 }),
	controlSheet: varchar("control_sheet", { length: 25 }),
	remark: varchar({ length: 50 }),
	panel: text().notNull(),
	nik: text().notNull(),
	nama: text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.no], name: "standard210425_no"}),
]);

export const standard061125 = mysqlTable("standard_061125", {
	no: int().autoincrement().notNull(),
	type: varchar({ length: 10 }).notNull(),
	nmpath: varchar({ length: 100 }),
	number: varchar({ length: 100 }),
	pdf: varchar({ length: 100 }),
	revision: varchar({ length: 10 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date2: date({ mode: 'string' }).notNull(),
	title: varchar({ length: 500 }),
	category: varchar({ length: 25 }),
	controlSheet: varchar("control_sheet", { length: 25 }),
	remark: varchar({ length: 50 }),
	panel: text().notNull(),
	nik: text().notNull(),
	nama: text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.no], name: "standard_061125_no"}),
]);

export const standardbu = mysqlTable("standardbu", {
	no: int().autoincrement().notNull(),
	type: varchar({ length: 10 }).notNull(),
	nmpath: varchar({ length: 100 }),
	number: varchar({ length: 100 }),
	pdf: varchar({ length: 100 }),
	revision: varchar({ length: 10 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date2: date({ mode: 'string' }).notNull(),
	title: varchar({ length: 500 }),
	category: varchar({ length: 25 }),
	controlSheet: varchar("control_sheet", { length: 25 }),
	remark: varchar({ length: 50 }),
	panel: text().notNull(),
	nik: text().notNull(),
	nama: text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.no], name: "standardbu_no"}),
]);

export const useraccounts = mysqlTable("useraccounts", {
	username: varchar("username", { length: 50 }).notNull(),
	kuid: varchar("kuid", { length: 32 }).notNull(),
	password: varchar("password", { length: 35 }).notNull(),
	userlevel: int("userlevel").notNull(),
	provinsi: varchar("Provinsi", { length: 20 }).notNull(),
	configPenghasil: varchar("Config_penghasil", { length: 50 }).notNull(),
	activated: mysqlEnum("Activated", ['Y','N']).default('N').notNull(),
},
(table) => [
	primaryKey({ columns: [table.username], name: "useraccounts_username"}),
]);

export const useraccounts170325 = mysqlTable("useraccounts170325", {
	username: varchar("username", { length: 50 }).notNull(),
	kuid: varchar("kuid", { length: 32 }).notNull(),
	password: varchar("password", { length: 35 }).notNull(),
	userlevel: int("userlevel").notNull(),
	provinsi: varchar("Provinsi", { length: 20 }).notNull(),
	configPenghasil: varchar("Config_penghasil", { length: 50 }).notNull(),
	activated: mysqlEnum("Activated", ['Y','N']).default('N').notNull(),
},
(table) => [
	primaryKey({ columns: [table.username], name: "useraccounts170325_username"}),
]);

export const users = mysqlTable("users", {
	username: varchar({ length: 30 }).notNull(),
	password: varchar({ length: 32 }),
	userid: varchar({ length: 32 }),
	userlevel: tinyint({ unsigned: true }).notNull(),
	email: varchar({ length: 50 }),
	timestamp: int({ unsigned: true }).notNull(),
	parentDirectory: varchar("parent_directory", { length: 30 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.username], name: "users_username"}),
]);

export const session = mysqlTable("session", {
	id: varchar({ length: 255 }).notNull(),
	userId: varchar("user_id", { length: 50 }).notNull(),
	expiresAt: datetime("expires_at", { mode: "date" }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "session_id"}),
]);

export const registers = mysqlTable("registers", {
	email: varchar({ length: 100 }).notNull(),
	nama: varchar({ length: 100 }).notNull(),
	nik: varchar({ length: 100 }).notNull(),
	org: varchar({ length: 50 }).notNull(),
	orgLokasi: varchar("org_lokasi", { length: 50 }).notNull(),
	mgrEmail: varchar("mgr_email", { length: 100 }).notNull(),
	mgrNama: varchar("mgr_nama", { length: 100 }).notNull(),
	mgrNik: varchar("mgr_nik", { length: 100 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.nik], name: "registers_nik" }),
]);
