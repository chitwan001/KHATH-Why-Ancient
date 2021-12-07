<?php
    
    // error_reporting(0);
    session_start();
    $sessval = $_SESSION['ssessuid'];
    $lid = $_POST['labelid'];
    $host = 'localhost';
    $user = 'root';
    $dbpass = '';
    $db = 'sandesh';
    $conn = mysqli_connect($host,$user,$dbpass,$db);
    date_default_timezone_set('Asia/Kolkata');
    $emails =[];
    $count=0;
    if($lid==0){
        $forto = "SELECT * FROM emails e, emailprops ep,emailreceivers er WHERE e.eid=ep.eid AND e.eid=er.eid AND er.uto=$sessval AND ep.ininbox = 1 AND ep.bin = 0 ORDER BY e.stime DESC";
        $fortores = mysqli_query($conn,$forto);
        while($each = $fortores->fetch_assoc()){
            $fromid = $each['ufrom'];
            $getpropic = "SELECT ppic,first_name,last_name FROM users WHERE id= $fromid";
            $getpropicres = mysqli_query($conn,$getpropic);
            $indemail = array("eid"=>$each['eid'],"uform"=>$each['ufrom'],"body"=>$each['body'],"title"=>$each['title'],"time"=>$each['stime'],
            "eread"=>$each['eread'],"fav"=>$each['fav'],"type"=>'to');
            while($eachpropic = $getpropicres->fetch_assoc()){
                if($eachpropic['ppic']==NULL){
                    $indemail['ppicsender'] = 'def';
                }
                else{
                    $indemail['ppicsender'] = $eachpropic['ppic'];
                }
                $indemail['senderfname'] = $eachpropic['first_name'];
                $indemail['senderlname'] = $eachpropic['last_name'];
            }
            $emails[$count] = $indemail;
            $count++;
        }
        $forcc = "SELECT * FROM emails e, emailprops ep,emailreceivers er WHERE e.eid=ep.eid AND e.eid=er.eid AND er.cc=$sessval AND ep.ininbox = 1 AND ep.bin = 0 ORDER BY e.stime DESC";
        $forccres = mysqli_query($conn,$forcc);
        while($each = $forccres->fetch_assoc()){
            $fromid = $each['ufrom'];
            $getpropic = "SELECT ppic,first_name,last_name FROM users WHERE id= $fromid";
            $getpropicres = mysqli_query($conn,$getpropic);
            $indemail = array("eid"=>$each['eid'],"uform"=>$each['ufrom'],"body"=>$each['body'],"title"=>$each['title'],"time"=>$each['stime'],
            "eread"=>$each['eread'],"fav"=>$each['fav'],"type"=>'cc');
            while($eachpropic = $getpropicres->fetch_assoc()){
                if($eachpropic['ppic']==NULL){
                    $indemail['ppicsender'] = 'def';
                }
                else{
                    $indemail['ppicsender'] = $eachpropic['ppic'];
                }
                $indemail['senderfname'] = $eachpropic['first_name'];
                $indemail['senderlname'] = $eachpropic['last_name'];
            }
            $emails[$count] = $indemail;
            $count++;
        }
        $forbcc = "SELECT * FROM emails e, emailprops ep,emailreceivers er WHERE e.eid=ep.eid AND e.eid=er.eid AND er.bcc=$sessval AND ep.ininbox = 1 AND ep.bin = 0 ORDER BY e.stime DESC";
        $forbccres = mysqli_query($conn,$forbcc);
        while($each = $forbccres->fetch_assoc()){
            $fromid = $each['ufrom'];
            $getpropic = "SELECT ppic,first_name,last_name FROM users WHERE id= $fromid";
            $getpropicres = mysqli_query($conn,$getpropic);
            $indemail = array("eid"=>$each['eid'],"uform"=>$each['ufrom'],"body"=>$each['body'],"title"=>$each['title'],"time"=>$each['stime'],
            "eread"=>$each['eread'],"fav"=>$each['fav'],"type"=>'bcc');
            while($eachpropic = $getpropicres->fetch_assoc()){
                if($eachpropic['ppic']==NULL){
                    $indemail['ppicsender'] = 'def';
                }
                else{
                    $indemail['ppicsender'] = $eachpropic['ppic'];
                }
                $indemail['senderfname'] = $eachpropic['first_name'];
                $indemail['senderlname'] = $eachpropic['last_name'];
            }
            $emails[$count] = $indemail;
            $count++;
        }
        echo json_encode($emails);
    }
    else{
        $forto = "SELECT * FROM emails e, emailprops ep,emailreceivers er WHERE e.eid=ep.eid AND e.eid=er.eid AND er.uto=$sessval AND ep.underlabel = $lid ORDER BY e.stime DESC";
        $fortores = mysqli_query($conn,$forto);
        while($each = $fortores->fetch_assoc()){
            $fromid = $each['ufrom'];
            $getpropic = "SELECT ppic,first_name,last_name FROM users WHERE id= $fromid";
            $getpropicres = mysqli_query($conn,$getpropic);
            $indemail = array("eid"=>$each['eid'],"uform"=>$each['ufrom'],"body"=>$each['body'],"title"=>$each['title'],"time"=>$each['stime'],
            "eread"=>$each['eread'],"fav"=>$each['fav'],"type"=>'to');
            while($eachpropic = $getpropicres->fetch_assoc()){
                if($eachpropic['ppic']==NULL){
                    $indemail['ppicsender'] = 'def';
                }
                else{
                    $indemail['ppicsender'] = $eachpropic['ppic'];
                }
                $indemail['senderfname'] = $eachpropic['first_name'];
                $indemail['senderlname'] = $eachpropic['last_name'];
            }
            $emails[$count] = $indemail;
            $count++;
        }
        $forcc = "SELECT * FROM emails e, emailprops ep,emailreceivers er WHERE e.eid=ep.eid AND e.eid=er.eid AND er.cc=$sessval AND ep.underlabel = $lid ORDER BY e.stime DESC";
        $forccres = mysqli_query($conn,$forcc);
        while($each = $forccres->fetch_assoc()){
            $fromid = $each['ufrom'];
            $getpropic = "SELECT ppic,first_name,last_name FROM users WHERE id= $fromid";
            $getpropicres = mysqli_query($conn,$getpropic);
            $indemail = array("eid"=>$each['eid'],"uform"=>$each['ufrom'],"body"=>$each['body'],"title"=>$each['title'],"time"=>$each['stime'],
            "eread"=>$each['eread'],"fav"=>$each['fav'],"type"=>'cc');
            while($eachpropic = $getpropicres->fetch_assoc()){
                if($eachpropic['ppic']==NULL){
                    $indemail['ppicsender'] = 'def';
                }
                else{
                    $indemail['ppicsender'] = $eachpropic['ppic'];
                }
                $indemail['senderfname'] = $eachpropic['first_name'];
                $indemail['senderlname'] = $eachpropic['last_name'];
            }
            $emails[$count] = $indemail;
            $count++;
        }
        $forbcc = "SELECT * FROM emails e, emailprops ep,emailreceivers er WHERE e.eid=ep.eid AND e.eid=er.eid AND er.bcc=$sessval AND ep.underlabel = $lid ORDER BY e.stime DESC";
        $forbccres = mysqli_query($conn,$forbcc);
        while($each = $forbccres->fetch_assoc()){
            $fromid = $each['ufrom'];
            $getpropic = "SELECT ppic,first_name,last_name FROM users WHERE id= $fromid";
            $getpropicres = mysqli_query($conn,$getpropic);
            $indemail = array("eid"=>$each['eid'],"uform"=>$each['ufrom'],"body"=>$each['body'],"title"=>$each['title'],"time"=>$each['stime'],
            "eread"=>$each['eread'],"fav"=>$each['fav'],"type"=>'bcc');
            while($eachpropic = $getpropicres->fetch_assoc()){
                if($eachpropic['ppic']==NULL){
                    $indemail['ppicsender'] = 'def';
                }
                else{
                    $indemail['ppicsender'] = $eachpropic['ppic'];
                }
                $indemail['senderfname'] = $eachpropic['first_name'];
                $indemail['senderlname'] = $eachpropic['last_name'];
            }
            $emails[$count] = $indemail;
            $count++;
        }
        echo json_encode($emails);
    }
?>