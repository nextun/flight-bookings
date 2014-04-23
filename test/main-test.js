(function () {
    var tests = [];
    for (var file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {

            if (/.spec\.js$/.test(file)) {
                tests.push(file);
            }
        }
    }

    requirejs.config({
        // Karma serves files from '/base'
        baseUrl: '/base/js',

        paths: {
            'jquery': '../bower_components/jquery/jquery',
            'chai': '../node_modules/chai/chai',
            'chai-jquery': '../node_modules/chai-jquery/chai-jquery',
            underscore: '../bower_components/underscore/underscore'
        },

        shim: {
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'chai-jquery': ['jquery', 'chai']
        },

        // ask Require.js to load these files (all our tests)
        deps: tests,

        // start test run, once Require.js is done
        callback: window.__karma__.start
    });
})();