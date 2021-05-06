import React,{useState} from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, StatusBar, ToastAndroid } from "react-native";
import header from "assets/home/header.jpg"
import logout from "assets/home/logout.jpg"
import search from "assets/home/search.jpg"



const Home  = (props) => {
  const [search, setSearch] = useState("");
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
            <Image style={styles.header}
            source = {{header}}>
            </Image>
            <Image style={styles.logout}
            source = {{plus}}>
            </Image>
            <Text style={styles.textheader}>ADMIN</Text>
            <Text style={styles.daftar}>Daftar Pasien</Text>
            <Image style={styles.logout}
            source = {{plus}}>
            </Image>
            <View style={styles.textInputWrapper}>
                <TextInput style={styles.textInput} onChangeText={(search) => setSearch( search )} value={search} placeholder="Cari pasien" placeholderTextColor="grey" />
            </View>
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingBottom: 50,
    },
    textheader:{
        position: "absolute",
        width: 103,
        height: 42,
        left: 27,
        top: 99,
        
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontweight: 300,
        fontSize: 36,
        lineHeight: 42,
        
        color: "#000000",
    },
    header: {
        position: "absolute",
        width: 414,
        height: 80,
        left: 0,
        top: 0,
    },
    daftar: {
        position: "absolute",
        width: 142,
        height: 28,
        left: 27,
        top: 160,

        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 24,
        lineHeight: 28,

        color: "#000000",
    },
    
    textInputWrapper: {
      marginTop: 40,
      marginBottom: 20,
      width: 350,
    },
    textInput: {
      color: "#000000",
      marginTop: 30,
      borderBottomWidth: 1,
      borderBottomColor: "black",
    },
    buttonWrapper: {
      width: 350,
      marginTop: 30,
    },
    buttonText: {
      alignSelf: "center",
      fontWeight: "bold",
      color: "#FFFFFF",
      fontSize: 18,
    },
    orText: {
      fontSize: 20,
      alignSelf: "center",
      color: "#808080",
      marginTop: 10,
      marginBottom: 10,
    },
  });
