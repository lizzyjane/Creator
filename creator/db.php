<?php

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

$sql = "SELECT * FROM youtube_users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     // output data of each row
     while($row = $result->fetch_assoc()) {
         echo 
         "Name: ". $row["first_name"]." 
         Lastname: ". $row["last_name"]."
         gender: ". $row["gender"]."
         haircolor: ". $row["haircolor"]."
         eyecolor: ". $row["eyecolor"]." 
         skincolor: ". $row["skincolor"]."
         https://www.youtube.com/user/". $row["yt_username"]."
         "; 
     }
} else {
     echo "0 results";
}

$conn->close();

?>