CREATE TABLE obat (
  id_obat serial NOT NULL PRIMARY KEY,
  nama varchar(255) NOT NULL,
  jumlah int NOT NULL,
  signa varchar(255) NOT NULL
);

INSERT INTO obat (id_obat, nama, jumlah, signa) VALUES
(1, 'Paracetamol', 12, '1 kali Sehari');

CREATE TABLE pasien (
  id_pasien serial NOT NULL PRIMARY KEY,
  nama varchar(255) NOT NULL,
  usia int NOT NULL,
  kelamin varchar(255) NOT NULL,
  alamat varchar(255) NOT NULL,
  no_telp varchar(255) NOT NULL
);

INSERT INTO pasien (id_pasien, nama, usia, kelamin, alamat, no_telp) VALUES
(1, 'MARZUKI', 30, 'Laki-Laki', 'Lampung', '080808548965');

CREATE TABLE rekam_medis (
  id_rekmed serial NOT NULL PRIMARY KEY,
  no_bag_rekmed varchar(255) NOT NULL,
  tensi varchar(255) NOT NULL,
  nadi varchar(255) NOT NULL,
  nafas varchar(255) NOT NULL,
  suhu varchar(255) NOT NULL,
  berat_badan float NOT NULL,
  tinggi_badan float NOT NULL,
  bmi float NOT NULL,
  diagnosis varchar(255) NOT NULL,
  tindakan varchar(255) NOT NULL,
  id_pasien bigint NOT NULL REFERENCES pasien (id_pasien) ON DELETE CASCADE ON UPDATE CASCADE,
  id_obat bigint NOT NULL REFERENCES obat (id_obat) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO rekam_medis (id_rekmed, no_bag_rekmed, tensi, nadi, nafas, suhu, berat_badan, tinggi_badan, bmi, diagnosis, tindakan, id_pasien, id_obat) VALUES
(1, '1', '12', '12', '12', '12', 11, 11, 11, 'Flu', 'Suntik Mati', 1, 1);

CREATE TABLE user_app (
  id_user serial NOT NULL PRIMARY KEY,
  nama varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(255) NOT NULL
);

INSERT INTO user_app (id_user, nama, email, username, password, role) VALUES
(1, 'Admin Marzuki', 'admin@gmail.com', 'marzukiaja', '81dc9bdb52d04dc20036dbd8313ed055', 'Super Admin'),
(2, 'DokterMarzuki', 'dokter@gmail.com', 'dokteraja', 'd22af4180eee4bd95072eb90f94930e5', 'Dokter'),
(3, 'Rafly Nagachi', 'rafly@gmail.com', 'raflynagachi', 'password', 'Super Admin'),
(4, 'Adelia', 'adelia@gmail.com', 'adelia', 'password', 'Dokter');