<?php

error_reporting(0);
session_start();

$userid = $_SESSION['ssessuid'];
$host = 'localhost';
$user = 'root';
$dbpass = '';
$db = 'sandesh';
$conn = mysqli_connect($host,$user,$dbpass,$db);
$getnotification = "SELECT n.fromuser,n.content,n.eid,n.timesent FROM notifications n WHERE n.touser = $userid ORDER BY timesent";
$getnotificationres = mysqli_query($conn,$getnotification);
$allnoti = [];
$count = 0;
while($each = $getnotificationres->fetch_assoc()){
    $indnoti = array("fromuser"=>$each['fromuser'] , "content"=>$each['content'], "eid"=>$each['eid'], "timesent"=>$each['timesent'], "fname"=>$each['first_name'], "lname"=>$each['last_name'] );
    $allnoti[$count] = $indnoti;
    $count++;
}
echo json_encode($allnoti);
?>