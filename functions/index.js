const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const path = require("path");
const { Server } = require("@uvue/server");

// Create a UVue server
const server = new Server({
  distPath: path.resolve("dist"),
});

// Load and setup plugins
const esm = require("esm")(module); // esm package is needed to load plugins
server
  .addPlugin(esm("@uvue/server/plugins/serverError"))
  .addPlugin(esm("@uvue/server/plugins/cookie"));

// Setup our connect instance
server.setup();

exports.ssr = functions.https.onRequest(server.getApp());
