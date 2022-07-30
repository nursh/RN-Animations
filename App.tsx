import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Worklets } from './src/worklets';
import { PanGesture } from './src/PanGesture';

export default function App() {
  return (
    <View style={styles.container}>
      <PanGesture />
      {/* <Worklets /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
