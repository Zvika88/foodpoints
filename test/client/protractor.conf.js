exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  capabilities: {
    'browserName': 'firefox'
  },

  specs: [
  	'e2e/*.test.js'
  ],

  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    defaultTimeoutInterval: 30000
  }
};