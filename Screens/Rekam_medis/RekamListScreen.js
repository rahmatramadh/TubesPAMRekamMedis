import React, {useEffect, useState} from "react";
import Axios from "axios";
import FlatListItem from "./FlatListItem";
import {
    ActivityIndicator,
    FlatList, Image,
    RefreshControl,
    SafeAreaView,
    StatusBar, StyleSheet,
    TouchableOpacity,
    View,
    Text
} from "react-native";


export const RekamListScreen = ({ route, navigation }) => {

    const pasien = route.params;

    const [Loading, setLoading] = useState(true);
    const [RekamList, setRekamList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(  () => {
        try{
            Axios.get("https://tubes-rekam-medis.herokuapp.com/api/rekam_medis.php/?id_pasien="+pasien.id_pasien)
            .then(response => {
                console.log(response.data)
                setRekamList(response.data);
                setLoading(false);
            });
        }catch(e){
            console.error(e.response.status)
        }
    },[]);

    //refresh
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        Axios.get("https://tubes-rekam-medis.herokuapp.com/api/rekam_medis.php/?id_pasien="+pasien.id_pasien)
            .then(response => {
                setRekamList(response.data);
            });
        setRefreshing(false);
    }, [refreshing]);


    //create button onclick
    const clickHandler = () => {
        navigation.navigate('RekamCreate',
            {
                onRefresh: onRefresh,
                jumpToTop:flatListRef,
                id_pasien_: pasien.id_pasien
            });
    }

    const flatListRef = React.useRef(); //flatlist refresh

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#ffffff" translucent = {true}/>

            {Loading ? <ActivityIndicator  style={{height:200}} /> : <View style={{borderBottomColor:"black"}}></View>}
            <Text style={styles.NameText}>{pasien.nama}</Text>
            <Text style={styles.NameText}>(ID: {pasien.id_pasien} )</Text>
            {RekamList != null && (
                <FlatList
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    data={RekamList}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    renderItem={({item}) =>
                        <FlatListItem
                            item={item}
                            refresh={onRefresh}
                            navigation={navigation}
                            pasien={pasien}/>}
                />
            )}

            <TouchableOpacity
                activeOpacity={0.3}
                onPress={clickHandler}
                style={styles.TouchableOpacityStyle}>
                <Image
                    source={{ uri: 'https://img.icons8.com/cotton/2x/plus.png' }}
                    style={styles.FloatingButtonStyle}
                />
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    NameText:{
        textAlign:"center",
        fontSize:20,
        marginTop: 5,
        marginBottom:5
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
