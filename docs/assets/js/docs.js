!function(a){"use strict";function b(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function c(a,b){var c=d(a,b)?f:e;c(a,b)}var d,e,f;"classList"in document.documentElement?(d=function(a,b){return a.classList.contains(b)},e=function(a,b){a.classList.add(b)},f=function(a,b){a.classList.remove(b)}):(d=function(a,c){return b(c).test(a.className)},e=function(a,b){d(a,b)||(a.className=a.className+" "+b)},f=function(a,c){a.className=a.className.replace(b(c)," ")});var g={hasClass:d,addClass:e,removeClass:f,toggleClass:c,has:d,add:e,remove:f,toggle:c};"function"==typeof define&&define.amd?define(g):"object"==typeof exports?module.exports=g:a.classie=g}(window),function(){var a=(document.body,document.querySelector(".js-ui-topbar")),b=document.querySelector(".js-ui-topbar-toggle"),c=function(b){b.preventDefault(),classie.toggle(a,"is-open")};a&&b&&b.addEventListener("click",c,!1)}();