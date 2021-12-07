<?php
error_reporting(0);
session_start();
$userid = $_SESSION['ssessuid'];
$host = 'localhost';
$user = 'root';
$dbpass = '';
$db = 'sandesh';
$conn = mysqli_connect($host,$user,$dbpass,$db);
$emails =[];
$count=0;
$query = "SELECT * FROM emails e, emailprops ep,emailreceivers er WHERE e.eid=ep.eid AND e.eid=er.eid AND er.uto=$userid AND ep.fav=1 ORDER BY e.stime DESC";
$queryres = mysqli_query($conn,$query);
while($each = $queryres->fetch_assoc()){
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
echo json_encode($emails);
mysqli_error($conn);
?>