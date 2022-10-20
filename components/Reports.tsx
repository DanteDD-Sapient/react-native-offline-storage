import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { getStorageContents } from "../fileSystem";

function Reports() {
  const [reports, setReports] = useState<any>();

  useEffect(() => {
    getStorageContents(setReports);
  }, []);
  return (
    <View>
      <Text>Reports</Text>
      {reports && (
        <>
          <Image style={styles.image} source={{ uri: reports.filePath }} />
          <Text>{reports.name}</Text>
        </>
      )}
    </View>
  );
}

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 66,
    height: 58,
  },
});
