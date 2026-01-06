import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import utwm from 'unplugin-tailwindcss-mangle/vite';
import removeConsole from 'vite-plugin-svelte-console-remover';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), utwm(), removeConsole()],
	ssr: {
		noExternal: true
	}
});
