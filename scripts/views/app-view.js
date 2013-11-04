define([
    'jQuery',
    'Lodash',
    'BackboneTouch',
    'openbox',
    'views/base-view',
    'views/loading-view',
    'views/menu-view',
    'routers/app-router'
],
function(
    $,
    _,
    Backbone,
    openbox,
    BaseView,
    LoadingView,
    MenuView,
    AppRouter
) {
    'use strict';

    return BaseView.extend({

        _onBackToTop : function(){
            this.scrollTo(0);
        },

        _initSubViews : function(){
            this.views.push(new LoadingView({ el : '.loading', collection : this.collection }));
            this.views.push(new MenuView({ el : '.menu' }));
        },

        _onMenuClicked : function(){
            this.$('.wrapper').toggleClass('peekIn');
        },

        /* Public Members */
        views : [],

        events : {
            'click .menu-button' : '_onMenuClicked'
        },

        initialize : function(){
            this._initSubViews();
            this.router = new AppRouter();
            Backbone.history.start({ pushState : false });
            this.render();
            this.framework.trigger('ready');
            this.framework.on('menu:hide', this._onMenuClicked, this);
        },

        render : function(){
            this.$('header .title .main > .big').html(new Date().getFullYear());
            return this;
        }
    });
});