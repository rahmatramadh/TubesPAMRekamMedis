import React from 'react';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import {HomeScreen} from "./Screens/HomeScreen";
import {PasienUpdateScreen} from "./Screens/PasienUpdateScreen";
import {PasienCreateScreen} from "./Screens/PasienCreateScreen";
import {PasienListScreen} from "./Screens/PasienListScreen";
import {SignupScreen} from './Screens/Login/SignupScreen';
import {LoginScreen} from './Screens/Login/LoginScreen';
import {RekamUpdateScreen} from "./Screens/Rekam_medis/RekamUpdateScreen";
import {RekamCreateScreen} from "./Screens/Rekam_medis/RekamCreateScreen";
import {RekamListScreen} from "./Screens/Rekam_medis/RekamListScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Login' }}
                />

                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ title: 'Signup' }}
                />
                

                <Stack.Screen
                    name="PasienList"
                    component={PasienListScreen}
                    options={{ title: 'Pasien List' }}
                />

                <Stack.Screen
                    name="PasienCreate"
                    component={PasienCreateScreen}
                    options={{ title: 'Create Pasien' }}
                />

                <Stack.Screen
                    name="PasienUpdate"
                    component={PasienUpdateScreen}
                    options={{ title: 'Update Pasien' }}
                />

                <Stack.Screen
                    name="RekamList"
                    component={RekamListScreen}
                    options={{ title: 'Rekam List' }}
                />

                <Stack.Screen
                    name="RekamCreate"
                    component={RekamCreateScreen}
                    options={{ title: 'Create Rekam' }}
                />

                <Stack.Screen
                    name="RekamUpdate"
                    component={RekamUpdateScreen}
                    options={{ title: 'Update Rekam' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
