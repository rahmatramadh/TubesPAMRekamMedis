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
    function getall()
    {
        global $koneksi;
        $id_pasien = $_GET['id_pasien'];
        $query = "SELECT * FROM rekam_medis WHERE id_pasien = $id_pasien";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_rekmed' => $result['id_rekmed'],
                'tensi' => $result['tensi'],
                'nadi' => $result['nadi'],
                'nafas' => $result['nafas'],
                'suhu' => $result['suhu'],
                'berat_badan' => $result['berat_badan'],
                'tinggi_badan' => $result['tinggi_badan'],
                'bmi' => $result['bmi'],
                'diagnosis' => $result['diagnosis'],
                'tindakan' => $result['tindakan'],
                'id_pasien' => $result['id_pasien'],
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data['data']['result']);
    }
    function create()
    {
        global $koneksi;
        $tensi = $_POST['tensi'];
        $nadi = $_POST['nadi'];
        $nafas = $_POST['nafas'];
        $suhu = $_POST['suhu'];
        $berat_badan = $_POST['berat_badan'];
        $tinggi_badan = $_POST['tinggi_badan'];
        $bmi = $_POST['bmi'];
        $diagnosis = $_POST['diagnosis'];
        $tindakan = $_POST['tindakan'];
        $id_pasien = $_POST['id_pasien'];
        $hasil = "Gagal memasukkan data";
        if ($tensi and $nadi and $nafas and $suhu and $berat_badan and $tinggi_badan and $bmi and $diagnosis and $tindakan and $id_pasien) {
            $query = "INSERT INTO rekam_medis (tensi, nadi, nafas, suhu, berat_badan, tinggi_badan, bmi, diagnosis, tindakan, id_pasien) VALUES ('$tensi', '$nadi', '$nafas', '$suhu', $berat_badan, $tinggi_badan, $bmi, '$diagnosis', '$tindakan', $id_pasien)";
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
        $id_rekmed = $_GET['id_rekmed'];
        $query = "SELECT * FROM rekam_medis WHERE id_rekmed = $id_rekmed";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_rekmed' => $result['id_rekmed'],
                'no_bag_rekmed' => $result['no_bag_rekmed'],
                'tensi' => $result['tensi'],
                'nadi' => $result['nadi'],
                'nafas' => $result['nafas'],
                'suhu' => $result['suhu'],
                'berat_badan' => $result['berat_badan'],
                'tinggi_badan' => $result['tinggi_badan'],
                'bmi' => $result['bmi'],
                'diagnosis' => $result['diagnosis'],
                'tindakan' => $result['tindakan'],
                'id_pasien' => $result['id_pasien'],
                'id_obat' => $result['id_obat']
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data['data']['result']);
    }

    function update()
    {
        global $koneksi;
        $id_rekmed = $_GET['id_rekmed'];
        $tensi = $_POST['tensi'];
        $nadi = $_POST['nadi'];
        $nafas = $_POST['nafas'];
        $suhu = $_POST['suhu'];
        $berat_badan = $_POST['berat_badan'];
        $tinggi_badan = $_POST['tinggi_badan'];
        $bmi = $_POST['bmi'];
        $diagnosis = $_POST['diagnosis'];
        $tindakan = $_POST['tindakan'];
        $id_pasien = $_POST['id_pasien'];
        $hasil = "Gagal dimasukkan data";
        if ($tensi) {
            $set[] = "tensi='$tensi'";
        }
        if ($nadi) {
            $set[] = "nadi='$nadi'";
        }
        if ($nafas) {
            $set[] = "nafas='$nafas'";
        }
        if ($suhu) {
            $set[] = "suhu='$suhu'";
        }
        if ($berat_badan) {
            $set[] = "berat_badan=$berat_badan";
        }
        if ($tinggi_badan) {
            $set[] = "tinggi_badan=$tinggi_badan";
        }
        if ($bmi) {
            $set[] = "bmi=$bmi";
        }
        if ($diagnosis) {
            $set[] = "diagnosis='$diagnosis'";
        }
        if ($tindakan) {
            $set[] = "tindakan='$tindakan'";
        }
        $hasil = "Gagal melakukan update data";
        if ($no_bag_rekmed or $tensi or $nadi or $nafas or $suhu or $berat_badan or $tinggi_badan or $bmi or $diagnosis or $tindakan or $id_obat) {
            $query = "UPDATE rekam_medis SET " . implode(",",
            $set) . " WHERE id_rekmed = $id_rekmed";
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
    $id_pasien = $_GET['id_rekmed'];
    $query = "DELETE FROM rekam_medis WHERE id_rekmed = $id_pasien";
    $q1 = pg_query($koneksi, $query);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data['data']['result']);
}
