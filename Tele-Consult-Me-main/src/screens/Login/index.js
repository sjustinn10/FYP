import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../../../theme";
import Axios from 'axios';

// Save the access token
const saveAccessToken = async (accessToken) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    console.log('Access token saved successfully.');
  } catch (error) {
    console.log('Error saving access token:', error);
  }
};

// Retrieve the access token
const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.log('Error getting access token:', error);
    return null;
  }
};

export default function Login({ navigation }) {
  const [eyeIcon, setEyeIcon] = useState(true);
  const [checkBox, setCheckBox] = useState(false);
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    if (email === "") {
      setErrorMessage("Incorrect Email or Password");
    } else if (password === "") {
      setErrorMessage("Incorrect Email or Password");
    } else {
      Axios.post('http://192.168.43.183:8080/login', { email: email,password:password, userType:userType}).then(async res=>{
        console.log(res.data)
        if(res.data.login===true){
          saveAccessToken(res.data.accessToken)
          await AsyncStorage.setItem('id', res.data.id);
          await AsyncStorage.setItem("userType", userType);
          // if (userType === "user") {
          navigation.navigate("DrawerNavigation");
          // } else {
          //   navigation.navigate("AdminHome");
          // }
          //navigation.navigate("DrawerNavigation");
        }else{
          setErrorMessage("Incorrect Email or Password");
        }
       
      })
      .catch(error => {
        if (error.response) {
          // Handle error response
          console.log(error.response.data);

        } else if (error.request) {
          // Handle network error
          console.log('Network Error');
        } else {
          // Handle other error
          console.log('Error', error.message);
        }
      });
      //navigation.navigate("DrawerNavigation");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeSec}>
        <Image
          source={require("./../../../assets/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.userTypesSec}>
        <TouchableOpacity
          style={[
            styles.userTypeSec,
            userType === "user"
              ? { borderBottomWidth: 2, borderBottomColor: theme.black }
              : null,
          ]}
          onPress={() => setUserType("user")}
        >
          <Text style={styles.userTxt}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userTypeSec,
            userType === "admin"
              ? { borderBottomWidth: 2, borderBottomColor: theme.black }
              : null,
          ]}
          onPress={() => setUserType("admin")}
        >
          <Text style={styles.userTxt}>Admin</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.inputView, { marginTop: 30 }]}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          placeholderTextColor="#AAB0B7"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrorMessage("");
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          placeholderTextColor="#AAB0B7"
          secureTextEntry={eyeIcon}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setErrorMessage("");
          }}
        />
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={styles.chekcBoxsec}>
        <TouchableOpacity onPress={() => setCheckBox(!checkBox)}>
          {checkBox ? (
            <MaterialIcons name="check-box" size={24} color={theme.primary} />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              size={24}
              color={theme.primary}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.termsTxt}>Remember my login</Text>
      </View>

      <TouchableOpacity style={styles.signUpBtn} onPress={() => login()}>
        <Text style={styles.signUpBtnTxt}>LOGIN</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        <Text style={styles.dontHaveTxt}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signUpTxt}> Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: "center",
    // alignItems: "center",
  },
  logo: {
    width: 200,
    height: 150,
  },
  welcomeSec: {
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtn: {
    backgroundColor: theme.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    elevation: 2,
    borderRadius: 8,
    width: "85%",
    marginTop: 20,
    alignSelf: "center",
  },
  signUpBtnTxt: {
    textAlign: "center",
    color: theme.white,
    fontFamily: theme.medium,
    fontSize: 14,
  },
  inputView: {
    width: "85%",
    marginTop: 15,
    alignSelf: "center",
  },
  textInput: {
    color: theme.primary,
    fontFamily: theme.medium,
    fontSize: 14,
    height: 50,
    borderWidth: 1,
    borderColor: theme.gray,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 1,
  },
  label: {
    fontFamily: theme.medium,
    color: theme.black,
    fontSize: 14,
  },
  dontHaveTxt: {
    color: "#243443",
    fontFamily: theme.regular,
    fontSize: 14,
  },
  signUpTxt: {
    color: theme.primary,
    fontFamily: theme.medium,
    fontSize: 14,
  },
  chekcBoxsec: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginTop: 10,
    alignSelf: "center",
  },
  checkBox: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.primary,
  },
  checkBoxSelected: {
    backgroundColor: theme.primary,
    width: 13,
    height: 13,
    borderRadius: 4,
  },
  termsTxt: {
    marginLeft: 10,
    alignItems: "center",
    color: theme.black,
    fontFamily: theme.regular,
    fontSize: 12,
  },
  userTypesSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userTypeSec: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  userTxt: {
    fontFamily: theme.semiBold,
    fontSize: 16,
  },
  errorMessage: {
    color: theme.red,
    fontFamily: theme.regular,
    fontSize: 14,
    width: "85%",
    alignSelf: "center",
    marginTop: 10,
  },
});
