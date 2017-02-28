<?php
 
//Sample Database Connection Script 
/*
$hostname="freefoodrit.cmluds6z4umz.us-west-2.rds.amazonaws.com:3306";
$username="root";
$password="password";
*/
$hostname='localhost';
$username='root_user';
$password='anusha';
$dbname='FreeFoodRIT';
$t1 = 'Event';
$t2 = 'Location';
$t3='FoodType';
$yourfield = 'name';
//Connect to the database
$connection = mysql_connect($hostname, $username, $password);
mysql_select_db($dbname, $connection);
 
$query = "select Location.lattitude as lat, Location.longitude as lng, Location.name as loc, FoodType.name as type, Event.starttime, Event.endTime, Event.description from Event INNER JOIN FoodType INNER JOIN Location where Event.foodtypeID = FoodType.ID and Event.locID = Location.ID;";

$result = mysql_query($query);
$foodTypes = array();
if($result)
{
  while($row = mysql_fetch_array($result))
  {
	$foodObj = array(
	"foodType" => $row['type'], 
 	"lat" => $row['lat'],
 	"lng" => $row['lng'],
	"loc" => $row['loc'],
	"timeStart" => $row['starttime'],
	"timeEnd" => $row['endTime'],
	"desc" => $row['description']
		);
    array_push($foodTypes, $foodObj);
}

$query_types = "select * from FoodType";
$result_types = mysql_query($query_types);
$types = array();
if($result_types)
{
  while($row = mysql_fetch_array($result_types))
  {
	$foodTypeObj = array(
	"ID" => $row['ID'],
	"name"   => $row['name']
	);
	array_push($types, $foodTypeObj);
  }
} 

$query_loc = "select * from Location";
$result_loc = mysql_query($query_loc);
$locs = array();
if($result_loc)
{
  while($row = mysql_fetch_array($result_loc))
  {
	$locObj = array(
	"ID" => $row['ID'],
	"name"   => $row['name']
	);
	array_push($locs, $locObj);
  }
} 

$data = array();
$data['event'] = $foodTypes;
$data['food'] = $types;
$data['loc'] = $locs;
echo json_encode($data);
}
 
?>

