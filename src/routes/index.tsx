import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Home from "../screens/Home";
import ListaAlunos from "../screens/ListaAlunos";
import FormAluno from "../screens/FormAluno";
import NotasAluno from "../screens/NotasAluno";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListaAlunos" component={ListaAlunos} />
        <Stack.Screen name="FormAluno" component={FormAluno} />
        <Stack.Screen name="NotasAluno" component={NotasAluno} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
