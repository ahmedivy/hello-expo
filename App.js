import { useState } from "react";
import Button from "./components/button";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import ImageViewer from "./components/image-viewer";
const placeholder = require("./assets/images/background-image.png");

export default function App() {
  let [selectedImg, setSelectedImg] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0].uri);
    } else {
      alert("You need to pick an image");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer image={placeholder} selectedImg={selectedImg} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImage} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
