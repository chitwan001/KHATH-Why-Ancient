<?php

    $host = "localhost";
    $user = "root";
    $pass = "";
    $conn = mysqli_connect($host,$user,$pass,"sampledb");
    $query="create table cricket
(run int , name varchar(10))";
 $queryres = mysqli_query($conn,$query);
if ($queryres){
    echo "successfull";
}
else {
    echo mysqli_error($conn);
}
// $insert = "Insert into cricket values (20, 'xyz')";
// $insertres = mysqli_query($conn,$insert);
// echo "<br>";
// if ($insertres){
//     echo "successfull";
// }
// else {
//     echo mysqli_error($conn);
// }
echo "<br>";
$select = "select * from cricket";
$selectres = mysqli_query($conn,$select);
echo "<table>";
while($each = $selectres->fetch_assoc()){
    echo "<tr>";
    echo "<td>".$each['run']."</td><td>".$each['name']."</td>";
    echo "</tr>";
}
echo "</table>"
?>