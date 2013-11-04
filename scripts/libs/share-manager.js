define([
    'jQuery',
    'Lodash',
    'Backbone',
    'openbox'
],
function(
    $,
    _,
    Backbone,
    openbox
) {
    'use strict';

    var host = openbox.params.host || window.location.host,
        shortenService = '/openbox/shorturl/shorten/?url=',
        linkURL = 'http://' + host + '/tv/episode/' + openbox.params.episodeId + '?focus=live',
        facebook_redirect = encodeURIComponent('http://' + host + '/showtime/assets/share/thankyou.html?provider=facebook'),
        isInDev = /192.168.178.56|localhost/.test(window.location.hostname);

    if(isInDev) shortenService = 'http://' + host + shortenService;

    function _twitterShorten (longString) {
        var shortString = decodeURIComponent(longString);
        if (shortString.length < 113) return longString;
        // break at a space
        shortString = shortString.substring(0, shortString.lastIndexOf(' ', 108)) + '...';
        return shortString;
    }

    var shareManager = function(options){
        this.options = options;
        this.options.framework.on('share', this.onShare, this);
        this.options.model.once('set:shareLinks', this.setShareLinks, this);
    };

    _.extend(shareManager.prototype, {

        setShareLinks : function(shareOptions){
            this.facebookParams = {
                network     : 'facebook',
                text        : shareOptions.shareText,
                link        : shareOptions.share_link,
                image       : shareOptions.image_link,
                redirectUri : facebook_redirect,
                name        : shareOptions.facebookName,
                description : shareOptions.facebookDescription
            };

            this.twitterParams = {
                network  : 'twitter',
                hashtags : shareOptions.hashtags,
                text     : _twitterShorten(shareOptions.shareText),
                link     : shareOptions.share_link
            };
        },

        shareTwitter : function(args){
            var params = _.clone(this.twitterParams);
            if(typeof args === 'function'){
                params = args('twitter', params);
                params.text = _twitterShorten(params.text);
            }

            if (openbox.supports.launchTweet) {
                params.text +=  ' ' + params.link;
                params.hashtags = '#' + params.hashtags;
                openbox.launchTweet(params);
            } else {

                if (openbox.doShareEncoding) {
                    params.text = encodeURIComponent(params.text);
                    params.hashtags = encodeURIComponent(" " + params.hashtags);
                    params.link = encodeURIComponent(params.link);
                }
                var link = "https://twitter.com/intent/tweet?related=zeebox&text=" + params.text + "&url=" + params.link + "&hashtags=" + params.hashtags;
                window.open(link, 'Buzz', 'height=400, width=400');
            }
            openbox.reportAction({
                eventName: 'click',
                action: 'share-twitter'
            });
        },

        shareFacebook : function(args){
            var params = _.clone(this.facebookParams);
            if(typeof args === 'function'){
                params = args('facebook', params);
            }
            if (openbox.supports.share) {
                openbox.share(params);
            }
            else {
                if (openbox.doShareEncoding) {
                    if (params.redirectUri) params.redirectUri = encodeURIComponent(openbox.redirectUri);
                    if (params.link) params.link = encodeURIComponent(params.link);
                    if (params.text) params.text = encodeURIComponent(params.text);
                    if (params.image) params.image = encodeURIComponent(params.image);
                    if (params.name) params.name = encodeURIComponent(params.name);
                    if (params.description) params.description = encodeURIComponent(params.description);
                }

                var link = "https://www.facebook.com/dialog/feed?_path=feed&app_id=124810527615971" +
                "&redirect_uri=" + params.redirectUri +
                (params.link? "&link=" + params.link : "" )  +
                (params.text? "&caption=" + params.text : "") +
                (params.image? "&picture=" + params.image : "") +
                (params.name? '&name=' + params.name : "") +
                (params.description? "&description=" + params.description : "");

                window.open(link);
            }
            openbox.reportAction({
                eventName: 'click',
                action: 'share-facebook'
            });
        },

        /* event handler for sharing */
        onShare : function(type, params){
            switch(type){
                case 'facebook':
                    this.shareFacebook(params);
                break;
                case 'twitter':
                    this.shareTwitter(params);
                break;
            }
        }
    });

    return shareManager;
});