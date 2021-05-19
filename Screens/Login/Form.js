import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import Axios from "axios";

export default class Form extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password: '',
            nama: '',
            email: '',
        }
    }

    saveData =async()=>{
        const {username, password, nama, email} = this.state;

        var loginDetails = new FormData();
        loginDetails.append('username', username);
        loginDetails.append('password', password);
        loginDetails.append('nama', nama);
        loginDetails.append('email', email);

        if(this.props.type == 'Login')
        {
            try{
                await Axios.post("https://tubes-rekam-medis.herokuapp.com/api/user_login.php/", loginDetails,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        if(res.data == "Data Matched"){
                            this.props.navigation.navigate('PasienList',
                            {
                                username:username
                            }
                            )
                            alert('Anda telah login')
                        }else{
                            this.props.navigation.navigate('Login')
                            alert('username or Password does not exist!');
                        }
                    })
                    .catch(error => console.log(error))
                
            }catch(e){
                alert(e);
            }
        }
        else if(this.props.type !== 'Login')
        {
            await Axios.post("https://tubes-rekam-medis.herokuapp.com/api/user_app.php/?op=create", loginDetails,
            {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res.data);
                this.props.navigation.navigate('Login')
            })
            .catch(error => console.log(error))
            Keyboard.dismiss()
            //Tambah disini
        }
    }

    render() {
        return this.props.type == 'Login' ? (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                onChangeText={(username) => this.setState({username})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Username"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>   
        ):(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                onChangeText={(username) => this.setState({username})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Username"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(nama) => this.setState({nama})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Nama"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                onSubmitEditing={()=> this.password.focus()}/>

                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                onSubmitEditing={()=> this.password.focus()}/>

                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
});