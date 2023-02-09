import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  {NavigationContainer} from  '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./screens/HomeScreen";
import RecentlyApplications from './screens/RecentlyApplications';
import FormScreen from './screens/FormScreen';
import LoginScreen from "./screens/LoginScreen";
import { Colors } from './constants/styles';
import {useState} from "react";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}
function MyTabs() {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Αρχική') {
                iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
              } else if (route.name === 'Δημιουργία Αίτησης') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }else  if (route.name === 'Πρόσφατες Αιτήσεις'){
                iconName = focused ? 'ios-folder' : 'ios-folder-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
        <Tab.Screen name="Αρχική" component={HomeScreen} />
        <Tab.Screen name="Δημιουργία Αίτησης" component={FormScreen}   />
        <Tab.Screen name="Πρόσφατες Αιτήσεις" component={RecentlyApplications} options={{ tabBarBadge: 3 }} />
      </Tab.Navigator>
  );
}

function Root(){

    const [isLogin,setIsLogin] = useState(true)
    //// TO CHANGE FROM LOGIN SCREEN TO OTHER PAGES CHANGE  the above to TRUE

    return ( isLogin == true ? <MyTabs/> : <AuthStack/> )
}

export default function App() {
  return (
      <NavigationContainer>
        <Root />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
