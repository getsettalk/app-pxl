import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './NavigationRef';
import ScreenNames from '@constants/ScreenNames';
import SplashScreen from '@features/auth/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetails from '@features/main/ProductDetails';


const Stack = createNativeStackNavigator();


const linking = {
  prefixes: ['https://rimeso.in'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          [ScreenNames.ProductListScreen]: 'test.txt',
        },
      },
      [ScreenNames.ProductDetailsScreen]: 'product/:id',
    },
  },
};

const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={ScreenNames.OnBoardingScreen} component={SplashScreen} />

        <Stack.Screen
          name={ScreenNames.MainTabs}
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name={ScreenNames.ProductDetailsScreen}
          component={ProductDetails}
        />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default RootNavigator