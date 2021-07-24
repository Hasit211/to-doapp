import React,{useState,useEffect} from 'react';
import {NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from './screens/EditList';
import Login from './screens/Login';
import Colors from './constants/Colors';
import Settings from './screens/Settings';
import * as firebase from "firebase";


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AuthScreens = () =>{
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen name = "Login" component={Login}/>
    </AuthStack.Navigator>
  );
}
const Screens = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen  name="Welcome Back User" component={Home} options={{ title: 'Awesome app' }} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
              name="ToDoList"
              component={ToDoList}
              options={({ route }) => {
                  return {
                      title: route.params.title,
                      headerStyle: {
                          backgroundColor: route.params.color,
                      },
                      headerTintColor: "white",
                  };
              }}
          />
          <Stack.Screen
              name="Edit"
              component={EditList}
              options={({ route }) => {
                  return {
                      title: route.params.title
                          ? `Edit ${route.params.title} list`
                          : "Create new list",
                      headerStyle: {
                          backgroundColor: route.params.color || Colors.blue,
                      },
                      headerTintColor: "white",
                  };
              }}
          />
      </Stack.Navigator>
  );
};
export default function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
        setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
        console.log("Checking auth state...");
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    });
}, []);
  return (
    <NavigationContainer>
        {isAuthenticated ? <Screens/> : <AuthScreens/> }
    </NavigationContainer>
    
  );
}

var firebaseConfig = {
  apiKey: "AIzaSyBVgC6WYCuPGFpt_dPyCYCzyT3l6DmWTc4",
  authDomain: "firetodo-e3523.firebaseapp.com",
  projectId: "firetodo-e3523",
  storageBucket: "firetodo-e3523.appspot.com",
  messagingSenderId: "171507800891",
  appId: "1:171507800891:web:509210eb8072e2b2b7751e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);