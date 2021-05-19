import {Card} from "react-native-elements";
import {Text} from "react-native";
import Swipeout from 'react-native-swipeout';
import React, {Component} from "react";
import Axios from "axios";

export default class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        };
    }

    render() {
        const swipeSettings = {
            autoClose:true,
            right:[
                {
                    backgroundColor:"#ff4d4d",
                    text: 'Hapus',
                    onPress: () => {
                        Axios.delete(
                            "https://tubes-rekam-medis.herokuapp.com/api/rekam_medis.php/?op=delete&id_rekmed=" + this.props.item.id_rekmed
                        ).then(this.props.refresh);
                    }
                },
                {
                    backgroundColor:"#6699ff",
                    text: 'Update',
                    onPress: () => {
                       this.props.navigation.navigate("RekamUpdate",
                           {
                               id_rekmed:this.props.item.id_rekmed,
                               tensi:this.props.item.tensi,
                               nadi:this.props.item.nadi,
                               nafas:this.props.item.nafas,
                               suhu:this.props.item.suhu,
                               berat_badan:this.props.item.berat_badan,
                               tinggi_badan:this.props.item.tinggi_badan,
                               bmi:this.props.item.bmi,
                               diagnosis:this.props.item.diagnosis,
                               tindakan:this.props.item.tindakan,
                               id_pasien: this.props.pasien.id_pasien,
                           });
                    }
                },
            ],
        }

       return (
           <Swipeout {...swipeSettings}>
            <Card containerStyle={{width: "100%", margin: 0, borderBottomColor: "black", height: 250}}>
                <Card.Title>ID: {this.props.item.id_rekmed}</Card.Title>
                <Card.Divider/>
                <Text>Tensi: {this.props.item.tensi}{"\n"}Nadi: {this.props.item.nadi}{"\n"}nafas: {this.props.item.nafas}{"\n"}suhu: {this.props.item.suhu}{"\n"}berat badan: {this.props.item.berat_badan}{"\n"}tinggi badan: {this.props.item.tinggi_badan}{"\n"}bmi: {this.props.item.bmi}{"\n"}diagnosis: {this.props.item.diagnosis}{"\n"}tindakan: {this.props.item.tindakan}{"\n"}</Text>
            </Card>
        </Swipeout>
        );
    }
}

