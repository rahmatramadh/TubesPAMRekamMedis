import React,{useState} from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, StatusBar, ToastAndroid } from "react-native";
import header from "assets/editpasien/header.jpg"
import back from "assets/editpasien/back.jpg"
import footer from "assets/editpasien/footer.jpg"
import person from "assets/editpasien/person.jpg"

const Edit  = (props) => {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jeniskelamin, setJenisKelamin] = useState("");
  const [nohp, setNohp] = useState("");
  
    return (
        <View style={styles.container}>
            <Image style={styles.header}
            source = {{header}}>
            </Image>
            <Image style={styles.back}
            source = {{back}}>
            </Image>
            <Image style={styles.person}
            source = {{person}}>
            </Image>
            <Text style={styles.header}>LOGIN</Text>
            <View style={styles.textInputWrapper}>
                <TextInput style={styles.textInput} onChangeText={(nama) => setNama( nama )} value={nama} placeholder="Nama" placeholderTextColor="grey" />
                <TextInput keyboardType="numeric" style={styles.textInput} onChangeText={(umur) => setUmur(umur)} value={umur} placeholder="Whatsapp" placeholderTextColor="grey" />
                <DropDownPicker 
                    placeholder="Jenis Kelamin"
                    items={[
                        {label: 'Laki-Laki', value: 'Laki-Laki'},
                        {label: 'Perempuan', value: 'Perempuan'},
                    ]}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: "white"}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: "white"}}
                    onChangeItem={item => setJenisKelamin(...jeniskelamin,item.value)}
                />
                <TextInput style={styles.textInput} onChangeText={(alamat) => setAlamat( alamat )} value={alamat} placeholder="Nama" placeholderTextColor="grey" />
                <TextInput style={styles.textInput} onChangeText={(nohp) => setNohp( nohp )} value={nohp} placeholder="Nama" placeholderTextColor="grey" />
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("HomeCustomer")}>
                <Text style={styles.buttonText}>Simpan Perubahan</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.footer}
            source = {{footer}}>
            </Image>
        </View>
    );
  }