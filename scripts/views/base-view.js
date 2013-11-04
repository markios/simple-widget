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

    var  monthStringsAbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         dayStringsAbr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
         dateString = '{0} {1} {2} {3}',
         $scrollEl = $('body,html');

    var baseView = Backbone.View.extend({

        _pageChanged : function(page){
            this.$el.toggle(page === this.name);
        },

        initialize : function(){
            this.framework.on('page:changed', this._pageChanged, this);
        },

        showBusy : function(){
            $('<div class="loading">').html(this.message || this.viewName + ' will begin soon...').appendTo(this.$el);
        },

        hideBusy : function(){
            this.$('.loading').remove();
        },

        scrollTo : function(to){
            if(typeof to === 'string') to = $scrollEl[0].scrollHeight;
            if(! this.platformIsNative()) {
                $scrollEl.animate({ scrollTop : to }, 1000);
            }
            else {
                $scrollEl.scrollTop(to);
            }
        },

        getFriendlyDateString : function(date){
            date = typeof date === 'string' ? new Date(date) : date;
            return dateString.format(dayStringsAbr[date.getDay()], this._ordinal(date.getDate()), monthStringsAbr[date.getMonth()], date.getFullYear());
        },

        addAppendView : function(Target, options){
            var view = new Target(_.extend({ model : this.model }, options));
            this.$el.append(view.$el);
            this.views.push(view);
            return view;
        }

    });

    _.extend(baseView.prototype, base);

    return baseView;
});