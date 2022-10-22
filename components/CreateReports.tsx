import React, { useState } from "react";
import ViewBoxesWithColorAndText from "./ScreenShot";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { saveScreenshot, setObjectValue } from "../fileSystem";

export default function CreateReports() {
  const [input, setInput] = useState("");
  const [view, setView] = useState<React.MutableRefObject<null>>();

  async function handleSubmit(
    input: string,
    view: React.MutableRefObject<null> | undefined
  ) {
    if (!view) return;
    const filepath = await saveScreenshot("app/images", input, view);
    if (!filepath) return;
    setObjectValue(input, { name: input, filepath });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Report</Text>
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
    paddingHorizontal: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: 250,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});
