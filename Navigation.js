import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import CadastroLogin from './CadastroLogin';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown:false
    }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="CadastroLogin" component={CadastroLogin}/>
  </Stack.Navigator>
);

export default AppNavigator;