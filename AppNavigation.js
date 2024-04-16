import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import CadastroLogin from './CadastroLogin';
import Principal from './Principal';
import Cadastro from './Cadastro';

const Stack = createStackNavigator();

const AppNavigaton = () => (
  <Stack.Navigator screenOptions={{
    headerShown:false
    }}>
    <Stack.Screen name="Principal" component={Principal} />
    <Stack.Screen name="Cadastro" component={Cadastro}/>
  </Stack.Navigator>
);

export default AppNavigaton;