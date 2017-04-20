<?php

function dbConnection() {
	//connection:
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "0894925";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);}
		else {
   // echo "connected to db";
		}

		return $conn;
	}

	function getUsers($conn) {
		$sql = "SELECT * FROM youtube_users";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
     	// output data of each row
			$array = [];

			while($row = $result->fetch_assoc()) {
				array_push($array, $row);
			}

			return $array;

		} else {
			echo "0 results";
		}

		$conn->close();
	}

?>