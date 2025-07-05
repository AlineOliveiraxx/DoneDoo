import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home_Screen from './app/(tabs)/Screens/Home_Screen';
import Task_Form from './app/(tabs)/Screens/Task_Form';

const Stack = createNativeStackNavigator();

export default function App_Base() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home_Screen} />
          <Stack.Screen name="TaskForm" component={Task_Form} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}