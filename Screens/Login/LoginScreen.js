import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, StatusBar } from 'react-native';

import Form from './Form';

export const LoginScreen = ({navigation}) => {
    return(
        <SafeAreaView>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#ffffff" translucent = {true}/>
            <Text style={styles.WelcomeText}>Welcome</Text>
            <Text style={styles.titlePage}>Login</Text>
            <Text style={styles.HomeText}>
                Aplikasi Rekam Medis by{"\n"}PAM SKUY
            </Text>    
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Form type="Login" navigation={navigation}/>
            <View style={styles.signupTextCont}> 
                <Text style={styles.signupText}>Dont have an account yet? </Text>
                <TouchableOpacity onPress={ () => navigation.navigate('Signup')}><Text style={styles.signupButton}>Sign up</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row',
    },
    titlePage: {
        color: '#12799f', 
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center'  
    },
    signupText: {
      color: '#12799f', 
      fontSize:16,
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500',
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: -30,
        marginTop: 5
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    WelcomeText:{
        textAlign:"center",
        fontSize:25,
        marginTop: 20,
        marginBottom:30
    },
    HomeText:{
        textAlign:"center",
        fontSize:20,
    },
    VersionText:{
        paddingTop:"100%",
        textAlign: "left"
    }
});