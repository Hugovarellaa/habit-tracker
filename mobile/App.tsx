import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Loading } from "./src/components/Loading";

export default function App() {
  const [fontsLoading] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.font}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090A",
    alignItems: "center",
    justifyContent: "center",
  },
  font: {
    color: "white",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
    fontSize: 24,
  },
});
