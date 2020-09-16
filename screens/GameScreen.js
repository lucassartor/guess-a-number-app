 import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    const [rounds, setRounds] = useState(0);

    //useRef = Igual state mas quando atualiza não renderiza dnv
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    //Roda toda vez que renderiza(depois de renderizar)
    useEffect(() => {
        if (currentGuess === userChoice) {
            props.onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]); //Só roda se algum desses mudar 

    const handleNextGuess = direction => {
        if ((direction === "lower" && currentGuess < props.userChoice) || (direction === "greater" && currentGuess > props.userChoice)) {
            Alert.alert("Dont lie!", "Errou feio, errou rude... tenta de novo aí malandrão", [{ text: "Try Again", style: 'cancel' }]);
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => currentRounds + 1)
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Text>Your number is: {props.userChoice}</Text>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={handleNextGuess.bind(this, "lower")} />
                <Button title="GREATER" onPress={handleNextGuess.bind(this, "greater")} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
