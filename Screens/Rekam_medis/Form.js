import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ToastAndroid,
    Vibration,
    Image,
    ScrollView
} from 'react-native';
import {hasValidationError, validateFields} from "../../Validation";
import Axios from "axios";


const getInitialStateValues = (fieldKeys,rekam) => {
    const state = {};

    if (rekam) {
        const rekamValues = Object.values(rekam);
        let j = 1;
        for (let i = 0; i < fieldKeys.length; i++) { //case: update
            state[fieldKeys[i]] = rekamValues[j];
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

const Form = ({ fields, afterSubmit, navigation, rekam, refresh, jumpToTop, id_pasien_ }) => {
    const fieldKeys = Object.keys(fields);
    const [values, setValues] = useState(getInitialStateValues(fieldKeys,rekam));
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
            const tensi = values[0];
            const nadi = values[1];
            const nafas = values[2];
            const suhu = values[3];
            const berat_badan = parseFloat(values[4]);
            const tinggi_badan = parseFloat(values[5]);
            const bmi = parseFloat(values[6]);
            const diagnosis = values[7];
            const tindakan = values[8];
            const id_pasien = id_pasien_ ? id_pasien_:values[9];
        
            var formData = new FormData();
            formData.append('tensi', tensi);
            formData.append('nadi', nadi);
            formData.append('nafas', nafas);
            formData.append('suhu', suhu);
            formData.append('berat_badan', berat_badan);
            formData.append('tinggi_badan', tinggi_badan);
            formData.append('bmi', bmi);
            formData.append('diagnosis', diagnosis);
            formData.append('tindakan', tindakan);
            formData.append('id_pasien', id_pasien);
            if(rekam){ //update
                Vibration.vibrate();
                await Axios.post("https://tubes-rekam-medis.herokuapp.com/api/rekam_medis.php/?op=update&id_rekmed="+rekam.id_rekmed, formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => console.log(error))    
                    .then(navigation.navigate("RekamList")).then(refresh)
                    ToastAndroid.showWithGravity(
                        "Data berhasil di-update",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
            }else{ //create
                Vibration.vibrate();
                await Axios.post("https://tubes-rekam-medis.herokuapp.com/api/rekam_medis.php/?op=create", formData, 
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => console.log(error))
                    .then(navigation.navigate("RekamList")).then(refresh).then(jumpToTop.current.scrollToOffset({ animated: true, offset: 0 }));
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
                    source={{uri: rekam ? "https://i.imgur.com/bGqWSpG.png" : "https://i.imgur.com/oXPuh1S.png"
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
