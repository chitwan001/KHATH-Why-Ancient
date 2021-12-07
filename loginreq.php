<?php
    session_start();
    error_reporting(0);
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $host = 'localhost';
    $user = 'root';
    $dbpass = '';
    $db = 'sandesh';
    $conn = mysqli_connect($host,$user,$dbpass,$db);
    $finduser = "SELECT id,pass FROM users WHERE email='$email'";
    $findres = mysqli_query($conn,$finduser);
    $resrow = mysqli_num_rows($findres);
    if($resrow>0){
        while($each = $findres->fetch_assoc()){
            $dechash = password_verify($pass,$each['pass']);
            if($dechash){
                $id = $each['id'];
            $bytes = openssl_random_pseudo_bytes(15,$cstrong);
             $hex   = bin2hex($bytes);
             $cookieid = $hex.$id;
             $updhash = "UPDATE `users` SET `loginhash`='$cookieid' WHERE id='$id'";
            $resupdhash = mysqli_query($conn,$updhash);
            setcookie('scookuid',$cookieid,time()+60*60*24*90,"/");
            $_SESSION['ssessuid'] = $id;
            echo "1";
            }
            else{
                echo "Passnotmatch";
            }
        }
    }
    else{
        echo "wrongmail";
    }
    mysqli_close($conn);
?>