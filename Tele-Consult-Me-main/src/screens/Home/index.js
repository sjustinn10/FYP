import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Header2 } from "./../../compnents";
import theme from "../../../theme";

export default function Home({ navigation }) {
  const [userType, setUserType] = useState();
  useEffect(() => {
    (async () => {
      setUserType(await AsyncStorage.getItem("userType"));
    })();
  });
  return (
    <SafeAreaView style={styles.container}>
      {userType === "user" ? (
        <Header backIcon={false} />
      ) : (
        <Header2 backIcon={false} />
      )}
      <Text style={styles.heading}>TELE-CONSULT</Text>
      {userType === "user" ? (
        <>
          <TouchableOpacity
            style={styles.consultSec}
            onPress={() => navigation.navigate("TCMRequest")}
          >
            <Image
              source={require("./../../../assets/operator1.png")}
              style={styles.consultImage}
            />
            <Text style={styles.label}>Consult TCM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consultSec}
            onPress={() => navigation.navigate("FinancialRequest")}
          >
            <Image
              source={require("./../../../assets/operator1.png")}
              style={styles.consultImage}
            />
            <Text style={styles.label}>Consult Financial Advisor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consultSec}
            onPress={() => navigation.navigate("MyPolicies")}
          >
            <Image
              source={require("./../../../assets/corporate-policy.png")}
              style={styles.consultImage}
            />
            <Text style={styles.label}>View My Policies</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.consultSec}
            onPress={() => navigation.navigate("ConsultaionRequests")}
          >
            <Image
              source={require("./../../../assets/to-do-list.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.label}>Consultation Retquests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consultSec}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={require("./../../../assets/user-data.png")}
              style={styles.consultImage}
            />
            <Text style={styles.label}>Personal Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.consultSec}
            onPress={() => navigation.navigate("ChatHistory")}
          >
            <Image
              source={require("./../../../assets/chat-box.png")}
              style={styles.consultImage}
            />
            <Text style={styles.label}>Chat History</Text>
          </TouchableOpacity>
        </>
      )}
      {/* </View> */}
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
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    height: 100,
    backgroundColor: theme.white,
    // elevation: 10,
    borderRadius: 8,
    borderColor: theme.gray,
    paddingHorizontal: 10,
  },
  consultImage: {
    width: 50,
    height: 50,
  },
  label: {
    fontFamily: theme.medium,
    textAlign: "center",
    fontSize: 16,
    marginLeft: 10,
  },
});
