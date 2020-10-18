import localforage from "localforage";

export const addCustomers = async (itemName, data) => {
  let storageItems;
  try {
      console.log('data 123', data)
    storageItems = await localforage.setItem(itemName, JSON.stringify(data));
  } catch (e) {
    console.log("error", e);
  }
  return storageItems;
};

export const fetchCustomers = async (itemName) => {
  let storageItems;
  try {
    storageItems = await localforage.getItem(itemName);
    console.log("storageItems",storageItems)
  } catch (e) {
    console.log("error", e);
  }
  return storageItems;
};
