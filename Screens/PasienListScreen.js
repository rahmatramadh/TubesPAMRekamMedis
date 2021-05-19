import React, {useEffect, useState} from "react";
import Axios from "axios";
import FlatListItem from "../FlatListItem";
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


export const PasienListScreen = ({ route, navigation }) => {

    const username_dokter = route.params;

    const [Loading, setLoading] = useState(true);
    const [PasienList, setPasienList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(  () => {
        try{
            Axios.get("https://tubes-rekam-medis.herokuapp.com/api/pasien.php/?username="+username_dokter.username)
            .then(response => {
                console.log(response.data)
                setPasienList(response.data);
                setLoading(false);
            });
        }catch(e){
            console.error(e.response.status)
        }
    },[]);

    //refresh
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        Axios.get("https://tubes-rekam-medis.herokuapp.com/api/pasien.php/?username="+username_dokter.username)
            .then(response => {
                setPasienList(response.data);
            });
        setRefreshing(false);
    }, [refreshing]);


    //create button onclick
    const clickHandler = () => {
        navigation.navigate('PasienCreate',
            {
                onRefresh: onRefresh,
                jumpToTop:flatListRef,
                username_dokter: username_dokter
            });
    }

    const clickLogout = () => {
        navigation.navigate('Home');
    }

    const flatListRef = React.useRef(); //flatlist refresh

    return (
        <SafeAreaView style={styles.container}>
            
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#ffffff" translucent = {true}/>
            
            {Loading ? <ActivityIndicator  style={{height:200}} /> : <View style={{borderBottomColor:"black", alignItems: 'flex-end'}}>
                    <TouchableOpacity
                        activeOpacity={0.3}
                        onPress={clickLogout}
                        style={styles.logout}>
                        <Text style={{color: '#fff'}}>Log out</Text>
                    </TouchableOpacity>
                </View>}

            {PasienList != null && (
                <FlatList
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    data={PasienList}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    renderItem={({item}) =>
                        <FlatListItem
                            item={item}
                            refresh={onRefresh}
                            navigation={navigation}/>}
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
    logout:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4d4d',
        borderRadius: 8,
        width: 75,
        height: 30,
        margin: 8
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    WelcomeText:{
        textAlign:"center",
        fontSize:25,
        marginTop: 20,
        marginBottom:30
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
