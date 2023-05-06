import React, { useEffect,useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { Header } from "./../../compnents";
import theme from "../../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const comapnyList = [
  { label: "hreat  Eastern", value: "hreat  Eastern" },
  { label: "AIA", value: "AIA" },
  { label: "AXA", value: "AXA" },
  { label: "Prudential", value: "Prudential" },
  { label: "Tokyo Mamine", value: "Tokyo Mamine" },
];
const insuranceList = [
  { label: "Hospitalization", value: "Hospitalization" },
  { label: "Wealth Accumalation", value: "Wealth Accumalation" },
  { label: "Wealth Acceleration", value: "Wealth Acceleration" },
  { label: "Disablity", value: "Disablity" },
  { label: "Critical Illness", value: "Critical Illness" },
];

export default function MyPolicies() {
  const [modalVisible, setModalVisible] = useState(false);
  const [comapny, setComapny] = useState(null);
  const [typeOfInsurance, setTypeOfInsurance] = useState(null);
  const [product, setProduct] = useState(null);

  const [policies, setPolicies] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  //   {
  //     comapnyName: "hReat Eastern",
  //     insurance: "Wealth Accumalation",
  //     nameOfProduct: "hreat wealth Advantage",
  //   },
  //   {
  //     comapnyName: "Prudential",
  //     insurance: "Hospitalization",
  //     nameOfProduct: "Pre Health",
  //   },
  // ]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id=await AsyncStorage.getItem('id')
      const policiesdata = await Axios.post('http://192.168.43.183:8080/userpolicies',{userid:id});
      console.log(policiesdata.data)
      console.log(policiesdata.data.length)

      if(policiesdata.data==="User do not have any policies"){
        console.log(policiesdata.data)
        setPolicies[ {
          policies_company:policiesdata.data ,
          policies_type: "",
          policies_name: "",
            }]
      }else{
        setPolicies(policiesdata.data)
      }

    } catch (error) {
      console.error(error);
    }
  };

  const addPolicy = async() => {
    const id=await AsyncStorage.getItem('id')
    if (comapny === "") {
      setErrorMessage("Please select the company");
    } else if (typeOfInsurance === "") {
      setErrorMessage("Please select thte type of insurance");
    }else if(product===""){
      setErrorMessage("Name of Product cannot be empty");
    }
     else {
     await Axios.post('http://192.168.43.183:8080/addpolicies', {product:product,type:typeOfInsurance,company:comapny,id:id}).then(res=>{
        console.log(res.data)
        if(res.data==="Success"){
          fetchData();
          setModalVisible(false);
        }else{
          console.log("something went wrong")
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
      <Header title="My Policies" backIcon={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {policies.map((val, i) => {
            return (
              <View key={i} style={styles.policyCard}>
                <View>
                  <Text style={styles.comapnyName}>{val.policies_company}</Text>
                  <Text style={styles.comapnyName}>{val.policies_type}</Text>
                  <Text style={styles.comapnyName}>{val.policies_name}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.addPolicyBtn}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="add-circle" size={50} color="black" />
          </TouchableOpacity>
          <Text style={styles.addPolicyTxt}>Add Policy</Text>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={20} color={theme.gray} />
            </TouchableOpacity>
            <View style={styles.inputView}>
              <Text style={styles.label}>Comapny*</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={comapnyList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={comapny}
                onChange={(item) => {
                  setComapny(item.value);
                }}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Type of insurance*</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={insuranceList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={typeOfInsurance}
                onChange={(item) => {
                  setTypeOfInsurance(item.value);
                }}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Name of Product*</Text>
              <TextInput
                placeholder=""
                style={styles.textInput}
                placeholderTextColor="#AAB0B7"
                value={product}
                onChangeText={(value) => {
                  setProduct(value);
                  setErrorMessage("");
                }}
              />
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => addPolicy()}
            >
              <Text style={styles.submitButtonTxt}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    textAlign: "center",
    marginTop: 30,
    fontFamily: theme.semiBold,
    fontSize: 20,
  },
  consultsSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    marginTop: 30,
    // borderWidth: 1,
  },
  consultSec: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    // borderWidth: 1,
  },
  consultImage: {
    width: 100,
    height: 100,
  },
  label: {
    fontFamily: theme.medium,
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputView: {
    width: "95%",
    marginTop: 15,
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
  addPolicyBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addPolicyTxt: {
    color: theme.black,
    fontFamily: theme.medium,
    fontSize: 14,
  },
  policyCard: {
    // borderBottomWidth: 1,
    padding: 20,
    // borderBottomColor: theme.gray,
    backgroundColor: theme.lightGray,
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 8,
    elevation: 3,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.gray,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  placeholderStyle: {
    color: theme.gray,
    fontFamily: theme.medium,
    fontSize: 14,
  },
  selectedTextStyle: {
    color: theme.black,
    fontFamily: theme.regular,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: theme.black,
    width: "95%",
    alignSelf: "center",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonTxt: {
    color: theme.white,
    fontFamily: theme.medium,
  },
  comapnyName: {
    color: theme.black,
    fontFamily: theme.medium,
  },
});
