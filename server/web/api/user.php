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
        $query = "SELECT * FROM user_app";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_user' => $result['id_user'],
                'nama' => $result['nama'],
                'email' => $result['email'],
                'username' => $result['username'],
                'password' => $result['password'],
                'role' => $result['role']
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data);
    }
    function create()
    {
        global $koneksi;
        $id_user = $_POST['id_user'];
        $nama = $_POST['nama'];
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $role = $_POST['role'];
        $hasil = "Gagal memasukkan data";
        if ($id_user and $nama and $email and $username and $password and $role) {
            $query = "INSERT INTO user_app VALUES ($id_user,'$nama','$email','$username', '$password', '$role')";
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
        $id_user = $_GET['id_user'];
        $query = "SELECT * FROM user_app WHERE id_user = $id_user";
        $q1 = pg_query($koneksi, $query);
        while ($result = pg_fetch_row($q1, NULL, PGSQL_ASSOC)) {
            $hasil[] = array(
                'id_user' => $result['id_user'],
                'nama' => $result['nama'],
                'email' => $result['email'],
                'username' => $result['username'],
                'password' => $result['password'],
                'role' => $result['role']
            );
        }
        $data['data']['result'] = $hasil;
        echo json_encode($data);
    }

    function update()
    {
        global $koneksi;
        $id_user = $_GET['id_user'];
        $nama = $_POST['nama'];
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $role = $_POST['role'];
        if ($nama) {
            $set[] = "nama='$nama'";
        }
        if ($email) {
            $set[] = "email='$email'";
        }
        if ($username) {
            $set[] = "username='$username'";
        }
        if ($password) {
            $set[] = "password='$password'";
        }
        if ($role) {
            $set[] = "role='$role'";
        }
        $hasil = "Gagal melakukan update data";
        if ($nama or $email or $username or $password or $role) {
            $query = "UPDATE user SET " . implode(",",
            $set) . " WHERE id_user = $id_user";
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
    $id_user = $_GET['id_user'];
    $query = "DELETE FROM user_app WHERE id_user = $id_user";
    $q1 = pg_query($koneksi, $query);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}