import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Header2 } from "../../compnents";
import theme from "../../../theme";
import moment from "moment";

export default function Chat({ navigation, route }) {
  let { name, profile } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const [userType, setUserType] = useState();
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hi there! How are you doing today?",
      date: new Date(),
    },
    {
      id: 2,
      message: "I'm doing pretty well, thanks for asking. How about you?",
      date: new Date(),
    },
    // {
    //   message: "I'm doing pretty well, thanks for asking. How about you?",
    //   date: new Date(),
    //   messageTYpe:
    // },
  ]);

  useEffect(() => {
    (async () => {
      setUserType(await AsyncStorage.getItem("userType"));
    })();
  });

  const sendMessage = () => {
    let newChat = [];
    newChat.push({
      id: 2,
      message: newMessage,
      date: new Date(),
    });
    setMessages([...messages, ...newChat]);
    setNewMessage("");
  };
  return (
    <SafeAreaView style={styles.container}>
      {userType === "user" ? (
        <Header title={name} backIcon={true} />
      ) : (
        <Header2 title={name} backIcon={true} call={true} />
      )}

      <View style={styles.dataMain}>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
          {messages.map((v, i) => {
            return (
              <View key={i}>
                {v.id === 1 ? (
                  <View style={styles.receiveMessageMain}>
                    <Text style={styles.receiveMessage}>{v.message}</Text>
                    <Text style={styles.receiveMessageTime}>
                      {moment(v.date).format("h:mm a")}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.sendMessageMain}>
                    <Text style={styles.sendMessage}>{v.message}</Text>
                    <Text style={styles.sendMessageTime}>
                      {moment(v.date).format("h:mm a")}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <TextInput
            placeholder="Type something..."
            placeholderTextColor={"#706F78"}
            style={styles.input}
            value={newMessage}
            onChangeText={(newMessage) => setNewMessage(newMessage)}
          />
          <View style={styles.footerButton}>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              disabled={newMessage === "" ? true : false}
              onPress={sendMessage}
            >
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.primary,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: theme.black,
    fontSize: 14,
    fontFamily: theme.medium,
    marginLeft: 15,
  },
  dataMain: {
    flex: 1,
    backgroundColor: theme.secondary,
    paddingTop: 5,
  },
  receiveMessageMain: {
    backgroundColor: theme.lightGray,
    marginTop: 15,
    maxWidth: 250,
    marginLeft: 20,
    borderRadius: 12,
    padding: 10,
    borderTopLeftRadius: 0,
  },
  receiveMessage: {
    color: theme.black,
    fontSize: 14,
    fontFamily: theme.regular,
  },
  receiveMessageTime: {
    color: "#A09FA6",
    fontSize: 12,
    fontFamily: theme.medium,
    textTransform: "uppercase",
    marginTop: 10,
  },
  sendMessageMain: {
    backgroundColor: theme.black,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 15,
    maxWidth: 250,
    marginLeft: 20,
    borderRadius: 12,
    padding: 10,
    borderTopRightRadius: 0,
  },
  sendMessage: {
    color: theme.white,
    fontSize: 14,
    fontFamily: theme.regular,
  },
  sendMessageTime: {
    color: theme.white,
    fontSize: 12,
    fontFamily: theme.medium,
    textTransform: "uppercase",
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  footerInner: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.gray,
    borderRadius: 8,
    height: 56,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  input: {
    color: theme.black,
    fontSize: 14,
    fontFamily: theme.regular,
    flex: 1,
    marginRight: 5,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
