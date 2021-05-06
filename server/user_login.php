<?php
    include "dbconfig.php";
    $koneksi = mysqli_connect($host, $user, $pass, $db);

    $username = $_GET['username'];
    $password = $_GET['password'];

    $query = "SELECT * FROM user WHERE username='$username' AND password='$password'";

    $check = mysqli_fetch_array(mysqli_query($koneksi, $query));

    if(isset($check)){
        $SuccessLoginMsg = 'Data Matched';
 
        // Converting the message into JSON format.
       $SuccessLoginJson = json_encode($SuccessLoginMsg);
        
       // Echo the message.
        echo $SuccessLoginJson ; 
        
    }
    else{
        
        // If the record inserted successfully then show the message.
       $InvalidMSG = 'Invalid Username or Password Please Try Again' ;
        
       // Converting the message into JSON format.
       $InvalidMSGJSon = json_encode($InvalidMSG);
        
       // Echo the message.
        echo $InvalidMSGJSon;   
    }    
    mysqli_close($con);
?>