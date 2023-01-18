import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color="#7C3AED" />
    </View>
  );
}
