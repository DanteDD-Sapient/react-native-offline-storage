import React from "react";
import { View, Button } from "react-native";

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
