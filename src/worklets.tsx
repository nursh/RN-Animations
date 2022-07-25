import { View, StyleSheet } from "react-native";
import { runOnJS, runOnUI } from "react-native-reanimated";
import { Button } from "./components/Button";

const sayHello = (person: string, cb: (message: string) => void) => {
  "worklet";
  console.log(`Hello ${person}`);
  runOnJS(cb)("Gonzalez has returned");
};

export const Worklets = () => {
  return (
    <View>
      <Button
        label="Push me"
        onPress={() =>
          runOnUI(sayHello)("Gonzalez", (message) => console.log(message))
        }
      />
    </View>
  );
};
