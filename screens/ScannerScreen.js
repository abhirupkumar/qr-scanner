import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

export default function ScannerScreen({ navigation }) {
    const [display, setDisplay] = useState("");
    const [hasPermission, setHasPermission] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}><Text>Requesting for camera permission</Text></View>;
    }
    if (hasPermission === false) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
            {isFocused && <Camera
                style={{ flex: 1 }}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                onBarCodeScanned={(...args) => {
                    const data = args[0].data;
                    let result = JSON.stringify(data);
                    let newResult = result.replace(/['"]+/g, '');
                    setDisplay(newResult)
                }}
            />}
            {display != "" && <View style={styles.boxContainer}>
                <View style={{ marginBottom: 50 }}>
                    <Text
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 20,
                            borderRadius: 100,
                            textAlign: 'center',
                            minWidth: "80%",
                            height: 40,
                        }}>{display}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                        <Button
                            onPress={() => navigation.navigate('SearchResult', { link: display })}
                            title='Search' />
                        <Button
                            onPress={() => setDisplay("")}
                            title='Clear' />
                    </View>
                </View>
            </View>}
            <View
                style={styles.scanBoxContainer}
            >
                <View style={styles.scanBox}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    boxContainer: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        zIndex: 1
    },
    scanBoxContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        zIndex: 0,
    },
    scanBox: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: "white",
    },
});