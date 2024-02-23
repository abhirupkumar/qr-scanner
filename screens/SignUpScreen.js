import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';
const logo = require("../assets/logo.png");

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSignUp = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            if (error.message.includes("email-already-in-use"))
                Alert.alert("Email Already in Use", "What would you do next?",
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log("OK"),
                            style: 'cancel'
                        },
                        {
                            text: 'Log In',
                            onPress: () => navigation.goBack(),
                        },
                    ])
            else
                Alert.alert(error.message)
        }
        setLoading(false);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center"
        }}>
            <View style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Image source={logo} style={styles.image} resizeMode='contain' />
            </View>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='EMAIL' value={email} onChangeText={setEmail} autoCorrect={false}
                    autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
                    autoCapitalize='none' />
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={onSignUp}>
                    <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign Up"}</Text>
                </Pressable>
            </View>
            <Pressable onPress={() => navigation.push("LoginScreen")} style={styles.footerText}><Text>Already Have An Account?<Text style={styles.login}>  Login</Text></Text></Pressable>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    image: {
        width: "100%",
        marginHorizontal: "auto",
        height: 160,
        width: 170
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 40,
        color: "red"
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 7
    },
    rememberText: {
        fontSize: 13
    },
    forgetText: {
        fontSize: 11,
        color: "red"
    },
    button: {
        backgroundColor: "red",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50
    },
    optionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "gray",
        fontSize: 13,
        marginBottom: 6
    },
    mediaIcons: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 23
    },
    icons: {
        width: 40,
        height: 40,
    },
    footerText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "gray",
        marginTop: 10
    },
    login: {
        color: "red",
        fontSize: 13
    }
})