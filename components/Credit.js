 import React from "react";
import { Text, StyleSheet, View } from "react-native";
import BodyText from "./BodyText";

const Credit = () => {
  return (
    <View>
      <BodyText style={styles.credit}>Made with love by Lucas Sartor</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  credit: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Credit;
