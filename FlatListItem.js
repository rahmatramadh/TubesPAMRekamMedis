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
                            "https://tubes-rekam-medis.herokuapp.com/api/pasien.php/?op=delete&id_pasien=" + this.props.item.id_pasien
                        ).then(this.props.refresh);
                    }
                },
                {
                    backgroundColor:"#6699ff",
                    text: 'Update',
                    onPress: () => {
                       this.props.navigation.navigate("PasienUpdate",
                           {
                               id_pasien:this.props.item.id_pasien,
                               nama:this.props.item.nama,
                               usia:this.props.item.usia,
                               kelamin:this.props.item.kelamin,
                               alamat:this.props.item.alamat,
                               no_telp:this.props.item.no_telp
                           });
                    }
                },
                {
                    backgroundColor:"#8cd9aa",
                    text: 'Riwayat',
                    onPress: () => {
                       this.props.navigation.navigate("RekamList",
                           {
                               id_pasien:this.props.item.id_pasien,
                               nama:this.props.item.nama,
                               usia:this.props.item.usia,
                               kelamin:this.props.item.kelamin,
                               alamat:this.props.item.alamat,
                               no_telp:this.props.item.no_telp
                           });
                    }
                },
            ],
        }

       return (
           <Swipeout {...swipeSettings}>
            <Card containerStyle={{width: "100%", margin: 0, borderBottomColor: "black", height: 170}}>
                <Card.Title>{this.props.item.nama}</Card.Title>
                <Card.Divider/>
                <Text>ID: {this.props.item.id_pasien} {"\n"}Usia:{this.props.item.usia}{"\n"}Jenis Kelamin: {this.props.item.kelamin}{"\n"}Alamat: {this.props.item.alamat}{"\n"}Nomor handphone: {this.props.item.no_telp}{"\n"}</Text>
            </Card>
        </Swipeout>
        );
    }
}

