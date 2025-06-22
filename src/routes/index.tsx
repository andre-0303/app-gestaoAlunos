import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import  Home  from "../screens/Home";
import  ListaAlunos  from "../screens/ListaAlunos";
import  FormAluno  from "../screens/FormAluno";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Turmas' }} />
        <Stack.Screen name="ListaAlunos" component={ListaAlunos} options={{ title: 'Alunos' }} />
        <Stack.Screen name="FormAluno" component={FormAluno} options={{ title: 'Cadastro / Edição' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
