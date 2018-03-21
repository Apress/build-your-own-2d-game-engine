<?php

//$record=$_GET['energy'];

$username = "root";
$password = "bay123";
$hostname = "127.0.0.1"; 

//connection to the database
$dbhandle = mysqli_connect($hostname, $username, $password) 
  or die("Unable to connect to MySQL");
//echo "Connected to MySQL<br>";

$selected = mysqli_select_db($dbhandle,"score") 
  or die("Could not select examples");

$sql = "SELECT * FROM score ORDER BY num DESC";

//$result = mysqli_query($dbhandle,$sql);
$result = mysqli_query($dbhandle, $sql); 

// if ($result->num_rows > 4) {
//     // output data of each row
//     for ($x = 0; $x <= 4; $x++) {

//     	$response = array();
        
//         $row = $result->fetch_assoc();
        
//         $response[$x]['num'] = $row['num'];
//     }            
//         echo json_encode($response);

//         //$row = $result->fetch_assoc();
//         //echo $row . "<br>";
   
// }
if($result->num_rows >0){
   // while($row = $result->fetch_assoc()){
   //     echo $row["num"] . "<br>";
       
   // }
	    $response = array();
        $i = 0;
        while($row = $result->fetch_assoc())
        {
            $response[$i]['name'] = $row['name'];
            $response[$i]['num'] = $row['num'];
                 
            $i++;
        }
        
      echo json_encode($response);
      //$this->ajaxReturn($result,'JSON');
}
else {
    echo "0 results";
}

//fetch tha data from the database 
//while ($row = mysqli_fetch_array($result)) {
 //  echo "price:".$row{'price'}." year:".$row{'year'}."<br>";
//}
//close the connection
mysqli_close($dbhandle);
//echo $record;
?>
