<?php
error_reporting(0);
session_start();
    $sub = $_POST['sub'];
    $cont = $_POST['cont'];
    $ccelems = $_POST['ccelem'];
    $bccelems = $_POST['bccelem'];
    $toelems = $_POST['toelem'];
    $sessval = $_SESSION['ssessuid'];
    
    $finalccelems = explode (",", $ccelems);
    $finalbccelems = explode (",", $bccelems);
    $finaltoelems = explode (",", $toelems);

    $host = 'localhost';
    $user = 'root';
    $dbpass = '';
    $db = 'sandesh';
    date_default_timezone_set('Asia/Kolkata');
    $currdate = date("Y-m-d H:i:sa");
    $copycurrdate = $currdate;
    $conn = mysqli_connect($host,$user,$dbpass,$db);
    $insertintoemails = "INSERT INTO `emails`(`ufrom`, `body`, `title`, `stime`) VALUES ($sessval,'$cont','$sub','$currdate')";
    mysqli_query($conn,$insertintoemails);
    
    $gettheid = "SELECT eid FROM emails WHERE ufrom=$sessval AND stime = '$copycurrdate'";
    $gettheidres = mysqli_query($conn,$gettheid);
    while($each = $gettheidres->fetch_assoc()){
        $emailid = $each['eid'];
    }
    for($i=0;$i<count($finaltoelems)-1;$i++){
        $insertintoemailrecepforto = "INSERT INTO emailreceivers VALUES($emailid,$finaltoelems[$i],NULL,NULL)";
        $insertintoemailprops = "INSERT INTO `emailprops` VALUES($emailid,$finaltoelems[$i],0,0,0,1,NULL,0,0)";
        mysqli_query($conn,$insertintoemailprops);
        mysqli_query($conn,$insertintoemailrecepforto);
    }
    for($j=0;$j<count($finalccelems)-1;$j++){
        $insertintoemailrecepforcc = "INSERT INTO emailreceivers VALUES($emailid,NULL,$finalccelems[$j],NULL)";
        $insertintoemailprops = "INSERT INTO `emailprops` VALUES($emailid,$finaltoelems[$j],0,0,0,1,NULL,0,0)";
        mysqli_query($conn,$insertintoemailprops);
        mysqli_query($conn,$insertintoemailrecepforcc);
    }
    for($k=0;$k<count($finalbccelems)-1;$k++){
        $insertintoemailrecepforbcc = "INSERT INTO emailreceivers VALUES($emailid,NULL,NULL,$finaltoelems[$k])";
        $insertintoemailprops = "INSERT INTO `emailprops` VALUES($emailid,$finaltoelems[$k],0,0,0,1,NULL,0,0)";
        mysqli_query($conn,$insertintoemailprops);
        mysqli_query($conn,$insertintoemailrecepforbcc);
    }
        echo "1";
    mysqli_close($conn);
?>