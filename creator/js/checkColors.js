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


parseColorsPHP(colorEyes, colorHair, colorSkin);

function parseColorsPHP(colorEyes, colorHair, colorSkin) {
	var colorEyes_c = colorEyes;
	colorEyes_c = colorEyes_c.replace("#", "");

	var colorHair_c = colorHair;
	colorHair_c = colorHair_c.replace("#", "");

	var colorSkin_c = colorSkin;
	colorSkin_c = colorSkin_c.replace("#", "");

	$.ajax({
		type: "POST",
		url: 'matchColors.php?colorEyes=' + colorEyes_c + '&colorHair=' + colorHair_c + '&colorSkin=' + colorSkin_c,
		success: function (data) {
			console.log("test");
		},
	});
};

var _colorEyes = hexToRgb();
var _colorHair = hexToRgb();
var _colorSkin = hexToRgb();

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}