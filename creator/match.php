<!DOCTYPE html>

<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="style.css" />
	<link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
	<script src="js/main.min.js" type="text/javascript"></script>
	<script src="js/jquery-3.2.1.min.js" type="text/javascript"></script>
	<script src="js/svg.js" type="text/javascript"></script>
	<script src="js/nameColor.js" type="text/javascript"></script>
</head>

<body>
	<header class="header"></header>

	<div class="wrap">
		<section class="main">
			<div class="creator col-lg-12"><img src="img/main/creator_logo.png" alt="Logo Creator"></div>

			<div class="">
				<div class="textblock col-lg-7">
					<p>You have a match with Lauren Curtis! 
					This youtuber looks like you and can help you with your make-up!</p>
				</div>
			</div>

			<div id="block__match" class="block__match col-lg-6">
					<div class="row">
						<div class="colors col-lg-2">
							<div id="skincolors"></div>
							<h3>Your skincolor</h3>

							<div id="haircolors"></div>
							<h3>Your haircolor</h3>

							<div id="eyecolors"></div> 
							<h3>Your eyecolor</h3>
						</div>

						<div class="yt">
							<div class="yt__name">Lauren Curtis</div>
							<div class="yt__link"><a href="http://www.youtube.com/user/laurenbeautyy">Youtube Channel</a></div>
						</div>


						<div class="colors_yt col-lg-2">
							<div id="skincolors_yt"></div>
							<h3>Her skincolor</h3>

							<div id="haircolors_yt"></div>
							<h3>Her haircolor</h3>

							<div id="eyecolors_yt"></div> 
							<h3>Her eyecolor</h3>
						</div>
					</div>
			</div>
		</section>
	</div>

	<script src="js/checkColors.js" type="text/javascript"></script>
	<div class="footer"><p class="footer__credits">Face Recognition by <a href="https://www.betafaceapi.com">betafaceapi.com</a></p></div>
</body>
<html>