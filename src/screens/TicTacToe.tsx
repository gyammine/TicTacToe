import React, { FunctionComponent, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Linking, Button } from 'react-native';
import Board from '../components/Board';
import { normalizeFont } from '../utils/scaling';

const Link = ({ url, linkText }: { url: string; linkText: string }) => {
    const handleOnPress = useCallback(async () => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            // What phone doesn't support opening a browser in 2021..
        }
    }, [url]);

    return <Button onPress={handleOnPress} title={linkText}></Button>;
};

const TicTacToe: FunctionComponent = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Tic Tac Toe</Text>
            <View>
                <Text style={styles.playerText}>Player 1: X</Text>
                <Text style={styles.playerText}>Player 2: O</Text>
            </View>
            <Link
                url={'https://en.wikipedia.org/wiki/Tic-tac-toe'}
                linkText={'Learn how to play !'}
            />
            <Board />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontSize: normalizeFont(50),
        fontStyle: 'italic',
    },
    playerText: {
        fontSize: normalizeFont(20),
        fontWeight: '600',
    },
});
export default TicTacToe;
