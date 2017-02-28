<?php
 
echo "hi hello";
//Sample Database Connection Script 
/*
$hostname="freefoodrit.cmluds6z4umz.us-west-2.rds.amazonaws.com:3306";
$username="root";
$password="password";
*/

$hostname='localhost';
$username='root_admin';
$password='anusha';
$dbname='FreeFoodRIT';
$t1 = 'Event';
$t2 = 'Location';
$t3='FoodType';
$yourfield = 'name';
//Connect to the database
$connection = mysql_connect($hostname, $username, $password);
mysql_select_db($dbname, $connection);

$foodObject = json_decode($_POST['data']);
$loc = $foodObject->{'loc'};
$typ = $foodObject->{'foodType'};
$timeStart = $foodObject->{'timeStart'};
$timeEnd = $foodObject->{'timeEnd'};
$detail = $foodObject->{'desc'};
 
$query = "insert into Event (locID, foodtypeID, starttime, endtime, description) values ($loc,$typ,'$timeStart', '$timeEnd','$detail');";


$result = mysql_query($query);
echo $result;
echo $typ;
if($result) {
	echo "inserted successfully";
}

?>

