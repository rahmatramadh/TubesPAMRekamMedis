import React,{useState} from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, StatusBar, ToastAndroid } from "react-native";
import plus from "assets/home/plus.jpg"
import footer from "assets/home/footer.jpg"

const Login  = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
    return (
        <View style={styles.container}>
            <Image style={styles.plus}
            source = {{plus}}>
            </Image>
            <Text style={styles.header}>LOGIN</Text>
            <View style={styles.textInputWrapper}>
                <TextInput style={styles.textInput} onChangeText={(username) => setUsername( username )} value={username} placeholder="Username" placeholderTextColor="grey" />
                <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={(password) => setPassword( password )} value={password} placeholder="Password" placeholderTextColor="grey" />
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("HomeCustomer")}>
                <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <Image style={styles.footer}
            source = {{footer}}>
            </Image>
        </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 50,
  },
  plus:{
    position: "absolute",
    width: 57.8,
    height: 57.02,
    left: 325,
    top: 35
  },
  footer:{
    position: "absolute",
    width: 414,
    height: 262,
    left: 0,
    top: 634,
  },
  header: {
    fontSize: 50,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginTop: 100,
    alignSelf: "center",
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

export default Login;

