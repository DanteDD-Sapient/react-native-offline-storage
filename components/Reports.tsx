import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import {
  deleteAllReports,
  viewStorage,
  getStorageContent,
  deleteSingleReport,
} from "../fileSystem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Report } from "../types";

function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  async function saveContents() {
    const keys = await AsyncStorage.getAllKeys();
    const contents = await getStorageContent(keys);
    if (!contents) return;
    setReports(contents);
  }
  useEffect(() => {
    saveContents();
  }, []);
  return (
    <View style={styles.container}>
      <>
        <Text style={styles.heading}>Reports</Text>
        {reports &&
          reports.map((report: Report) => (
            <View style={styles.report}>
              <View>
                <Image style={styles.image} source={{ uri: report.filepath }} />
                <Text>Report Name: {report.name}</Text>
              </View>
              <Button
                title="Delete Report"
                onPress={() => {
                  deleteSingleReport(report);
                  setReports([]);
                }}
              />
            </View>
          ))}
      </>
      <Button title="Delete All" onPress={() => deleteAllReports()} />
      <Button title="View Storage" onPress={() => viewStorage()} />
    </View>
  );
}

export default Reports;

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
  report: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 66,
    height: 58,
  },
});
