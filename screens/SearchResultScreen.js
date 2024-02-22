import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const SearchResultScreen = ({ route }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                style={styles.container}
                source={{ uri: route?.params?.link }}
            />
        </SafeAreaView>
    )
}

export default SearchResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});