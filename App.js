import { useContext, useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FormScreen from "./screens/FormScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RecentlyApplications from "./screens/RecentlyApplications";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "./constants/styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "./components/ui/IconButton";
import EditFormScreen from "./screens/EditFormScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import FormsContextProvider from "./store/form-context";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function RecentApplicationStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="Device Forms" component={RecentlyApplications} />
      <Stack.Screen name="EditFormScreen" component={EditFormScreen} />
    </Stack.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homepage") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Create Form") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Forms") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Αποσύνδεση") {
            iconName = focused ? "exit" : "exit-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Homepage"
        component={HomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton icon={"exit"} color={"red"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Form"
        component={FormScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton icon={"exit"} color={"red"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Forms"
        component={RecentApplicationStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <MyTabs />}
    </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const username = await AsyncStorage.getItem("username");
      const fullName = await AsyncStorage.getItem("fullName");
      const idAdmin = await AsyncStorage.getItem("idAdmin");
      if (storedToken) {
        authCtx.authenticate(username, fullName, storedToken, idAdmin, 1);
      }
    }
    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <FormsContextProvider>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </FormsContextProvider>
  );
}
