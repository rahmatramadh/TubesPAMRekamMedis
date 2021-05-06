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
        $id = $_GET['id_rekmed'];
        $query = "SELECT * FROM obat WHERE id_obat = (SELECT id_obat FROM rekam_medis WHERE id_rekmed = $id)";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_obat' => $result['id_obat'],
                'nama' => $result['nama'],
                'jumlah' => $result['jumlah'],
                'signa' => $result['signa']
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data);
    }
    function create()
    {
        global $koneksi;
        $id_obat = $_POST['id_obat'];
        $nama = $_POST['nama'];
        $jumlah = $_POST['jumlah'];
        $signa = $_POST['signa'];
        $hasil = "Gagal dimasukkan data";
        if ($id_obat and $nama and $jumlah and $signa) {
            $query = "INSERT INTO obat (id_obat, nama, jumlah, signa) VALUES ($id_obat,'$nama',$jumlah,'$signa')";
            $q1 = pg_query($koneksi, $query);
            if ($q1) {
                $hasil = "Berhasil menambahkan data";
            }
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data);
    }

    function detail()
    {
        global $koneksi;
        $id_obat = $_GET['id_obat'];
        $query = "SELECT * FROM obat WHERE id_obat = $id_obat";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_obat' => $result['id_obat'],
                'nama' => $result['nama'],
                'jumlah' => $result['jumlah'],
                'signa' => $result['signa']
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data);
    }

    function update()
    {
        global $koneksi;
        $id_obat = $_GET['id_obat'];
        $nama = $_POST['nama'];
        $jumlah = $_POST['jumlah'];
        $signa = $_POST['signa'];
        if ($nama) {
            $set[] = "nama='$nama'";
        }
        if ($jumlah) {
            $set[] = "jumlah=$jumlah";
        }
        if ($signa) {
            $set[] = "signa='$signa'";
        }
        $hasil = "Gagal melakukan update data";
        if ($nama or $jumlah or $signa) {
            $query = "UPDATE obat SET " . implode(",",
            $set) . " WHERE id_obat = $id_obat";
            $q1 = pg_query($koneksi, $query);
            if ($q1) {
                $hasil = "Data berhasil diupdate";
            }
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data);
    }

function delete()
{
    global $koneksi;
    $id_obat = $_GET['id_obat'];
    $query = "DELETE FROM obat WHERE id_obat = $id_obat";
    $q1 = pg_query($koneksi, $query);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}