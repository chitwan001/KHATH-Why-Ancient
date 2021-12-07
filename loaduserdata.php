<?php
    session_start();
    error_reporting(0);
    if(isset($_COOKIE['scookuid'])){
        $sessval = $_SESSION['ssessuid'];
        $host = 'localhost';
        $user = 'root';
        $dbpass = '';
        $db = 'sandesh';
        $conn = mysqli_connect($host,$user,$dbpass,$db);
        $getname = "SELECT first_name , last_name , ppic FROM users WHERE id='$sessval'";
        $resgetname = mysqli_query($conn,$getname);
        while($each = $resgetname->fetch_assoc()){
            $dataarr = array(
                'fname' => $each['first_name'],
                'ppic' => $each['ppic'],
                'uid' => $sessval
            );
            echo json_encode($dataarr);
            // print_r($dataarr);
        }
    }
    else{
        echo "0";
    }
    mysqli_close($conn);
?>