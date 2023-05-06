import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import theme from "../../../theme";
import Axios from 'axios';


export default function Register({ navigation }) {
  const [eyeIcon, setEyeIcon] = useState(true);
  const [checkBox, setCheckBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("user");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCfm, setPasswordCfm] = useState("");
  const [height, setHeight]=useState("")
  const [weight, setWeigh]=useState("")
  const [allergies, setAllergies]=useState("")
  const [rep, setRep]=useState("")
  const [company,setCompany]=useState("")

  const userRegister = () => {
    console.log("pressed")
    console.log(userType)
    console.log(fullname)
    console.log(email)
    if(userType==="user"){
      if (email === "") {
        setErrorMessage("Email is required");
      } else if (password === "") {
        setErrorMessage("Password is required");
      }  else {
        Axios.post('http://192.168.43.183:8080/signup', { user:userType,fullname:fullname,email: email,password:password,height:height,weight:weight,allergies:allergies }).then(res=>{
          console.log(res.data)
          if(res.data==="Success"){
            console.log(res.data)
            navigation.navigate("Login")
          }else{
            setErrorMessage(res.data)
          }
          // if(res.data.login===true){
          //   saveAccessToken(res.data.accessToken)
          //   navigation.navigate("DrawerNavigation");
          // }else{
          //   setErrorMessage("Incorrect Email or Password");
          // }
         
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
    }else{
      if (email === "") {
        setErrorMessage("Email is required");
      } else if (password === "") {
        setErrorMessage("Password is required");
      } 
      else if (company === "") {
        setErrorMessage("Company is required");
      } 
      else if (rep === "") {
        setErrorMessage("Rep No./Medical Registration ID is required");
      } 
      else {
        Axios.post('http://192.168.43.183:8080/signup', { user:userType,email: email,password:password,rep:rep,company:company,fullname:fullname}).then(res=>{
          console.log(res.data)
          if(res.data==="Success"){
            console.log(res.data)
            navigation.navigate("Login")
          }else{
            setErrorMessage(res.data)
          }
          // if(res.data.login===true){
          //   saveAccessToken(res.data.accessToken)
          //   navigation.navigate("DrawerNavigation");
          // }else{
          //   setErrorMessage("Incorrect Email or Password");
          // }
         
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
    }
   
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.welcomeSec}>
          <Image
            source={require("./../../../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.welcomeTxt}>Welcome to my TCM!</Text>
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
        {userType === "admin" ? (
          <>
            <View style={[styles.inputView, { marginTop: 30 }]}>
              <TextInput
                placeholder="Full Name"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={fullname}
                onChangeText={(value) => {
                  setFullname(value);
                  setErrorMessage("");
                }}
              />
            </View>
            <View style={[styles.inputView, { marginTop: 30 }]}>
              <TextInput
                placeholder="Rep No./Medical Registration ID"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={rep}
                onChangeText={(value) => {
                  setRep(value);
                  setErrorMessage("");
                }}
              />
            </View>
            <View style={styles.inputView}>
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
            <View style={styles.inputView}>
              {/* <Text style={styles.label}>Confirm Password</Text> */}
              <TextInput
                placeholder="Confirm Password"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                secureTextEntry={eyeIcon}                
                value={passwordCfm}
                onChangeText={(value) => {
                  setPasswordCfm(value);
                  if(passwordCfm!=password){
                    setErrorMessage("Password Does Not Match!");
                  }else{
                    setErrorMessage("");
                  }
                }}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Company"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={company}
                onChangeText={(value) => {
                  setCompany(value);
                  setErrorMessage("");
                }}
              />
            </View>
          </>
        ) : (
          <>
            <View style={[styles.inputView, { marginTop: 30 }]}>
              <TextInput
                placeholder="Full Name"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={fullname}
                onChangeText={(value) => {
                  setFullname(value);
                  setErrorMessage("");
                }}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                placeholder="Email Address"
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
            <View style={styles.inputView}>
              <TextInput
                placeholder="Confirm Password"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                secureTextEntry={eyeIcon}
                value={passwordCfm}
                onChangeText={(value) => {
                  setPasswordCfm(value);
                  if(passwordCfm!=password){
                    setErrorMessage("Password Does Not Match!");
                  }else{
                    setErrorMessage("");
                  }
                }}
              />
            </View>
            <Text style={styles.medicalHistory}>Medical History</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Height"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={height}
                onChangeText={(value) => {
                  setHeight(value);
                  setErrorMessage("");
                }}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Weight"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={weight}
                onChangeText={(value) => {
                  setWeigh(value);
                  setErrorMessage("");
                }}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Past Medical Condition/Allergies"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={allergies}
                onChangeText={(value) => {
                  setAllergies(value);
                  setErrorMessage("");
                }}
              />
            </View>
          </>
        )}
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => userRegister()}
        >
          <Text style={styles.signUpBtnTxt}>REGISTER</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          <Text style={styles.dontHaveTxt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpTxt}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  welcomeTxt: {
    fontFamily: theme.medium,
    fontSize: 16,
    color: theme.black,
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
  medicalHistory: {
    fontFamily: theme.semiBold,
    fontSize: 16,
    marginTop: 20,
    width: "85%",
    alignSelf: "center",
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
