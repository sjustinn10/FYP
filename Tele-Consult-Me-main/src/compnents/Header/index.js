import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../theme";

export default function Header({ title, backIcon }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      {backIcon ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="keyboard-backspace"
            size={30}
            color={theme.black}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Entypo name="menu" size={30} color={theme.black} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.white,
    paddingHorizontal: "5%",
    paddingVertical: 15,
    elevation: 5,
  },
  title: {
    fontFamily: theme.medium,
    fontSize: 16,
    color: theme.black,
  },
});
