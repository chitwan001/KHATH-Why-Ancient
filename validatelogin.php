<?php
    session_start();
    error_reporting(0);
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
        $hashval = $_COOKIE['scookuid'];
        $host = 'localhost';
        $user = 'root';
        $dbpass = '';
        $db = 'sandesh';
        $conn = mysqli_connect($host,$user,$dbpass,$db);
        $checkhash = "SELECT id FROM users WHERE loginhash='$hashval'";
        $rescheckhash = mysqli_query($conn,$checkhash);
        if(mysqli_num_rows($rescheckhash)>0){
            echo "1";
        }
        else{
            setcookie('scookuid',null,time()-3600);
            session_unset();
            session_destroy();
            echo "0";
        }
    }
    else{
        echo "0";
    }
    mysqli_close($conn);
?>