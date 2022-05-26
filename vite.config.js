import reactRefresh from "@vitejs/plugin-react-refresh";

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  server: {
	hmr: {
	  clientPort: process.env.GITPOD_WORKSPACE_URL ? 443 : 3000,
	  host: process.env.GITPOD_WORKSPACE_URL
		? process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-')
		: 'localhost',
	},
  },
};
