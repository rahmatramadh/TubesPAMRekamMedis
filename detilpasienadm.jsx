import React,{useState} from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, StatusBar, ToastAndroid } from "react-native";
import header from "assets/detadm/header.jpg";
import back from "assets/detadm/back.jpg";
import person from "assets/detadm/person.jpg";
import box from "assets/detadm/box.jpg";
import calendar from "assets/detadm/calendar.jpg";
import lightblue from "assets/detadm/lightbluebox.jpg";
import editbox from "assets/detadm/boxedit.jpg";
import boxdet from "assets/detadm/boxdet.jpg";

const DetAdm  = (props) => {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
            <Image style={styles.header}
            source = {{header}}>
            </Image>
            <Image style={styles.back}
            source = {{back}}>
            </Image>
            <Text style={styles.textheader}>Identitas Pasien</Text>
            <Image style={styles.person}
            source = {{person}}>
            </Image>
            <Text style={styles.id}>Id Pasien</Text>
            <Image style={styles.box}
            source = {{box}}>
            </Image>
            <Text style={styles.rekam}>Rekam Medis</Text>
            <Image style={styles.calendar}
            source = {{calendar}}>
            </Image>
            <Text style={styles.rekam}>Tanggal</Text>
            <Image style={styles.boxedit}
            source = {{editbox}}>
            </Image>
            <Image style={styles.lightbluebox}
            source = {{lightblue}}>
                <Image style={styles.td}
                source = {{boxdet}}>
                </Image>
                <Image style={styles.nadi}
                source = {{boxdet}}>
                </Image>
                <Image style={styles.xy}
                source = {{boxdet}}>
                </Image>
                <Image style={styles.suhu}
                source = {{boxdet}}>
                </Image>
                <Image style={styles.bb}
                source = {{boxdet}}>
                </Image>
                <Image style={styles.tb}
                source = {{boxdet}}>
                </Image>
                <Image style={styles.xx}
                source = {{boxdet}}>
                </Image>
            </Image>
        </View>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingBottom: 50,
    },
    textheader:{
        position: "absolute",
        width: 168,
        height: 28,
        left: 233,
        top: 80,

        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 24,
        lineHeight: 28,

        color: "#000000",
    },
    header: {
        position: "absolute",
        width: 414,
        height: 80,
        left: 0,
        top: 0,
    },
    id :{
        position: "absolute",
        width: 52,
        height: 21,
        left: 181,
        top: 176,

        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 18,
        lineHeight: 21,
        color: "#000000",
    },
    rekam: {
        position: "absolute",
        width: 144,
        height: 28,
        left: 257,
        top: 511,

        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 24,
        lineHeight: 28,

        color: "#000000"
    },
    calendar: {
        position: "absolute",
        left: "3.86%",
        right: "93.72%",
        top: "61.94%",
        bottom: "36.82%",

        background: "#000000"
    },
    boxedit: {
        position: "absolute",
        width: 95,
        height: 26,
        left: 306,
        top: 548,
    },
    lightbluebox: {
        position: "absolute",
        width: 414,
        height: 315,
        left: 0,
        top: 581,
    }, 
    td: {
        position: "absolute",
        left: 33,
        top: 624,
    },
    nadi: {
        position: "absolute",
        left: 153,
        top: 624,
    },
    xy: {
        position: "absolute",
        left: 273,
        top: 624,
    },
    suhu:{
        position: "absolute",
        left: 33,
        top: 711,
    },
    bb: {
        position: "absolute",
        left: 153,
        top: 711,
    },
    tb: {
        position: "absolute",
        left: 253,
        top: 711,
    },
    xx: {
        position: "absolute",
        left: 153,
        top: 798,
    },
  });
