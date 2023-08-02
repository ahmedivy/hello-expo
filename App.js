import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Button from "./components/button";
import EmojiList from "./components/emoji-list";
import EmojiSticker from "./components/emoji-sticker";
import IconButton from "./components/icon-button";
import ImageViewer from "./components/image-viewer";
import EmojiPicker from "./components/emoji-picler";
import CircleButton from "./components/circle-button";
const placeholder = require("./assets/images/background-image.png");

export default function App() {
  let [status, requestPermission] = MediaLibrary.usePermissions();
  let [selectedImg, setSelectedImg] = useState(null);
  let [showAppOptions, setShowAppOptions] = useState(false);
  let [isModalVisible, setIsModalVisible] = useState(false);
  let [pickedEmoji, setPickedEmoji] = useState(null);

  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You need to pick an image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onImageSave = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer image={placeholder} selectedImg={selectedImg} />
            {pickedEmoji !== null ? (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            ) : null}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onImageSave} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImage}
            />
            <Button
              label="Use this photo"
              onPress={() => {
                setShowAppOptions(true);
              }}
            />
          </View>
        )}
        <EmojiPicker
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        >
          <EmojiList
            onSelect={setPickedEmoji}
            onCloseModal={() => setIsModalVisible(false)}
          />
        </EmojiPicker>
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
