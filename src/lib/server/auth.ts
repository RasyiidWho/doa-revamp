import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./db";
import { session } from "./db/schema";
import { mysqlTable, varchar, int, mysqlEnum } from "drizzle-orm/mysql-core";

const userTable = mysqlTable("useraccounts", {
	id: varchar("username", { length: 50 }).notNull(),
	kuid: varchar("kuid", { length: 50 }).notNull(),
	password: varchar({ length: 35 }).notNull(),
	userlevel: int().notNull(),
	provinsi: varchar("Provinsi", { length: 20 }).notNull(),
	configPenghasil: varchar("Config_penghasil", { length: 50 }).notNull(),
	activated: mysqlEnum("Activated", ['Y','N']).default('N').notNull(),
});

const adapter = new DrizzleMySQLAdapter(db, session, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			kuid: attributes.kuid,
			userlevel: attributes.userlevel,
			provinsi: attributes.provinsi,
			configPenghasil: attributes.configPenghasil,
			activated: attributes.activated
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	kuid: string;
	userlevel: number;
	provinsi: string;
	configPenghasil: string;
	activated: "Y" | "N";
}
