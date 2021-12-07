<?php

    error_reporting(0);
    session_start();
    if(isset($_COOKIE['scookuid'])){
        if(!isset($_SESSION['ssessuid'])){
            $host = 'localhost';
            $user = 'root';
            $dbpass = '';
            $db = 'sandesh';
            $cokieval = $_COOKIE['scookuid'];
            $conn = mysqli_connect($host,$user,$dbpass,$db);
            $setsess = "SELECT id FROM users WHERE loginhash='$cokieval'";
            $setsessres = mysqli_query($conn,$setsess);
            while($eachres = $setsessres->fetch_assoc()){
                $id = $eachres['id'];
                $_SESSION['ssessuid'] = $id;
            }
            mysqli_close($conn);
        }
        echo "1";
    }

?>