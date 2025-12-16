import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db',
	dialect: 'mysql',
	verbose: true,
	strict: true,
	dbCredentials: {
		host: '10.1.95.76',
		port: 3306,
		user: 'doa-revamp',
		password: 'ab8382bt',
		database: 'standard'
	},
});
