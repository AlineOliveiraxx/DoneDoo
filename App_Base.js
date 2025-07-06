import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Switch, View } from 'react-native';
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#1C1D21',
    primary: '#A288A6',
    surface: '#BB9BB0',
    surfaceVariant: '#CCBCBC',
    outline: '#F1E3E4',
    onSurface: '#F1E3E4',
    onBackground: '#F1E3E4',
    secondary: '#BB9BB0',
  },
};

export default function App_Base() {
  const [dark, setDark] = useState(true);

  return (
    <PaperProvider theme={customDarkTheme}>
      <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Switch value={dark} onValueChange={() => setDark(!dark)} />
        </View>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home_Screen} />
          <Stack.Screen name="Task_Form" component={Task_Form} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
