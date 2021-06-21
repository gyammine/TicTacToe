import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import { normalizeFont, screenWidth } from '../utils/scaling';

interface State {
    grid: number[][];
    turnNumber: number;
    numberOfPlaysMade: number;
}
const initialState = {
    grid: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    turnNumber: 1,
    numberOfPlaysMade: 0,
};

const Board: FunctionComponent = () => {
    const [boardState, setBoardState] = useState<State>(initialState);

    useEffect(() => {
        if (boardState.numberOfPlaysMade >= 5) {
            checkForWinOrDraw(boardState);
        }
    }, [boardState]);

    const renderCell = useCallback(
        (row, column) => {
            const cell = boardState.grid[row][column];
            if (!cell) return;
            return <Text style={styles.symbol}>{cell === 1 ? 'X' : 'O'}</Text>;
        },
        [boardState]
    );
    const handleCellPress = useCallback(
        (row, column) => {
            if (boardState.grid[row][column] !== 0) {
                return;
            }
            const copy = boardState.grid.slice();
            copy[row][column] = boardState.turnNumber;
            setBoardState({
                grid: copy,
                turnNumber: boardState.turnNumber === 1 ? -1 : 1,
                numberOfPlaysMade: boardState.numberOfPlaysMade + 1,
            });
        },
        [boardState, setBoardState]
    );
    const checkForWinOrDraw = (boardState: State) => {
        const { grid } = boardState;
        for (let index = 0; index < 3; index++) {
            const rowValue = grid[index][0] + grid[index][1] + grid[index][2];
            const columnValue = grid[0][index] + grid[1][index] + grid[2][index];
            if (rowValue === 3 || columnValue === 3) {
                return declareWinnerOrDraw(1);
            }
            if (rowValue === -3 || columnValue === -3) {
                return declareWinnerOrDraw(2);
            }
        }
        const firstDiagonal = grid[0][0] + grid[1][1] + grid[2][2];
        const secondDiagonal = grid[2][0] + grid[1][1] + grid[0][2];
        if (firstDiagonal === 3 || secondDiagonal === 3) {
            return declareWinnerOrDraw(1);
        }
        if (firstDiagonal === -3 || secondDiagonal === -3) {
            return declareWinnerOrDraw(2);
        }
        if (boardState.numberOfPlaysMade === 9) {
            return declareWinnerOrDraw(0);
        }
    };

    const declareWinnerOrDraw = useCallback(
        (result: number) => {
            const cb = [
                {
                    text: 'Play a New Match',
                    onPress: () => {
                        setBoardState({
                            ...initialState,
                            grid: [
                                [0, 0, 0],
                                [0, 0, 0],
                                [0, 0, 0],
                            ],
                        });
                    },
                },
            ];
            switch (result) {
                case 1:
                    Alert.alert('Congratulations', 'Player 1 is the winner !', cb);
                    break;
                case 2:
                    Alert.alert('Congratulations', 'Player 2 is the winner !', cb);
                    break;
                default:
                    Alert.alert('Draw!', 'Play again to settle the score', cb);
                    break;
            }
        },
        [setBoardState, boardState]
    );

    return (
        <View>
            {boardState.grid.map((row, rowIndex) => (
                <View style={styles.row} key={rowIndex}>
                    {row.map((column, columnIndex) => (
                        <TouchableOpacity
                            onPress={() => handleCellPress(rowIndex, columnIndex)}
                            style={styles.cell}
                            key={columnIndex}
                        >
                            {renderCell(rowIndex, columnIndex)}
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
            <Button
                title={'Restart the game'}
                onPress={() => {
                    setBoardState({
                        ...initialState,
                        grid: [
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                        ],
                    });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: 'row' },
    cell: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    symbol: {
        fontSize: normalizeFont(26),
    },
    bottomBorder: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
});

export default Board;
