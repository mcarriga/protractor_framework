exports.config = {
  directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: "chrome"
  },
  framework: "jasmine",
  specs: ["../tests/calcTests.ts"],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 90000
  },
  onPrepare: () => {
    let globals = require("protractor");
    let browser = globals.browser;
    browser
      .manage()
      .window()
      .maximize();
    browser
      .manage()
      .timeouts()
      .implicitlyWait(5000);
  }
};
