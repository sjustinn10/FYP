import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import theme from "../../../theme";

const { height, width } = Dimensions.get("window");

export default ({ navigation }) => {
  const fadeIn1 = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("VideoCall");
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("./../../../assets/operator1.png")}
        style={styles.profileImage}
        resizeMode="stretch"
      />

      <Text style={styles.name}>Connecting you...</Text>

      <View style={{ marginTop: 20 }}>
        <Animatable.View
          animation={fadeIn1}
          direction="alternate-reverse"
          iterationCount="infinite"
          duration={1700}
          easing="linear"
          style={styles.onGoingCall}
        >
          <Image
            source={require("./../../../assets/callGoing1.png")}
            style={styles.goingCallImage}
          />
        </Animatable.View>

        <Animatable.View
          animation={fadeIn1}
          direction="alternate-reverse"
          iterationCount="infinite"
          duration={1700}
          easing="linear"
          style={styles.onGoingCall}
        >
          <Image
            source={require("./../../../assets/callGoing2.png")}
            style={styles.goingCallImage}
          />
        </Animatable.View>
        <Animatable.View
          animation={fadeIn1}
          direction="alternate-reverse"
          iterationCount="infinite"
          duration={1700}
          easing="linear"
          style={styles.onGoingCall}
        >
          <Image
            source={require("./../../../assets/callGoing3.png")}
            style={styles.goingCallImage}
          />
        </Animatable.View>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate("ChatHistory")}
      >
        <Text style={styles.submitButtonTxt}>END</Text>
      </TouchableOpacity>
      <StatusBar barStyle="light-content" backgroundColor={theme.black} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.black,
  },
  profileImage: {
    width: width / 1.5,
    height: width / 1.5,
  },
  goingCallImage: {
    width: 36,
    height: 18,
    marginTop: 10,
  },
  name: {
    fontFamily: theme.medium,
    fontSize: 22,
    color: "#fff",
    marginTop: 20,
  },
  calling: {
    fontFamily: theme.regular,
    fontSize: 18,
    color: theme.white,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: theme.red,
    position: "absolute",
    width: "50%",
    alignSelf: "center",
    bottom: 40,
    height: 45,
    elevation: 2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonTxt: {
    color: theme.white,
    fontFamily: theme.medium,
  },
});
