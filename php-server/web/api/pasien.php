<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Methods: *");
?>
<?php
    include 'dbconfig.php';

    //parameter
    $op = $_GET['op'];
    switch ($op) {
        case '': getall(); break;
        case 'create': create(); break;
        case 'detail': detail(); break;
        case 'update': update(); break;
        case 'delete': delete(); break;
        default:
    }
    // function getall()
    // {
    //     global $koneksi;
    //     $query = "SELECT * FROM pasien";
    //     $q1 = pg_query($koneksi, $query);
    //     while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
    //         $hasil[] = array(
    //             'id_pasien' => $result['id_pasien'],
    //             'nama' => $result['nama'],
    //             'usia' => $result['usia'],
    //             'kelamin' => $result['kelamin'],
    //             'alamat' => $result['alamat'],
    //             'no_telp' => $result['no_telp']
    //         );
    //     }
    //     $data['data']['result'] = $hasil;
    //     echo json_encode($data['data']['result']);
    // }
    function getall()
    {
        global $koneksi;
        $username = $_GET['username'];
        $query = "SELECT * FROM pasien WHERE id_dokter = '$username'";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_pasien' => $result['id_pasien'],
                'nama' => $result['nama'],
                'usia' => $result['usia'],
                'kelamin' => $result['kelamin'],
                'alamat' => $result['alamat'],
                'no_telp' => $result['no_telp']
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data['data']['result']);
    }
    // function create()
    // {
    //     global $koneksi;
    //     $nama = $_POST['nama'];
    //     $usia = $_POST['usia'];
    //     $kelamin = $_POST['kelamin'];
    //     $alamat = $_POST['alamat'];
    //     $no_telp = $_POST['no_telp'];
    //     $hasil = "Gagal dimasukkan data";
    //     if ($nama and $usia and $kelamin and $alamat and $no_telp) {
    //         $query = "INSERT INTO pasien (nama, usia, kelamin, alamat, no_telp) VALUES ('$nama',$usia,'$kelamin', '$alamat', '$no_telp')";
    //         $q1 = pg_query($koneksi, $query);
    //         if ($q1) {
    //             $hasil = "Berhasil menambahkan data";
    //         }
    //     }
    //     $data['data']['result'] = $hasil;
    //     echo json_encode($data['data']['result']);
    // }

    function create()
    {
        global $koneksi;
        $username = $_GET['username'];
        $nama = $_POST['nama'];
        $usia = $_POST['usia'];
        $kelamin = $_POST['kelamin'];
        $alamat = $_POST['alamat'];
        $no_telp = $_POST['no_telp'];
        $hasil = "Gagal dimasukkan data";
        if ($nama and $usia and $kelamin and $alamat and $no_telp and $username) {
            $query = "INSERT INTO pasien (nama, usia, kelamin, alamat, no_telp, id_dokter) VALUES ('$nama',$usia,'$kelamin', '$alamat', '$no_telp', '$username')";
            $q1 = pg_query($koneksi, $query);
            if ($q1) {
                $hasil = "Berhasil menambahkan data";
            }
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data['data']['result']);
    }

    function detail()
    {
        global $koneksi;
        $id_pasien = $_GET['id_pasien'];
        $query = "SELECT * FROM pasien WHERE id_pasien = $id_pasien";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_pasien' => $result['id_pasien'],
                'nama' => $result['nama'],
                'usia' => $result['usia'],
                'kelamin' => $result['kelamin'],
                'alamat' => $result['alamat'],
                'no_telp' => $result['no_telp']
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data['data']['result']);
    }

    function update()
    {
        global $koneksi;
        $id_pasien = $_GET['id_pasien'];
        $nama = $_POST['nama'];
        $usia = $_POST['usia'];
        $kelamin = $_POST['kelamin'];
        $alamat = $_POST['alamat'];
        $no_telp = $_POST['no_telp'];
        if ($nama) {
            $set[] = "nama='$nama'";
        }
        if ($usia) {
            $set[] = "usia=$usia";
        }
        if ($kelamin) {
            $set[] = "kelamin='$kelamin'";
        }
        if ($alamat) {
            $set[] = "alamat='$alamat'";
        }
        if ($no_telp) {
            $set[] = "no_telp='$no_telp'";
        }
        $hasil = "Gagal melakukan update data";
        if ($nama or $usia or $kelamin or $alamat or $no_telp) {
            $query = "UPDATE pasien SET " . implode(",",
            $set) . " WHERE id_pasien = $id_pasien";
            $q1 = pg_query($koneksi, $query);
            if ($q1) {
                $hasil = "Data berhasil diupdate";
            }
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data['data']['result']);
    }

function delete()
{
    global $koneksi;
    $id_pasien = $_GET['id_pasien'];
    $query = "DELETE FROM pasien WHERE id_pasien = $id_pasien";
    $q1 = pg_query($koneksi, $query);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data['data']['result']);
}
