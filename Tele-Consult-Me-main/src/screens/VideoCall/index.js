import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";
import theme from "../../../theme";

const { height, width } = Dimensions.get("window");

export default function VideoCall({ navigation }) {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}></View>
      </Camera>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls={false}
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate("ChatHistory")}
      >
        <Text style={styles.submitButtonTxt}>END</Text>
      </TouchableOpacity>
      <StatusBar barStyle="light-content" backgroundColor={theme.black} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  camera: {
    height: 250,
    width: 160,
    position: "absolute",
    bottom: 100,
    right: 10,
    zIndex: 1,
  },
  video: {
    width: width,
    height: height,
  },
});
