<?php
error_reporting(0);
session_start();
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$pass = $_POST['pass'];
$phone = $_POST['phone'];
$recemail = $_POST['recemail'];
$dob = $_POST['dob'];
$host = 'localhost';
$user = 'root';
$dbpass = '';
$db = 'sandesh';
$conn = mysqli_connect($host,$user,$dbpass,$db);
$checkemail  ="SELECT id FROM users WHERE email='$email'";
$checkemailres = mysqli_query($conn,$checkemail);
$valid = mysqli_num_rows($checkemailres);
if($valid>0){
    echo 'mailexist';
}
else{
    $hashedpass = password_hash($pass,PASSWORD_DEFAULT);
    $insertuser = "INSERT INTO `users`(`first_name`, `last_name`, `dob`, `email`, `pass`, `phno`,`rec_email`) VALUES ('$fname','$lname','$dob','$email','$hashedpass','$phone','$recemail')";
    $insertuserres = mysqli_query($conn,$insertuser);
    $getid = "SELECT id FROM users WHERE email = '$email'";
    $getidres = mysqli_query($conn,$getid);
    while($each = $getidres->fetch_assoc()){
        $id = $each['id'];
    }
   $bytes = openssl_random_pseudo_bytes(15,$cstrong);
    $hex   = bin2hex($bytes);
     $cookieid = $hex.$id;
     $updhash = "UPDATE `users` SET `loginhash`='$cookieid' WHERE id='$id'";
    $resupdhash = mysqli_query($conn,$updhash);
    setcookie('scookuid',$cookieid,time()+60*60*24*90,"/");
    $_SESSION['ssessuid'] = $id;
    echo "1";
}
mysqli_close($conn);
?>