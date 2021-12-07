<?php
    error_reporting(0);
    session_start();
    $host = 'localhost';
    $user = 'root';
    $dbpass = '';
    $db = 'sandesh';
    $conn = mysqli_connect($host,$user,$dbpass,$db);
    $sessval = $_SESSION['ssessuid'];
    $logoutquery = "UPDATE `users` SET `loginhash`= NULL WHERE id = $sessval";
    mysqli_query($conn,$logoutquery);
    if(isset($_COOKIE['scookuid'])){
        unset($_COOKIE['scookuid']);
        setcookie('scookuid',null,-1,'/');
    }
    if(isset($_SESSION['ssessuid'])){
        session_unset();
        session_destroy();
    }
    echo "0";
?>