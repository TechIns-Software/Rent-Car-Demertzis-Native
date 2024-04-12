import {useState,useEffect,useContext} from "react";

import  {NavigationContainer} from  '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RecentlyApplications from './screens/RecentlyApplications';
import FormScreen from './screens/FormScreen';

import { Colors } from './constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';

import  AuthContextProvider,{AuthContext} from './store/auth-context'
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormsContextProvider,{FormsContext} from "./store/form-context";
import { AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

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
    const authCtx = useContext(AuthContext);
    const formCtx = useContext(FormsContext);

  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Homepage') {
                iconName = focused
                    ? 'information-circle'
                    : 'information-circle-outline';
              } else if (route.name === 'Create Form') {
                iconName = focused ? 'list' : 'list-outline';
              }else  if (route.name === 'Device Forms'){
                iconName = focused ? 'folder' : 'folder-outline';
              }else  if (route.name === 'Αποσύνδεση'){
                  iconName = focused ? 'exit' : 'exit-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
      >
        <Tab.Screen name="Homepage" component={HomeScreen}
                    options={
            {     headerRight:({tintColor}) =><IconButton icon={'exit'}
                                                    color={'red'}
                                                    size={30}


            /> }}
        />
        <Tab.Screen name="Create Form" component={FormScreen}                  options={
            {     headerRight:({tintColor}) =><IconButton icon={'exit'}
                                                          color={'red'}
                                                          size={30}


                /> }}  />
        <Tab.Screen name="Device Forms" component={RecentlyApplications}               options={
            { headerRight:({tintColor}) =><IconButton icon={'exit'}
                                                          color={'red'}
                                                          size={30}

                /> }} />
      </Tab.Navigator>
  );
}

function Navigation() {
    const authCtx = useContext(AuthContext)
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack/>  }
            {authCtx.isAuthenticated &&  <MyTabs/>}
        </NavigationContainer>

    );
}

function Root(){
    const authCtx = useContext(AuthContext)
    useEffect(()=>{
        async function fetchToken(){
            const storedToken =  await AsyncStorage.getItem('token');
            const username =  await AsyncStorage.getItem('username');
            const fullName =  await AsyncStorage.getItem('fullName');
            const idAdmin =  await AsyncStorage.getItem('idAdmin');
            if (storedToken){
                authCtx.authenticate(username,fullName,storedToken,idAdmin,1);
            }

        }
        fetchToken();
    },[]);



    return <Navigation />
}

export default function App() {
  return (
          <FormsContextProvider>
              <AuthContextProvider>
                  <Root/>
              </AuthContextProvider>
          </FormsContextProvider>
  );
}


