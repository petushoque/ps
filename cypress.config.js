const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  //experimentalSessionAndOrigin: true,
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
    },
  },
});
