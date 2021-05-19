import Form from "../Form";
import {validateContent, validateKelamin, validateLength} from "../Validation";
import React from "react";

export const PasienCreateScreen = ({ route, navigation, }) => {
    return <Form
        jumpToTop={route.params.jumpToTop}
        refresh={route.params.onRefresh}
        username_dokter = {route.params.username_dokter}
        navigation={navigation}
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
