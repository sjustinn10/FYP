import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Header } from "./../../compnents";
import theme from "../../../theme";

export default function TCMRequest({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Consultation Request" backIcon={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputView}>
          <Text style={styles.label}>Topic*</Text>
          <TextInput
            placeholder=""
            style={styles.textInput}
            placeholderTextColor="#AAB0B7"
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Describe Your Symptoms*</Text>
          <TextInput
            placeholder=""
            style={[
              styles.textInput,
              { height: 150, textAlignVertical: "top" },
            ]}
            placeholderTextColor="#AAB0B7"
            multiline={true}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate("Calling")}
      >
        <Text style={styles.submitButtonTxt}>Submit</Text>
      </TouchableOpacity>
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
  },
  consultSec: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
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
    color: theme.gray,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: theme.black,
    position: "absolute",
    width: "85%",
    alignSelf: "center",
    bottom: 10,
    height: 50,
    elevation: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonTxt: {
    color: theme.white,
    fontFamily: theme.medium,
  },
});
