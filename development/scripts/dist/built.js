// Fix for email obfuscator
var linkMt;

linkMt = function(n,d,s,b) {
	"use strict";
	location.href = "mailto:" + n + "@" + d + "?subject=" + encodeURI(s) + "&body=" + encodeURI(b);
};

(function () {
	"use strict";

}());