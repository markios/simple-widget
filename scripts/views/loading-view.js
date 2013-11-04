define([
    'jQuery',
    'Lodash',
    'Backbone',
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

        /* Public Members */
        _onReady : function(e){
            this.$el.addClass('ready');
            var self = this;
            setTimeout(function(){
                self.$el.hide();
            }, 1000);
            this.framework.trigger('content:loaded');
        },

        _progress : function(percent){
            this.loaded = percent;
            this.$progress.css({ width :  this.loaded + '%' });
        },

        _preload : function(images){
            var self = this,
                isWeb = ! this.platformIsNative(),
                targetCount = images.length;

            _.each(images, function(imageName){
                var image = new Image();
                image.src = isWeb ? imageName.replace('@2x', '') : imageName;
                image.onload = function(){
                    targetCount-=1;
                    self._progress(self._loadingBits);
                    if(targetCount === 0) self._onReady();
                };
            });
        },

        _updateProgress : function(){
            this._progress(100);
            this.defer(300)(this._onReady);
        },

        loaded : 0,

        initialize : function(){
            this.framework.on('ready', this._onReady, this);
            this.$progress = this.$('#progressBar');
            this.render();
        },

        render : function(){
            return this;
        }
    });
});