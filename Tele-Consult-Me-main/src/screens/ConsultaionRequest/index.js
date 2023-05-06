import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Header2 } from "./../../compnents";
import theme from "../../../theme";

export default function ConsultaionRequests({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [userType, setUserType] = useState();

  const [consultaionRequests, setConsultaionRequests] = useState([
    {
      profile:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
      name: "Nicholas Tantara",
      topic: "Buying Policies",
    },
    {
      profile:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
      name: "Nicholas Tantara",
      topic: "Buying Policies",
    },
    {
      profile:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
      name: "Nicholas Tantara",
      topic: "Buying Policies",
    },
  ]);

  useEffect(() => {
    (async () => {
      setUserType(await AsyncStorage.getItem("userType"));
    })();
  });
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {userType === "user" ? (
        <Header title="Consultation Request" backIcon={true} />
      ) : (
        <Header2 title="Consultation Request" backIcon={true} />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {consultaionRequests.map((val, i) => {
          return (
            <View key={i} style={styles.chatCard}>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserProfile", val)}
              >
                <Image source={{ uri: val.profile }} style={styles.image} />
              </TouchableOpacity>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.name}>{val.name}</Text>
                <Text style={styles.lastMessage}>
                  <Text
                    style={{ color: theme.black, fontFamily: theme.medium }}
                  >
                    Topic:{"  "}
                  </Text>
                  {val.topic}
                </Text>
              </View>
              <TouchableOpacity style={styles.acceptButton}>
                <AntDesign name="check" size={20} color={theme.success} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton}>
                <AntDesign name="close" size={15} color={theme.red} />
                {/* <MaterialIcons name="delete" size={20} color={theme.red} /> */}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
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
  chatCard: {
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.gray,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  name: {
    fontFamily: theme.medium,
    color: theme.black,
    fontSize: 14,
  },
  lastMessage: {
    fontFamily: theme.regular,
    color: theme.gray,
    fontSize: 12,
  },
  acceptButton: {
    borderWidth: 1,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35 / 2,
    borderColor: theme.gray,
    marginRight: 10,
  },
});
