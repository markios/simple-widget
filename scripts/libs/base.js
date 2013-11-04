define([
    'jQuery',
    'Lodash',
    'openbox',
    'Backbone'
],
function(
    $,
    _,
    openbox,
    Backbone
) {
    'use strict';

    var base = {

        defer : function(time){
            var context = this;
            return _.bind(function (f) {
                this.hasDeffered = setTimeout(function(){ f.apply(context); }, time);
            }, this);
        },

        buildUrl : function(){
            this.url = this.urlPart.format(this.params.phaseId, this.params.languageCode, Date.now());
            return this;
        },

        platformIsTablet : function(){
            return ! this.platformIsMobile() && this.platformIsNative();
        },

        platformIsNative : function(){
            return (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) != null;
        },

        platformIsWeb : function(){
            return ! this.platformIsNative();
        },

        platformIsMobile : function(){
            return this.platformIsNative() && $('body').width() <= 410;
        },

        framework : Backbone.Events
    };
  
    return base;
});