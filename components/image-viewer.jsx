import { Image, StyleSheet } from "react-native";

const ImageViewer = ({ image, selectedImg }) => {
  const src = selectedImg ? { uri: selectedImg } : image;

  return <Image style={styles.image} source={src} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
