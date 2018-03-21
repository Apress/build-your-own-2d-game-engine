<?php

//$record=$_GET['gScore'];
$name = $_GET['name'];
$record = $_GET['gScore'];

$username = "root";
$password = "bay123";
$hostname = "127.0.0.1"; 

//connection to the database
$dbhandle = mysqli_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");
echo "Connected to MySQL<br>";

$selected = mysqli_select_db($dbhandle,"score") 
  or die("Could not select examples");

$sql = "INSERT INTO `score` (`name`,`num`) VALUES ('$name',$record)";

//$result = mysqli_query($dbhandle,$sql);

if (mysqli_query($dbhandle, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

//fetch tha data from the database 
//while ($row = mysqli_fetch_array($result)) {
 //  echo "price:".$row{'price'}." year:".$row{'year'}."<br>";
//}
//close the connection
mysqli_close($dbhandle);
//echo $record;
?>
