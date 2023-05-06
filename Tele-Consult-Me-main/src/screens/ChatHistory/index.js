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
import { Header, Header2 } from "./../../compnents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../../../theme";

export default function ChatHistory({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [chats, setChats] = useState([
    {
      profile:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
      name: "Nicholas Tantara",
      lastMessage: "last consulted a week ago",
    },
    {
      profile:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
      name: "Nicholas Tantara",
      lastMessage: "last consulted a week ago",
    },
    {
      profile:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
      name: "Nicholas Tantara",
      lastMessage: "last consulted a week ago",
    },
    {
      profile:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
      name: "Nicholas Tantara",
      lastMessage: "last consulted a week ago",
    },
  ]);

  const [userType, setUserType] = useState();

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
        <Header title="Chat History" backIcon={false} />
      ) : (
        <Header2 title="Chat History" backIcon={false} />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {chats.map((val, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.chatCard}
              onPress={() => navigation.navigate("Chat", val)}
            >
              <Image source={{ uri: val.profile }} style={styles.image} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.name}>{val.name}</Text>
                <Text style={styles.lastMessage}>{val.lastMessage}</Text>
              </View>
            </TouchableOpacity>
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
});
