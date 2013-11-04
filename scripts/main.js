require.config({
    baseUrl: 'scripts',
    paths: {
        'Lodash': '/openbox/vendor/lodash/1.0.1/lodash.underscore.min',
        'jQuery': [
            'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
            '/openbox/vendor/jquery/1.9.1/jquery-1.9.1.min'
         ],
        'Backbone': '/openbox/vendor/backbone/1.0.0/backbone-min',
        'BackboneTouch' : 'libs/backbone-touch',
        'openbox': '/openbox/api/3.1/openbox.min',
        'text' : 'libs/text'
    },
    shim: {
        'jQuery' : {
            exports : '$'
        },
        'hogan': {
            exports: 'Hogan'
        },
        'Lodash': {
            exports: '_'
        },
        'Backbone': {
            deps: ['Lodash', 'jQuery'],
            exports: "Backbone"
        },
        'openbox': {deps: ['jQuery'], exports: 'openbox'}
    }
});


/* globals window */

require([
    'jQuery',
    'Lodash',
    'views/app-view',
    'openbox',
    'libs/xdr',
    'libs/client-branding'
],
function(
    $,
    _,
    AppView,
    openbox,
    xdr
) {
    'use strict';

    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
              ? args[number]
              : match
            ;
        });
    };

    var $progressBar,
        $overlay,
        initApp = function(params){
            // on loaded 
            var appView = new AppView({
                el : 'body',
                version : window.f1version
            });

        };

    openbox.ready(function(params) {
        // preload
        openbox.setWidgetDetails({
             version     : 'base widget',
             partner     : 'your partner',
             supplier    : 'domain',
             type        : 'the type',
             desc        : 'adescription'
        });

        initApp(params);
    });

});