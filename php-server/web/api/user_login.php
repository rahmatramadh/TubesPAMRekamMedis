<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Methods: *");
?>
<?php
    include "dbconfig.php";

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT * FROM user_app WHERE username='$username' AND password='$password'";

    $check = pg_fetch_row(pg_query($koneksi, $query));
    
    if($check != NULL){
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
    pg_close($con);
?>
