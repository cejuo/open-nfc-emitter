import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

// Reduc Thunk
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { store } from "./store/app";
import StartupScreen from "./screens/StartupScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupScreen} />
          <Stack.Screen name="Login" options={{ headerLeft: () => null }} component={LoginScreen} />
          <Stack.Screen name="Tokens" options={{ headerLeft: () => null }} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
