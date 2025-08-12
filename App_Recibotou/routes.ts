import LoginScreen from './src/screens/auth/LoginScreen';

interface route {
  name: string;
  component?: any;
  options: object;
}

const routes: route[] = [
  {
    name: 'Login',
    component: LoginScreen,
    options: {headerShown: false},
  },
];

export const initialRouteName: string = 'Login';

export default routes;
