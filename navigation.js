import { View, Text } from 'react-native'
import React from 'react'
import ScannerScreen from './screens/ScannerScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const SignedInStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Scanner" component={ScannerScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="SearchResult" component={SearchResultScreen} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export const SignedOutStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};