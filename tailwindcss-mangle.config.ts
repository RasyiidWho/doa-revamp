import { defineConfig } from '@tailwindcss-mangle/config';

export default defineConfig({
	registry: {
		output: {
			stripUniversalSelector: true
		}
	},
	transformer: {
		generator: {
			classPrefix: 'ioneric-'
		}
	}
});
