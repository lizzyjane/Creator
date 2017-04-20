<?php
	require_once 'db.php';

   $colorEyes = $_GET['colorEyes'];
   $_colorEyes = '#' . $colorEyes;
   //echo $_colorEyes;

   $colorHair = $_GET['colorHair'];
   $_colorHair = '#' . $colorHair;
   //echo "$_colorHair";

   $colorSkin = $_GET['colorSkin'];
   $_colorSkin = '#' . $colorSkin;
   //echo "$_colorSkin";

	$colorEyes_RGB = $_colorEyes;
	$colorHair_RGB = $_colorHair;
	$colorSkin_RGB = $_colorSkin;

	$colorDataUser = userColorsRBG ($colorEyes_RGB, $colorHair_RGB, $colorSkin_RGB);

function userColorsRBG ($colorEyes_RGB, $colorHair_RGB, $colorSkin_RGB) {
	list($r, $g, $b) = sscanf($colorEyes_RGB, "#%02x%02x%02x");
	$colorEyes_R = "$r";
	$colorEyes_G = "$g";
	$colorEyes_B = "$b";

	list($r, $g, $b) = sscanf($colorHair_RGB, "#%02x%02x%02x");
	$colorHair_R = "$r";
	$colorHair_G = "$g";
	$colorHair_B = "$b";

	list($r, $g, $b) = sscanf($colorSkin_RGB, "#%02x%02x%02x");
	$colorSkin_R = "$r";
	$colorSkin_G = "$g";
	$colorSkin_B = "$b";

	$colorEyesUser = new stdClass();
	$colorEyesUser->R = $colorEyes_R;
	$colorEyesUser->G = $colorEyes_G;
	$colorEyesUser->B = $colorEyes_B;

	$colorHairUser = new stdClass();
	$colorHairUser->R = $colorHair_R;
	$colorHairUser->G = $colorHair_G;
	$colorHairUser->B = $colorHair_B;

	$colorSkinUser = new stdClass();
	$colorSkinUser->R = $colorSkin_R;
	$colorSkinUser->G = $colorSkin_G;
	$colorSkinUser->B = $colorSkin_B;

	$colorAllUser = new stdClass();
	$colorAllUser->eyes = $colorEyesUser;
	$colorAllUser->hair = $colorHairUser;
	$colorAllUser->skin = $colorSkinUser;

	return ($colorAllUser);

	}


	$conn = dbConnection();
	$youtubers = getUsers($conn);


	for ($i = 0; $i < count($youtubers); $i++) {
    	//echo "$i";
    	$haircolorYoutuber = $youtubers[$i]["haircolor"];
    	$eyecolorYoutuber = $youtubers[$i]["eyecolor"];
    	$skincolorYoutuber = $youtubers[$i]["skincolor"];
    	// echo $haircolorYoutuber;

    	$colorDataYoutuber = youtubeColorsRGB($haircolorYoutuber, $eyecolorYoutuber, $skincolorYoutuber);
		$colorDistanceYT_U = colorDistanceRGB($colorAllUser, $colorAllYT);
		echo ($colorDistanceYT_U);
	} 

	function youtubeColorsRGB($haircolorYoutuber, $eyecolorYoutuber, $skincolorYoutuber) {
		$colorEyesYT_RGB = $eyecolorYoutuber;
		$colorHairYT_RGB = $haircolorYoutuber;
		$colorSkinYT_RGB = $skincolorYoutuber;

		list($r, $g, $b) = sscanf($eyecolorYoutuber, "#%02x%02x%02x");
		$colorEyesYT_R = "$r";
		$colorEyesYT_G = "$g";
		$colorEyesYT_B = "$b";

		list($r, $g, $b) = sscanf($haircolorYoutuber, "#%02x%02x%02x");
		$colorHairYT_R = "$r";
		$colorHairYT_G = "$g";
		$colorHairYT_B = "$b";

		list($r, $g, $b) = sscanf($skincolorYoutuber, "#%02x%02x%02x");
		$colorSkinYT_R = "$r";
		$colorSkinYT_G = "$g";
		$colorSkinYT_B = "$b";


		$colorEyesYT = new stdClass();
		$colorEyesYT->R = $colorEyesYT_R;
		$colorEyesYT->G = $colorEyesYT_G;
		$colorEyesYT->B = $colorEyesYT_B;

		$colorHairYT = new stdClass();
		$colorHairYT->R = $colorHairYT_R;
		$colorHairYT->G = $colorHairYT_G;
		$colorHairYT->B = $colorHairYT_B;

		$colorSkinYT = new stdClass();
		$colorSkinYT->R = $colorSkinYT_R;
		$colorSkinYT->G = $colorSkinYT_G;
		$colorSkinYT->B = $colorSkinYT_B;

		$colorAllYT = new stdClass();
		$colorAllYT->eyes = $colorEyesYT;
		$colorAllYT->hair = $colorHairYT;
		$colorAllYT->skin = $colorSkinYT;

		return ($colorAllYT);
	}

function colorDistanceRGB($c1, $c2) {
	$r = $c1->R - $c2->R;
	$g = $c1->G - $c2->G;
	$b = $c1->B - $c2->B;
	return sqrt($r*$r + $g*$g + $b*$b);
}


?>