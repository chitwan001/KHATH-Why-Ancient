<?php

    error_reporting(0);
    session_start();
    $sessval = $_SESSION['ssessuid'];
    $lname = $_POST['lname'];
    $lcolor = $_POST['lcolor'];
    $licon = $_POST['licon'];
    $host = 'localhost';
    $user = 'root';
    $dbpass = '';
    $db = 'sandesh';
    $conn = mysqli_connect($host,$user,$dbpass,$db);
    $addlabelquery = "INSERT INTO userlabels(`lname`, `licon`, `lcolor`, `uid`) VALUES('$lname','$licon','$lcolor',$sessval)";
    $addlabelqueryres = mysqli_query($conn,$addlabelquery);
    if($addlabelqueryres){
        echo "1";
    }
?>  