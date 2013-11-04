define([
    'jQuery',
    'Lodash',
    'Backbone',
    'openbox',
    'libs/base'
],
function(
    $,
    _,
    Backbone,
    openbox,
    base
) {
    'use strict';

    var baseModel =  Backbone.Collection.extend({

        deepFind : function(obj, path){
            var paths = path.split('.'),
                current = obj,
                i,
                pathLength = paths.length;

            for (i = 0; i < pathLength; ++i) {
                if (current[paths[i]] === undefined) {
                    return undefined;
                } else {
                    current = current[paths[i]];
                }
            }
            return current;
        },

        beginPolling : function(){
            var that = this;
            this.interval = setInterval(function(){
                that.buildUrl().fetch();
            }, this.pollSpeed || 8000);
            return this;
        }
    });
    _.extend(baseModel.prototype, base);
    return baseModel;
});