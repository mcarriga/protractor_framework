var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
//var AllureReporter = require('jasmine-allure-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: "target/screenshots",
  filename: "my-report.html",
  cleanDestination: true,
  captureOnlyFailedSpecs: true
});

// An example configuration file.
exports.config = {
  //directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [{
    browserName: "chrome",
    shardTestFiles: true,
    maxInstances: 2
  }],

  // Framework to use. Jasmine is recommended.
  framework: "jasmine",

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ["./tests/calcTests.ts", "./tests/calcTests2.ts"],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  // Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function () {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.json") // Relative path of tsconfig.json file
    });
    jasmine.getEnv().addReporter(reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};