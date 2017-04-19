var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

var colorEyes = getUrlParameter("colorEyes");
var colorHair = getUrlParameter("colorHair");
var colorSkin = getUrlParameter("colorSkin");

var _colorEyes = ("#" + colorEyes);
var _colorHair = ("#" + colorHair);
var _colorSkin = ("#" + colorSkin);

//console.log(_colorEyes, _colorHair, _colorSkin);

$("#skincolors").css("background-color", _colorSkin);
$("#haircolors").css("background-color", _colorHair);
$("#eyecolors").css("background-color", _colorEyes);

var colorEyesRGB = hexToRgb(_colorEyes);
console.log(colorEyesRGB);

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
