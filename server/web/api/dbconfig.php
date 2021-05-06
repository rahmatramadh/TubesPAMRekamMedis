<?php
    $host = "ec2-34-206-8-52.compute-1.amazonaws.com";
    $user = "tasaqdowefuwqz";
    $pass = "0880c5e0e34439f6500266905ef8ceecaeaf95702e0006e8c38a290e02800dec";
    $db   = "d633dn2j0s451h";

    function pg_connection_string_from_database_url() {
        extract(parse_url($_ENV["DATABASE_URL"]));
        return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
    }

    $koneksi = pg_connect(pg_connection_string_from_database_url());
?>