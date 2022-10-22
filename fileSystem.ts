import * as FileSystem from "expo-file-system";
import { captureRef } from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Report } from "./types";

// https://docs.expo.dev/versions/latest/sdk/captureRef/
// here to demo file creation + manipulation
async function takeScreenshot(view: React.MutableRefObject<any>) {
  try {
    const imageURI = await captureRef(view, {
      result: "tmpfile",
      height: 100,
      width: 100,
      quality: 1,
      format: "png",
    });
    return imageURI;
  } catch (err) {
    console.log(err);
  }
  return null;
}

// copies file to directory
// creates directories if they do not yet exist
export async function saveFileToDir(
  location: string,
  fileName: string,
  fileURI: string
) {
  const dirLocation = `${FileSystem.documentDirectory}${location}`;
  try {
    const dirInfo = await FileSystem.getInfoAsync(dirLocation);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dirLocation, { intermediates: true });
    }
    // should use moveAsync but ran into permision issues
    await FileSystem.copyAsync({
      from: `file://${fileURI}`,
      to: `${dirLocation}/${fileName}`,
    });
    return `${dirLocation}/${fileName}`;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// function to generate and save screenshot
export async function saveScreenshot(
  location: string,
  fileName: string,
  view: React.MutableRefObject<any>
) {
  const imgURI = await takeScreenshot(view);
  if (!imgURI) return null;
  return await saveFileToDir(location, fileName, imgURI);
}

// save report to asyncStorage
export async function setObjectValue(key: string, value: Report) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err);
  }
}

// get all values from asyncStorage, return values array
export async function getStorageContent(keys: Readonly<string[]>) {
  try {
    const keyValuePairs = await AsyncStorage.multiGet(keys);
    const contents = <Report[]>[];
    for await (const item of keyValuePairs) {
      if (!item[1]) return;
      let result = await JSON.parse(item[1]);
      contents.push(result);
    }
    return contents;
  } catch (err) {
    console.log(err);
  }
}

// delete file/directory at given filepath
async function deleteFile(location: string) {
  try {
    const dirInfo = await FileSystem.getInfoAsync(location);
    if (!dirInfo.exists) throw new Error("dir does not exist");
    await FileSystem.deleteAsync(location);
  } catch (err) {
    console.log(err);
  }
}

// delete all files at location
async function deleteFiles(locations: string[]) {
  try {
    for await (const location of locations) {
      const dirInfo = await FileSystem.getInfoAsync(location);
      if (!dirInfo.exists) continue;
      await FileSystem.deleteAsync(location);
    }
  } catch (err) {
    console.log(err);
  }
}

// remove single entry from asyncStorage & file storage
export async function deleteSingleReport(report: any) {
  await deleteFile(report.filepath);
  await AsyncStorage.removeItem(report.name);
}

// remove all items from asyncStorage & file storage
export async function deleteAllReports() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await getStorageContent(keys);
    if (!result) return;
    const locations = <string[]>[];
    result.forEach((content: Report) => locations.push(content.filepath));
    await deleteFiles(locations);
    await AsyncStorage.multiRemove(keys);
  } catch (err) {
    console.log(err);
  }
}

// functions for demo purpose only

// displays info of item at location & contents if dir
export async function displayDirInfo(location: string) {
  const dirLocation = `${FileSystem.documentDirectory}${location}`;
  try {
    const dirInfo = await FileSystem.getInfoAsync(dirLocation);
    if (!dirInfo.exists) throw new Error("dir does not exist");
    console.log("dirInfo", dirInfo);
    const contents = await FileSystem.readDirectoryAsync(dirLocation);
    console.log("directory contents", contents);
  } catch (err) {
    console.log(err);
  }
}

// view contents of asyncStorage and app/images directory
export async function viewStorage() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const contents = await AsyncStorage.multiGet(keys);
    console.log("AsyncStorage contents", contents);
    await displayDirInfo("app/images");
  } catch (err) {
    console.log(err);
  }
}
