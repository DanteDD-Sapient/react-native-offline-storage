import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function Home({ navigation }: any) {
  return (
    <View>
      <Button
        title="Create Report"
        onPress={() => navigation.navigate("CreateReports")}
      />
      <Button
        title="View Reports"
        onPress={() => navigation.navigate("ViewReports")}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
});
