import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ToastAndroid,
    Vibration,
    FlatList,
    RefreshControl,
    ScrollView,
    Image
} from 'react-native';
import {hasValidationError, validateFields} from "./Validation";
import Axios from "axios";
import FlatListItem from "./FlatListItem";


const getInitialStateValues = (fieldKeys,pasien) => {
    const state = {};

    if (pasien) {
        const pasienValues = Object.values(pasien);
        let j = 1;
        for (let i = 0; i < fieldKeys.length; i++) { //case: update
            state[fieldKeys[i]] = pasienValues[j];
            j++;
        }
    } else {
        fieldKeys.forEach((key) => { //case: creation
            state[key] = '';
        });
    }

    return state;
};

const getInitialStateErrors = (fieldKeys) => {
    const state = {};
    fieldKeys.forEach((key) => {
        state[key] = '';
    });

    return state;
};

const Form = ({ fields, afterSubmit, navigation, pasien, refresh, jumpToTop, username_dokter }) => {
    const fieldKeys = Object.keys(fields);
    const [values, setValues] = useState(getInitialStateValues(fieldKeys,pasien));
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        getInitialStateErrors(fieldKeys),
    );

    const onChangeValue = (key, value) => {
        const newState = { ...values, [key]: value };
        setValues(newState);

        if (validationErrors[key]) {
            const newErrors = { ...validationErrors, [key]: '' };
            setValidationErrors(newErrors);
        }
    };

    const getValues = () => {
        return fieldKeys.map((key) => values[key]);
    };

    const submit = async () => {
        setErrorMessage('');
        setValidationErrors(getInitialStateErrors(fieldKeys));

        const errors = validateFields(fields, values);
        if (hasValidationError(errors)) {
            return setValidationErrors(errors);
        }

        try {
            //alexios post
            const values = getValues();
            const nama = values[0];
            const usia = parseInt(values[1]);
            const kelamin = values[2];
            const alamat = values[3];
            const no_telp = parseInt(values[4]);
            var formData = new FormData();
            formData.append('nama', nama);
            formData.append('usia', usia);
            formData.append('kelamin', kelamin);
            formData.append('alamat', alamat);
            formData.append('no_telp', no_telp);

            if(pasien){ //update
                Vibration.vibrate();
                await Axios.post("https://tubes-rekam-medis.herokuapp.com/api/pasien.php/?op=update&id_pasien="+pasien.id_pasien, formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => console.log(error))    
                    .then(navigation.navigate("PasienList")).then(refresh)
                    ToastAndroid.showWithGravity(
                        "Data berhasil di-update",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
            }else{ //create
                Vibration.vibrate();
                await Axios.post("https://tubes-rekam-medis.herokuapp.com/api/pasien.php/?op=create&username="+username_dokter.username, formData, 
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => console.log(error))
                    .then(navigation.navigate("PasienList")).then(refresh).then(jumpToTop.current.scrollToOffset({ animated: true, offset: 0 }));
                    ToastAndroid.showWithGravity(
                        "Data berhasil ditambah",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
            }
        } catch (e) {
            setErrorMessage(e.message);
            ToastAndroid.showWithGravity(
                "Operasi gagal",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
        }
    };


    return (
        <ScrollView>
            <View style={styles.positionItems}>
                <Image
                    style={styles.FormImage}
                    source={{uri: pasien ? "https://i.imgur.com/bGqWSpG.png" : "https://i.imgur.com/oXPuh1S.png"
                    }}
                />
            <Text>{successMessage}</Text>
            <Text>{errorMessage}</Text>
            {fieldKeys.map((key) => {
                const field = fields[key];
                const fieldError = validationErrors[key];
                return (
                    <View key={key} style={styles.container}>
                        <Text style={styles.formLabel}>{field.label}</Text>
                        <TextInput style={styles.formInput}
                            {...field.inputProps}
                            value={values[key]}
                            onChangeText={(text) => onChangeValue(key, text)}
                        />
                        <Text style={styles.formError}>{fieldError}</Text>
                    </View>
                );
            })}
            <Button style={styles.formButton} title="Submit"  onPress={submit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    formLabel: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center'
    },
    formInput: {
        marginTop:5,
        borderColor: 'gray',
        borderWidth: 0.9,
        fontSize: 20,
        paddingLeft:9,
        borderRadius: 10,
        height: 40,
        width: '80%'
    },
    formError: {
        color:'red'
    },
    FormImage:{
        resizeMode: 'contain',
        width: 100,
        marginTop: 20,
        height: 100,
        alignSelf: 'center',
        borderRadius: 50
    },
});

export default Form;
