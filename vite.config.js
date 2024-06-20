import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': '/src/components',
			'@pages': '/src/pages',
			'@public': '/public',
			'@icons': '/src/assets/icons',
			'@CONST': '/src/const',
			'@api': '/api'
		}
	}
})
