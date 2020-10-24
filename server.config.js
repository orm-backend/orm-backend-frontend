import { ExpressAdapter } from "@uvue/server";

export default {
  // For firebase: we need to include all node_modules in server bundle
  // externalsWhitelist: [
  //   () => {
  //     return true;
  //   },
  // ],
  // Use custom adapter for server
  adapter: ExpressAdapter,
  http2: true,
  renderer: {
    shouldPrefetch: (file, type) => {
      return false;
    },
  },
  // Server plugins installed
  plugins: [
    // Compress responses
    "@uvue/server/plugins/gzip",
    // Serve static files
    "@uvue/server/plugins/static",
    // API
    //'./src/server/apiPlugin',
    //"@uvue/server/plugins/modernBuild",
  ],
  // Watch for changes in these files to automatically reboot server
  watch: ["src/**/*.js"],
  // SPA paths: no SSR occur for these paths
  //spaPaths: ['/spa'],
  static: {
    paths: [
      "/",
      "/login",
      "/guides/json",
      "/guides/oauth",
      "/guides/admin",
      "/guides/acl",
      "/guides/rest",
    ],
    scanRouter: true,
    params: {
      modulename: ["json", "rest", "oauth", "acl"],
    },
  },
};
