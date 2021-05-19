<?php
 header("Access-Control-Allow-Origin: *");
?>
<html>
    <p>This is index page</p>
    <?php
        include 'dbconfig.php';

        function pg_connection_string_from_database_url() {
            extract(parse_url($_ENV["DATABASE_URL"]));
            return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
        }
    
        $koneksi = pg_connect(pg_connection_string_from_database_url());

        # Now let's use the connection for something silly just to prove it works:
        $result = pg_query($koneksi, "SELECT relname FROM pg_stat_user_tables WHERE schemaname='public'");
    
        print "<pre>\n";
        if (!pg_num_rows($result)) {
          print("Your connection is working, but your database is empty.\nFret not. This is expected for new apps.\n");
        } else {
          print "Tables in your database:\n";
          while ($row = pg_fetch_row($result)) { print("- $row[0]\n"); }
        }
        print "\n";

        print(
            "How to use API? \n
https://tubes-rekam-medis.herokuapp.com/api/TABLE_NAME.php/?op=OPERATOR \n
Operator: 
1. ''
2. 'create'
3. 'detail'
4. 'update'
5. 'delete'
"
        )
    ?>
</html>
