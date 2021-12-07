<?php

    $sender = $_POST['senders'];
    $host = 'localhost';
    $user = 'root';
    $dbpass = '';
    $db = 'sandesh';
    $conn = mysqli_connect($host,$user,$dbpass,$db);
    $getsenders = "SELECT id,ppic,first_name,last_name,email FROM users WHERE first_name LIKE '%$sender%' OR last_name LIKE '%$sender%' OR email LIKE '%$sender%'";
    $getsendersquery = mysqli_query($conn,$getsenders);
    $allsenders = [];
    $count = 0;
    while($each = $getsendersquery->fetch_assoc()){
        $eachsender = array("id" => $each['id'],"ppic" => $each['ppic'] , "firstname" => $each['first_name'], "lastname" => $each['last_name'] , "email" => $each['email']);
        $allsenders[$count] =$eachsender;
        $count++;
    }
    echo json_encode($allsenders);
?>