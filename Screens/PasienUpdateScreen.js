import Form from "../Form";
import {validateContent, validateKelamin, validateLength} from "../Validation";
import React from "react";

export const PasienUpdateScreen = ({ route, navigation }) => {

    const pasien = route.params;
    const refresh = route.params.refresh;

    return <Form
        navigation={navigation}
        pasien={pasien}
        refresh={refresh}
        fields={{
            nama: {
                label: 'Nama',
                inputProps: {
                },
                validators: [validateContent, validateLength],
            },
            usia: {
                label: 'Usia',
                inputProps: {
                    inputMode: 'numeric',
                },
                validators: [validateContent],
            },
            kelamin: {
                label: 'Jenis kelamin',
                inputProps: {
                },
                validators: [validateContent, validateLength, validateKelamin],
            },
            alamat: {
                label: 'Alamat',
                inputProps: {
                },
                validators: [validateContent, validateLength],
            },
            no_telp: {
                label: 'No.HP',
                inputProps: {
                    inputMode: 'numeric',
                },
                validators: [validateContent, validateLength],
            },
        }}/>
};
