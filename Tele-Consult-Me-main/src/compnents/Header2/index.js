import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../theme";

export default function Header2({ title, backIcon, call }) {
  const navigation = useNavigation();

  // return (
  //   <SafeAreaView style={styles.header}>
  //     {backIcon ? (
  //       <TouchableOpacity onPress={() => navigation.goBack()}>
  //         <MaterialIcons
  //           name="keyboard-backspace"
  //           size={30}
  //           color={theme.black}
  //         />
  //       </TouchableOpacity>
  //     ) : null}
  //     <Text
  //       style={[styles.title, call ? { flex: 1, textAlign: "center" } : null]}
  //     >
  //       {title}
  //     </Text>
  //     {call ? (
  //       <TouchableOpacity onPress={() => navigation.navigate("Calling")}>
  //         <Ionicons name="call-outline" size={24} color="black" />
  //       </TouchableOpacity>
  //     ) : null}
  //   </SafeAreaView>
  // );
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

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     // justifyContent: "space-between",
//     backgroundColor: theme.white,
//     paddingHorizontal: "5%",
//     paddingVertical: 15,
//     elevation: 5,
//   },
//   title: {
//     fontFamily: theme.medium,
//     fontSize: 16,
//     color: theme.black,
//     marginLeft: 10,
//   },
// });
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