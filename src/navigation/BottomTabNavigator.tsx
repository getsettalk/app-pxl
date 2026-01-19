import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenNames from '@constants/ScreenNames';
import { View, Text } from 'react-native';
import ProductScreen from '@features/main/ProductScreen';
import Colors from '@theme/colors';

import {
  Home,
  Heart,
  ShoppingBag,
  User,
  Settings,
} from 'lucide-react-native';

const DummyScreen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{title}</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { height: 65 },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case ScreenNames.ProductListScreen:
              return <Home color={color} size={size} />;
            case ScreenNames.LikesScreen:
              return <Heart color={color} size={size} />;
            case ScreenNames.BagScreen:
              return <ShoppingBag color={color} size={size} />;
            case ScreenNames.ProfileScreen:
              return <User color={color} size={size} />;
            case ScreenNames.SettingScreen:
              return <Settings color={color} size={size} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen
        name={ScreenNames.ProductListScreen}
        component={ProductScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={ScreenNames.LikesScreen}
        children={() => <DummyScreen title="Likes" />}
      />
      <Tab.Screen
        name={ScreenNames.BagScreen}
        children={() => <DummyScreen title="Bag" />}
      />
      <Tab.Screen
        name={ScreenNames.ProfileScreen}
        children={() => <DummyScreen title="Profile" />}
      />
      <Tab.Screen
        name={ScreenNames.SettingScreen}
        children={() => <DummyScreen title="Setting" />}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
