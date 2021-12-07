<?php

    error_reporting(0);
    session_start();
    $sessval = $_SESSION['ssessuid'];
        $host = 'localhost';
        $user = 'root';
        $dbpass = '';
        $db = 'sandesh';
        $ind=0;
        $labels = [];
        $conn = mysqli_connect($host,$user,$dbpass,$db);
        $getlabel = "SELECT lid,lname,licon,lcolor FROM userlabels WHERE uid=$sessval";
        $getlabelres = mysqli_query($conn,$getlabel);
        while($each = $getlabelres->fetch_assoc()){
            $indlabel =[];
            $indlabel[0] = $each['lid'];
            $indlabel[1] = $each['lname'];
            $indlabel[2] = $each['licon'];
            $indlabel[3] = $each['lcolor'];
            $labels[$ind] = $indlabel;
            $ind++;
        }
        echo json_encode($labels);
        mysqli_close($conn);
?>