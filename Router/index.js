import React from "react";
import { StyleSheet, TouchableOpacity, Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/header/HeaderButton";
import Splash from "../splash/splash"
import EditProfile from "../components/all/EditProfile"
import Login from "../components/all/LoginPage";
import Home from "../components/all/HomeAdmin";

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "center",
          color: "#F57373",
        },
        // headerTransparent: true,
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="back" iconName={"chevron-back"} onPress={() => navigation.goBack()} iconSize={40} />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="profile" iconName={"person-circle-outline"} onPress={() => navigation.navigate("Profile")} iconSize={30} />
          </HeaderButtons>
        ), 
      })}
    >
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="HomeAdmin" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F57373",
    elevation: 8,
    borderRadius: 30,
    height: 45,
    justifyContent: "center",
    width: 250,
    alignSelf: "center",
  },
});