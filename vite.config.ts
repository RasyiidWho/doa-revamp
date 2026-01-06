import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import utwm from 'unplugin-tailwindcss-mangle/vite';
import removeConsole from 'vite-plugin-svelte-console-remover';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), utwm(), removeConsole()],
	ssr: {
		noExternal: true,
		external: [
			'mysql2', // CJS + native bindings
			'html-minifier', // CJS, require at top-level
			'yup', // pulls property-expr (CJS)
			'property-expr', // CJS (implicit dep of yup)
			'blueimp-md5', // UMD, global mutation
			'nodemailer', // CJS + fs/net
			'docxtemplater', // CJS
			'pizzip', // CJS
			'docx2pdf-converter' // Node-only, fs + child_process
		]
	}
});
