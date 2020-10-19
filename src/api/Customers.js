import localforage from "localforage";
import {message} from "antd"

export const addCustomers = async (itemName, data) => {
  let storageItems;
  try {
    storageItems = await localforage.setItem(itemName, JSON.stringify(data));
  } catch (e) {
    console.log("error", e);
    message.error(e)
  }
  return storageItems;
};

export const fetchCustomers = async (itemName) => {
  let storageItems;
  try {
    storageItems = await localforage.getItem(itemName);
  } catch (e) {
    console.log("error", e);
    message.error(e)
  }
  return storageItems;
};
