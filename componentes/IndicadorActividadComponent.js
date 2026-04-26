import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colorGaztaroaOscuro } from "../comun/comun";

export const IndicadorActividad = () => {
  return (
    <View style={styles.indicadorView}>
      <ActivityIndicator size="large" color={colorGaztaroaOscuro} />
      <Text style={styles.indicadorText}>En proceso . . .</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  indicadorView: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  indicadorText: {
    color: colorGaztaroaOscuro,
    fontSize: 14,
    fontWeight: "bold",
  },
});
