

			function encodeImageFileAsURL(callback, context) {

				var filesSelected = document.getElementById("inputFileToLoad").files;
				if (filesSelected.length > 0) {
					var fileToLoad = filesSelected[0];
					var fileReader = new FileReader();
					fileReader.onload = function(fileLoadedEvent) {

			      	// data: base64
			      	var srcData = fileLoadedEvent.target.result; 

			      	var newImage = document.createElement('img');
			      	newImage.src = srcData;

			      	document.getElementById("loader").style.visibility = "visible";

			      	document.getElementById("imgPerson").innerHTML = newImage.outerHTML;

			      	callback && callback.call(context, newImage.src);

			      }

			      fileReader.readAsDataURL(fileToLoad);

			  }
			}

			$('#inputFileToLoad').on('change', function(){
				encodeImageFileAsURL(function(data)
				{
					var base64 = data;
					base64 = base64.replace("data:image/jpeg;base64,", "");

					var msg = '<?xml version="1.0" encoding="utf-8"?><ImageRequestBinary xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
					'<api_key>d45fd466-51e2-4701-8da8-04351c872236</api_key><api_secret>171e8465-f548-401d-b63b-caf0dc28df5f</api_secret>' +
					'<detection_flags>' + "classifiers" + "extended" + '</detection_flags>' +
					'<imagefile_data>' + base64 + '</imagefile_data>' +
					'<original_filename>' + '</original_filename>' +
					'</ImageRequestBinary>';

					$.ajax({
						async: 'true',
						crossDomain: 'true',
						url: 'http://www.betafaceapi.com/service.svc/UploadNewImage_File',
						type: 'POST',
						contentLength: '94998',
						contentType: 'application/xml',
						CacheControl: 'no-cache',
						Pragma: 'no-cache',
						data: msg,
						dataType: 'xml',

						success: function (data, textStatus, jqXHR) {
							var xmlDocRoot = $.parseXML(jqXHR.responseText);
							var xmlDoc = $(xmlDocRoot).children("BetafaceImageResponse");
							var int_response = parseInt($(xmlDoc).children("int_response").text());
							var string_response = $(xmlDoc).children("string_response").text();
							if (int_response == 0) {
								var img_uid = $(xmlDoc).children("img_uid").text();
								getImageInfo(img_uid);
							}
							else {
                            //error
                            console.info(int_response);
                            console.info(string_response);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    	console.info(textStatus);
                    } 

                });

				}, this);
			})

			function getImageInfo(imageUid)
			{
				var msg = '<?xml version="1.0" encoding="utf-8"?><ImageInfoRequestUid><api_key>d45fd466-51e2-4701-8da8-04351c872236</api_key><api_secret>171e8465-f548-401d-b63b-caf0dc28df5f</api_secret>' +
				'<img_uid>' + imageUid + '</img_uid></ImageInfoRequestUid>';

				$.ajax({
					crossDomain: true,
					url: 'http://www.betafaceapi.com/service.svc/GetImageInfo',
					type: 'post',
					contentType: 'application/xml',
					processData: false,
					data: msg,
					dataType: 'xml',
					success: function (data, textStatus, jqXHR) {
						var xmlDocRoot = $.parseXML(jqXHR.responseText);
						var xmlDoc = $(xmlDocRoot).children("BetafaceImageInfoResponse");
						var int_response = parseInt($(xmlDoc).children("int_response").text());
						var string_response = $(xmlDoc).children("string_response").text();
						var faces = $(xmlDoc).children("faces").text();
						var uid = $(xmlDoc).children("faces").children("FaceInfo").children("uid").text();

						if (int_response == 1) {
	                        // image is in the queue
	                        setTimeout(function () { getImageInfo(imageUid); }, 500);
	                        document.getElementById("loader").style.visibility = "visible";
	                        document.getElementById("block").style.visibility = "hidden";
	                        console.log("loading......");
	                    }

	                    else if (int_response == 0) {
	                        //image processed
	                        document.getElementById("loader").style.visibility = "hidden";
	                        document.getElementById("block").style.visibility = "visible";
	                        getFaceImage(uid);
	                    }

	                },
	                error: function (jqXHR, textStatus, errorThrown) {
	                	console.info(textStatus);
	                } 
	            });
			}

			function getFaceImage(uid) 
			{
				var msg = '<?xml version="1.0" encoding="utf-8"?><FaceRequestId><api_key>d45fd466-51e2-4701-8da8-04351c872236</api_key><api_secret>171e8465-f548-401d-b63b-caf0dc28df5f</api_secret>' +
				'<face_uid>' + uid + '</face_uid></FaceRequestId>';

				$.ajax({
					crossDomain: true,
					url: 'http://www.betafaceapi.com/service.svc/GetFaceImage',
					type: 'post',
					contentType: 'application/xml',
					processData: false,
					data: msg,
					dataType: 'xml',
					success: function (data, textStatus, jqXHR) {
						var xmlDocRoot = $.parseXML(jqXHR.responseText);
						var xmlDoc = $(xmlDocRoot).children("BetafaceFaceImageResponse");
						var int_response = parseInt($(xmlDoc).children("int_response").text());
						var string_response = $(xmlDoc).children("string_response").text();


            			var TagInfo = parseXml(xmlDoc); //data
            			searchAllPar(TagInfo);
            		},

            		error: function (jqXHR, textStatus, errorThrown) {
            			console.info(textStatus);
            		}
            	});


			};

			function parseXml(xml) {
				var items = [];
				$(xml).find("TagInfo").each(function() {
					items.push({
						name: $(this).find("name").text(), 
						value: $(this).find("value").text()
					});
				});

				return items;
			};

			function searchAllPar(TagInfo) {

				for (var i = 0; i < TagInfo.length; i++) {

					switch (TagInfo[i].name) {
						case "age":
						age = TagInfo[i].value;
						break;
						case "gender":
						gender = TagInfo[i].value;
						break;
						case "glasses":
						glasses = TagInfo[i].value;
						break;
						case "race":
						race = TagInfo[i].value;
						break;
						case "color eyes":
						colorEyes = ("#" + TagInfo[i].value);
						break;
						case "color hair":
						colorHair = ("#" + TagInfo[i].value);
						break;
						case "color skin":
						colorSkin = ("#" + TagInfo[i].value);

						console.log(age, gender, glasses, race, colorEyes, colorHair, colorSkin);
						document.getElementById('age__value').innerHTML = age;

            			 $("#eyecolor").css("background-color", colorEyes);
            			 $("#haircolor").css("background-color", colorHair);
            			 $("#skincolor").css("background-color", colorSkin);

            			checkGender(gender);
            			checkGlasses(glasses);

            		}
            	}
            }; 

            function checkGender(gender) {
            	if (gender == "male") 
            	{
            		document.getElementById("woman").style.display="none";
            		document.getElementById("man").style.display="block";

            		$("circle.man__eyes--a").css("fill", colorEyes);
            		$("path.man__hair--a").css("fill", colorHair);
            		$("path.man__face--b").css("fill", colorSkin);
            	}

            	else if (gender == "female") 
            	{
            		document.getElementById("man").style.display="none";
            		document.getElementById("woman").style.display="block";

            		$("circle.woman__eyes--a").css("fill", colorEyes);
            		$("path.woman__hair--a").css("fill", colorHair);
            		$("path.woman__face--b").css("fill", colorSkin);
            	}
            };

            function checkGlasses(glasses) {
            	if (glasses == "no") {
            		document.getElementById("yes_glasses").style.display = "none";
            		document.getElementById("no_glasses").style.display = "block";
            	}

            	else if (glasses == "yes") {
            		document.getElementById("no_glasses").style.display = "none";
            		document.getElementById("yes_glasses").style.display = "block";
            	}
            };
