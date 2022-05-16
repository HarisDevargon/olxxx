import {StatusBar, StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';
import LoginScreen from './src/views/screens/LoginScreen';
import CreateAdScreen from './src/views/screens/CreateAdScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import UserAccount from './src/views/screens/UserAccount';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Myads from './src/views/screens/Myads';
import Chats from './src/views/screens/Chats';
import ChatListScreen from './src/views/screens/ChatListScreen';
import SeeAll from './src/screens/SeeAllScreen';
// import SearchBar from './src/views/screens/Maps';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 20},
      }}>
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Entypo name="home" size={25} color="black" />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="CHATS"
        component={ChatListScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="ios-chatbox-ellipses-outline"
              size={25}
              color="black"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="SELL"
        component={CreateAdScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/plus.png')}
              style={{
                width: 50,
                height: 50,
                tintColor: color,
                marginBottom: 30,
              }}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="MY ADS"
        component={Myads}
        options={{
          tabBarIcon: () => <Feather name="heart" size={25} color="black" />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="ACCOUNT"
        component={UserAccount}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-outline"
              size={25}
              color="black"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(true);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);

        userExist.getIdToken().then(jwt => {});
      } else {
        setUser('');
      }
    });
    return unsubscribe;
  }, []);

  //After login

  const AfterLogin = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabScreens"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SeeAllScreen"
            component={SeeAll}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  //  E  N  D

  //Befor Login

  const BeforLogin = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LOGIN"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  // E   N   D

  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      {user ? <AfterLogin /> : <BeforLogin />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
