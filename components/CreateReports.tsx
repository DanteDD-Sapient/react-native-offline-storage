import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import ViewBoxesWithColorAndText from "./ScreenShot";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { takeScreenshot } from "../fileSystem";
import {
  saveScreenshot,
  setObjectValue,
  getStorageContents,
} from "../fileSystem";

export default function CreateReports() {
  const [input, setInput] = useState("");
  const [view, setView] = useState<any>();

  async function handleSubmit(
    input: string,
    view: React.MutableRefObject<any>
  ) {
    const filePath = await saveScreenshot("app/images", input, view);
    console.log(filePath);
    setObjectValue(input, { name: input, filePath: filePath });
  }
  return (
    <View>
      <ViewBoxesWithColorAndText text={input} setRef={setView} />
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={setInput}
        value={input}
      />

      <Button title="Submit" onPress={() => handleSubmit(input, view)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: 250,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});
