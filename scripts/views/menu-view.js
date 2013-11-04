define([
    'jQuery',
    'Lodash',
    'BackboneTouch',
    'openbox',
    'views/base-view'
],
function(
    $,
    _,
    Backbone,
    openbox,
    BaseView
) {
    'use strict';

    return BaseView.extend({

        _onMenuClicked : function(e){
            window.location.hash = '#' + $(e.currentTarget).attr('data-rel');
            this.defer(300)(this._notifyMenuClicked);
        },

        _notifyMenuClicked : function(){
            this.framework.trigger('menu:hide');
        },

        events : {
            'change input[type="radio"]' : '_onMenuClicked'
        },

        initialize : function(){
            
        },

        render : function(){

            return this;
        }
    });

});