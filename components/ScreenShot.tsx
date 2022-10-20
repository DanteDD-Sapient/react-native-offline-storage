import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";

const ViewBoxesWithColorAndText = ({ text, setRef }: any) => {
  const view = useRef(null);
  useEffect(() => {
    setRef(view);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.screenshotView} ref={view}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  screenshotView: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
});

export default ViewBoxesWithColorAndText;
