<?php

error_reporting(0);
session_start();
$functiontype = $_POST['func'];
$idgivenarray =$_POST['ids'];
$idarrays= explode(',',$idgivenarray);
$idlist ="(";
for($i=0;$i<(count($idarrays)-1);$i++){
    $idlist .=($idarrays[$i]);
    if($i+1!=count($idarrays)-1){
        $idlist .= ",";
    }
}
$idlist = $idlist.")";
$host = 'localhost';
$user = 'root';
$dbpass = '';
$db = 'sandesh';
$conn = mysqli_connect($host,$user,$dbpass,$db);
$query = "UPDATE `emailprops` SET `archive`= 1,`ininbox`=0 WHERE eid IN $idlist";
    $queryres = mysqli_query($conn,$query);
    // mysqli_error($conn);
?>