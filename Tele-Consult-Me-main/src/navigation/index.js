import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./drawerContent";
import ConsultaionRequests from "../screens/ConsultaionRequest";
import FinancialRequest from "../screens/FinancialRequest";
import ChatHistory from "../screens/ChatHistory";
import UserProfile from "../screens/UserProfile";
import TCMRequest from "../screens/TCMRequest";
import MyPolicies from "../screens/MyPolicies";
import VideoCall from "../screens/VideoCall";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Calling from "../screens/Calling";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Chat from "../screens/Chat";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="slide"
      overlayColor="transparent"
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        flex: 1,
        width: "75%",
        height: 320,
        marginTop: 170,
        borderRightWidth: 0,
        backgroundColor: "transparent",
      }}
      screenOptions={{
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="TCMRequest"
        component={TCMRequest}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="FinancialRequest"
        component={FinancialRequest}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="MyPolicies"
        component={MyPolicies}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="ChatHistory"
        component={ChatHistory}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Calling"
        component={Calling}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="VideoCall"
        component={VideoCall}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="ConsultaionRequests"
        component={ConsultaionRequests}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false, swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
