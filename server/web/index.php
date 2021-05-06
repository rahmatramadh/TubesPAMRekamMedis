<html>
    <p>This is index page</p>
    <?php
        include 'dbconfig.php';
        
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
    ?>
</html>
