import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialIcons, Feather, Octicons, Ionicons } from "@expo/vector-icons";
import theme from "../../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";


const screens = Dimensions.get("window");
const CustomDrawerContent = (props) => {
  const [userType, setUserType] = useState();
  useEffect(() => {
    (async () => {
      setUserType(await AsyncStorage.getItem("userType"));
    })();
  });
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: theme.white,
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      {userType==="user"?( <View style={styles.sideMenuContainer}>
        <View>
          <View style={styles.closeMain}>
            <TouchableOpacity
              style={styles.colseButton}
              onPress={() => props.navigation.closeDrawer()}
            >
              <Ionicons name="close" size={25} style={{ color: "#889EC6" }} />
            </TouchableOpacity>
          </View>
          {/* <Text style={[styles.heading, { color: theme.black }]}>Menu</Text> */}

          <TouchableOpacity
            style={[styles.list]}
            onPress={() => {
              props.navigation.navigate("ChatHistory");
            }}
          >
            <Text
              style={[
                styles.listTitle,
                {
                  color: theme.black,
                  opacity: 1,
                },
              ]}
            >
              Chat History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.list]}
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          >
            <Text
              style={[
                styles.listTitle,
                {
                  color: theme.black,
                  opacity: 1,
                },
              ]}
            >
              Personal Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.list]}
            onPress={() => {
              props.navigation.navigate("ConsultaionRequests");
            }}
          >
            <Text
              style={[
                styles.listTitle,
                {
                  color: theme.black,
                  opacity: 1,
                },
              ]}
            >
              Consultation Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={[styles.list]}
          onPress={async () =>{ 
            props.navigation.navigate("Login")
            await AsyncStorage.clear();
          }}
        >
          <MaterialIcons
            name="logout"
            size={20}
            style={{
              color: theme.primary,
            }}
          />
          <Text style={[styles.listTitle, { color: theme.primary }]}>
            Log out
          </Text>
        </TouchableOpacity>
        </View>
      </View>):( 
      <View style={styles.sideMenuContainer}>
        <View>
          <View style={styles.closeMain}>
            <TouchableOpacity
              style={styles.colseButton}
              onPress={() => props.navigation.closeDrawer()}
            >
              <Ionicons name="close" size={25} style={{ color: "#889EC6" }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          style={[styles.list]}
          onPress={async () =>{ 
            props.navigation.navigate("Login")
            await AsyncStorage.clear();
          }}
        >
          <MaterialIcons
            name="logout"
            size={20}
            style={{
              color: theme.primary,
            }}
          />
          <Text style={[styles.listTitle, { color: theme.primary }]}>
            Log out
          </Text>
        </TouchableOpacity>
        </View>
      </View>)}
     
    </DrawerContentScrollView>
  );
};
let styles = StyleSheet.create({
  sideMenuContainer: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    height: screens.height * 0.97,
  },
  closeMain: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 10,
  },
  colseButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontFamily: theme.semiBold,
    marginHorizontal: 20,
  },
  list: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.gray,
  },
  listTitle: {
    fontSize: 16,
    fontFamily: theme.medium,
    marginTop: 5,
  },
  logOutButton: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  logOutButtonText: {
    fontSize: 20,
    fontFamily: theme.medium,
    marginTop: 5,
    marginLeft: 15,
  },
});
export default CustomDrawerContent;
