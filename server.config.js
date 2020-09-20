import { ExpressAdapter } from "@uvue/server";

export default {
  // Use custom adapter for server
  adapter: ExpressAdapter,

  // Server plugins installed
  plugins: [
    // Compress responses
    "@uvue/server/plugins/gzip",
    // Serve static files
    "@uvue/server/plugins/static",
    // API
    //'./src/server/apiPlugin',
  ],
  // Watch for changes in these files to automatically reboot server
  watch: ["src/**/*.js"],
  // SPA paths: no SSR occur for these paths
  //spaPaths: ['/spa'],
  static: {
    paths: [],
    scanRouter: true,
    params: {
      modulename: ["json", "rest", "oauth", "acl", "admin"],
    },
  },
};
