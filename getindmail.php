<?php

    $eid = $_POST['eid'];
    $host = 'localhost';
    $user = 'root';
    $dbpass = '';
    $db = 'sandesh';
    date_default_timezone_set('Asia/Kolkata');
    $conn = mysqli_connect($host,$user,$dbpass,$db);
    $getthemail = "SELECT u.first_name,u.last_name,u.email,u.ppic,e.eid,e.body,e.title,e.stime,ep.underlabel FROM emailprops ep, emails e,users u WHERE e.eid = $eid AND e.ufrom=u.id AND ep.eid=e.eid";
    $getthemailres = mysqli_query($conn,$getthemail);
    while($each = $getthemailres->fetch_assoc()){
        $label = $each['underlabel'];
        if($label == NULL){
            $each['underlabel'] = "Inbox";
        }
        else{
            $getlabelname = "SELECT lname FROM userlabels WHERE lid=$label";
            $getlabelres = mysqli_query($conn,$getlabelname);
            while($eachlabel = $getlabelres->fetch_assoc()){
                $each['underlabel'] = $eachlabel['lname'];
            }
        }
        echo json_encode($each);
    }
?>  