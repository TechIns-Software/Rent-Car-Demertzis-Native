import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  {NavigationContainer} from  '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from "./screens/HomeScreen";
import RecentlyApplications from './screens/RecentlyApplications';
import FormScreen from './screens/FormScreen';
const Tab = createBottomTabNavigator();

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

export default function App() {
  return (
      <NavigationContainer>
        <MyTabs />
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
