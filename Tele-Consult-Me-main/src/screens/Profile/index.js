import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Header, Header2 } from "../../compnents";
import theme from "../../../theme";
import Axios from 'axios';
import { set } from "react-native-reanimated";


export default function Profile({ navigation }) {
  const [eyeIcon, setEyeIcon] = useState(true);
  const [checkBox, setCheckBox] = useState(false);
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [newheight, setNewHeight] = useState("");
  const [newweight, setNewWeight] = useState("");
  const [reportId, setReportId] = useState("");
  const [password, setPassword] = useState("P@ssw0rd123!");
  const [company, setCompany]=useState("")
  const [image, setImage] = useState(null);
  const [pastMedicalRecords, setPastMedicalRecords] = useState("");
  const [changePass,setChangePass]= useState(false)
  const [changeHeight,setChangeHeights]= useState(false)
  const [changeWeight,setChangeWeight]= useState(false)
  const [changeMed,setChangeMed]= useState(false)
  const [detail,setDetail]=useState([])
  const [count,setCount]=useState("")
  
  useEffect(() => {

    (async () => {
      setUserType(await AsyncStorage.getItem("userType"));
      fetchData();
    })();
  },[]);
  const updateUser = async()=>{
    console.log("update pressed")
    const id = await AsyncStorage.getItem('id')
    if(changeHeight===false){
      console.log("enter 1")
      setHeight(detail.data[0].height)
    }
    if(changeMed===false){
      console.log("enter 2")
      setPastMedicalRecords(detail.data[0].med_condition)
      
    }
    if(changePass===false){
      console.log("enter 3")
      setPassword(detail.data[0].password)
    }
    if(changeWeight===false){
      console.log("enter 4")
      setWeight(detail.data[0].weight)
    }
    console.log(height)
    console.log(weight)
    console.log(password)
    console.log(pastMedicalRecords)

    const updated = await Axios.post('http://192.168.43.183:8080/update',{userid:id,height:height,weight:weight,password:password,medRecord:pastMedicalRecords});
    console.log("here:"+updated.data)
    if(updated){
      setChangeHeights(false)
      setChangeMed(false)
      setChangePass(false)
      setChangeWeight(false)
      fetchData()
      setPassword("P@ssw0rd123!")
    }
  }
  const fetchData = async () => {
    try {
      const id=await AsyncStorage.getItem('id')
      let getdetail = await Axios.post('http://192.168.43.183:8080/getDetail',{userid:id});
      if(getdetail.data==="User does not exist error happen"){
        console.log(id)
        console.log("User does not exist error happen")
      }else{

        console.log("success")
   
        setEmail(getdetail.data[0].email)
        setFullName(getdetail.data[0].name)
        //setPassword(detail.data[0].password)
        setHeight(getdetail.data[0].height)
        setWeight(getdetail.data[0].weight)
        setPastMedicalRecords(getdetail.data[0].med_condition)
        setReportId(getdetail.data[0].rep_number)
        setCompany(getdetail.data[0].company)
        setDetail(getdetail)
        console.log(detail)
      }

      // if(detail.data==="User do not have any policies"){
      //   console.log(policiesdata.data)
      //   setPolicies[ {
      //     policies_company:policiesdata.data ,
      //     policies_type: "",
      //     policies_name: "",
      //       }]
      // }else{
      //   setPolicies(policiesdata.data)
      // }

    } catch (error) {
      console.error(error);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userType === "user" ? (
        <Header title="Profile" backIcon={true} />
      ) : (
        <Header2 title="Profile" backIcon={true} />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.welcomeSec}>
          <TouchableOpacity onPress={() => pickImage()}>
            {image ? (
              <Image source={{ uri: image }} style={styles.userImage} />
            ) : (
              <Image
                source={require("./../../../assets/user.png")}
                style={styles.userImage}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.welcomeTxt}>{userType}</Text>
        </View>

        {userType === "admin" ? (
          <>
            <View style={[styles.inputView, { marginTop: 30 }]}>
              <TextInput
                placeholder="Full Name"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={fullName}
                //onChangeText={(value) => setFullName(value)}
              />
            </View>
            <View style={[styles.inputView, { marginTop: 30 }]}>
              <TextInput
                placeholder="Rep No./Medical Registration ID"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={reportId}
               // onChangeText={(value) => setReportId(value)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={email}
                //onChangeText={(value) => setEmail(value)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                secureTextEntry={eyeIcon}

                value={password}
                onChangeText={
                  (value) => {
                  setChangePass(true)
                  setPassword(value)}
                  
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Company"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={company}
                // onChangeText={(value) => setEmail(value)}
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
                value={fullName}
                //onChangeText={(value) => setFullName(value)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                placeholder="Email Address"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={email}
               // onChangeText={(value) => setEmail(value)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                secureTextEntry={eyeIcon}
                value={password}
                onChangeText={
                  (value) => {
                  setChangePass(true)
                  setPassword(value)}
                  
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Height"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={height}
                // onChange={e => handleTextChange(e.target.value)
                 onChangeText={
                    (value) =>{
                    setChangeHeights(true)
                    console.log(changeHeight)
                    setHeight(value)
                    console.log(height)
                }
              }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Weight"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={weight}
                onChangeText={(value) => {
                  setChangeWeight(true)
                  setWeight(value)
                }}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Past Medical Condition/Allergies"
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={pastMedicalRecords}
                onChangeText={(value) => {
                  setChangeMed(true)
                  setPastMedicalRecords(value)
                }}
              />
            </View>
          </>
        )}
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => updateUser()}
        >
          <Text style={styles.signUpBtnTxt}>EDIT PROFILE 1</Text>
        </TouchableOpacity>
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
  userImage: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
  },
  welcomeSec: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  welcomeTxt: {
    fontFamily: theme.medium,
    fontSize: 16,
    color: theme.black,
    marginTop: 20,
    textTransform: "capitalize",
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
});
