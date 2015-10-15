// Karma configuration
// Generated on Mon Apr 27 2015 21:59:08 GMT-0400 (CLT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//    frameworks: ['mocha'],
    frameworks: ['mocha', 'chai', 'jasmine'],
//    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //Angular source
        'www/lib/ionic/js/ionic.bundle.js',
        'www/lib/angular-resource/angular-resource.min.js',
        'www/lib/angular-mocks/angular-mocks.js',
        'www/lib/angulartics/dist/angulartics.min.js',
        'www/lib/angulartics/dist/angulartics-ga.min.js',
        // 'lib/angular-local-storage/dist/angular-local-storage.js',
        // 'lib/ngCordova/dist/ng-cordova.js',
        // 'lib/ionic/js/angular-ui/angular-ui-router.js',
        // '../www/lib/angular-animate/angular-animate.js',
        // '../www/lib/angular-sanitize/angular-sanitize.js',

        //App code
        // '../app/js/**/*.js',
        'www/js/templates.js',
        'www/js/app.js',

//        '../node_modules/chai/chai.js',
//        'lib/chai-should.js',
//        'lib/chai-expect.js',

       //Test files
        'test/client/services/*.js',
        'test/client/controllers/*.js',
      // '**/*tests.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'www/js/app.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'junit'],

    urlRoot : '/__karma__/',

    // web server port
    port: 9876,
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Consider browser as dead if no response for 5 sec
    browserNoActivityTimeout: 5000,

    coverageReporter: {
        reporters: [{
            type: 'html',
            dir: 'shippable/codecoverage/'
        }, {
            type: 'cobertura',
            dir: 'shippable/codecoverage/',
            file: 'coverage.xml'
        }]
    },
    junitReporter: {
        outputFile: 'shippable/testresults/unit.xml',
        suite: ''
    },

  });
};

