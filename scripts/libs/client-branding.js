define([
    'openbox'
],
function(
    openbox
) {
    'use strict';

    openbox.ready(function(params) {
        // preload
        var createStyle = function(href){
            var ss = document.createElement("link");
            ss.type = "text/css";
            ss.rel = 'stylesheet';
            ss.href = href;
            return ss;
        };

        if(params.style){
            var client = (window.location.href.split('style=')[1]).replace(/(&.*)/, ''),
                head = document.getElementsByTagName("head")[0],
                path = './styles/' + client;

            head.appendChild(createStyle(path + '/style.css'));
            if(navigator.userAgent.match(/MSIE/i)) head.appendChild(createStyle(path + '/ie.css'));
        }
    });

});