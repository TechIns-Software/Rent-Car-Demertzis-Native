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
    const [numberOfForms,SetNumberOfForms] = useState(0)
    const authCtx = useContext(AuthContext);
    const formCtx = useContext(FormsContext);

    AsyncStorage.getItem("numberOfForms").then((value) => {
        SetNumberOfForms(value);
    })
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
              }else  if (route.name === 'Αιτήσεις στην Συσκευή'){
                iconName = focused ? 'ios-folder' : 'ios-folder-outline';
              }else  if (route.name === 'Αποσύνδεση'){
                  iconName = focused ? 'ios-exit' : 'ios-exit-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
      >
        <Tab.Screen name="Αρχική" component={HomeScreen}
                    options={
            {     headerRight:({tintColor}) =><IconButton icon={'exit'}
                                                    color={'red'}
                                                    size={30}
                                                    onPress={authCtx.logout}

            /> }}
        />
        <Tab.Screen name="Δημιουργία Αίτησης" component={FormScreen}                  options={
            {     headerRight:({tintColor}) =><IconButton icon={'exit'}
                                                          color={'red'}
                                                          size={30}
                                                          onPress={authCtx.logout}

                /> }}  />
        <Tab.Screen name="Αιτήσεις στην Συσκευή" component={RecentlyApplications}               options={
            {tabBarBadge:numberOfForms,     headerRight:({tintColor}) =><IconButton icon={'exit'}
                                                          color={'red'}
                                                          size={30}
                                                          onPress={authCtx.logout}

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
            if (storedToken){
                authCtx.authenticate('','',storedToken,'',1);
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


