// get parameters from colors in URL
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

// colors without #
var colorEyes = getUrlParameter("colorEyes");
var colorHair = getUrlParameter("colorHair");
var colorSkin = getUrlParameter("colorSkin");

// colors with #
var _colorEyes = ("#" + colorEyes);
var _colorHair = ("#" + colorHair);
var _colorSkin = ("#" + colorSkin);

//give colors to divs
$("#skincolors").css("background-color", _colorSkin);
$("#haircolors").css("background-color", _colorHair);
$("#eyecolors").css("background-color", _colorEyes);

// change colors to RGB
var colorEyesRGB = hexToRgb(_colorEyes);
var colorHairRGB = hexToRgb(_colorHair);
var colorSkinRGB = hexToRgb(_colorSkin);

console.log(colorEyesRGB, colorHairRGB, colorSkinRGB);