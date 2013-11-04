define([
    'jQuery',
    'Lodash',
    'openbox',
    'Backbone',
    'libs/base'
],
function(
    $,
    _,
    openbox,
    Backbone,
    Base
) {
    'use strict';

    /*  Private Members */
    var AppRouter = Backbone.Router.extend({

        /* Public Members */
        routes: {
            ''              :  'main',
            'home'          :  'main'
        },

        initialize : function(){},

        main: function(query, page) {
            this.framework.trigger('page:changed', page);
        }
    });

    _.extend(AppRouter.prototype, Base);

    return AppRouter;
});