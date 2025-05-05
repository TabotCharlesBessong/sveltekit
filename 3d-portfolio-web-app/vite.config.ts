import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	ssr: {
		noExternal: ['three', '@threlte/core']
	},
	plugins: [sveltekit(), tailwindcss()],
	server: {
		fs: {
			// Allow access to files from the project root.
			allow: ['..']
		}
	},
	optimizeDeps: {
		include: ['@threlte/core', 'three'],
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: 'esnext'
	},
	resolve: {
		alias: {
			'@threlte/core': '@threlte/core/dist/index.js'
		}
	}
});
