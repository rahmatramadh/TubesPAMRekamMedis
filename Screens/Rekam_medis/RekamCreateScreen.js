import Form from "./Form";
import React from "react";
import {validateContent} from "../../Validation";

export const RekamCreateScreen = ({ route, navigation, }) => {
    return <Form
        jumpToTop={route.params.jumpToTop}
        refresh={route.params.onRefresh}
        navigation={navigation}
        id_pasien_={route.params.id_pasien_}
        fields={{
            tensi: {
                label: 'Tensi',
                inputProps: {
                },
                validators: [validateContent],
            },
            nadi: {
                label: 'Nadi',
                inputProps: {
                },
                validators: [validateContent],
            },
            nafas: {
                label: 'Nafas',
                inputProps: {
                },
                validators: [validateContent],
            },
            suhu: {
                label: 'Suhu',
                inputProps: {
                },
                validators: [validateContent],
            },
            berat_badan: {
                label: 'Berat Badan',
                inputProps: {
                },
                validators: [validateContent],
            },
            tinggi_badan: {
                label: 'Tinggi Badan',
                inputProps: {
                },
                validators: [validateContent],
            },
            bmi: {
                label: 'BMI',
                inputProps: {
                },
                validators: [validateContent],
            },
            diagnosis: {
                label: 'Diagnosis',
                inputProps: {
                },
                validators: [validateContent],
            },
            tindakan: {
                label: 'Tindakan',
                inputProps: {
                },
                validators: [validateContent],
            },
        }}/>
};
