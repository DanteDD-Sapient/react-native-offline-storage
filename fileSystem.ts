import * as FileSystem from "expo-file-system";
import { captureRef } from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function createDir(location: string) {
  const dirLocation = `${FileSystem.documentDirectory}${location}`;
  try {
    const dirInfo = await FileSystem.getInfoAsync(dirLocation);
    if (dirInfo.exists) throw new Error("dir already exists");
    await FileSystem.makeDirectoryAsync(dirLocation);
  } catch (err) {
    console.log(err);
  }
}

export async function takeScreenshot(view: React.MutableRefObject<any>) {
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

export async function saveScreenshot(
  location: string,
  fileName: string,
  view: React.MutableRefObject<any>
) {
  const imgURI = await takeScreenshot(view);
  if (!imgURI) return null;
  return await saveFileToDir(location, fileName, imgURI);
}

export async function getDirContents(
  location: string,
  setState: React.Dispatch<React.SetStateAction<string>>
) {
  const dirLocation = `${FileSystem.documentDirectory}${location}`;
  try {
    const dirInfo = await FileSystem.getInfoAsync(dirLocation);
    if (!dirInfo.exists) throw new Error("dir does not exist");
    console.log("dirInfo", dirInfo);
    setState(`${dirInfo.uri}/image`);
    const contents = await FileSystem.readDirectoryAsync(dirLocation);
    console.log("contents", contents);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDirContents(location: string) {
  const dirLocation = `${FileSystem.documentDirectory}${location}`;
  try {
    const dirInfo = await FileSystem.getInfoAsync(dirLocation);
    if (!dirInfo.exists) throw new Error("dir does not exist");
    await FileSystem.deleteAsync(dirLocation);
  } catch (err) {
    console.log(err);
  }
}

export async function setObjectValue(key: string, value: any) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err);
  }
  console.log("Done.");
}

export async function getStorageContents(setState: React.Dispatch<any>) {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys, keys[keys.length - 1]);
    const test = await AsyncStorage.getItem(keys[keys.length - 1]);
    const json = await AsyncStorage.multiGet(keys);
    console.log(json);
    if (!test) return;
    const contents = await JSON.parse(test);
    setState(contents);
  } catch (e) {
    // read key error
  }
}
