import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const fetchItems = (url) => axios.get(url);

const getItemById = (list, id, idKey = "id") => list.find((item) => item[idKey] === id);

const getItemsByKey = (list, value, key) => list.filter((item) => item[key] === value);

const addItem = (list, newItem, idKey = "id") => [...list, { ...newItem, [idKey]: uuidv4() }];

const updateItem = (list, updatedItem, idKey = "id") => list.map((item) => (item[idKey] === updatedItem[idKey] ? { ...item, ...updatedItem } : item));

const deleteItem = (list, id, idKey = "id") => list.filter((item) => item[idKey] !== id);

const setItem = (list, item, idKey = "id") => (list.some((i) => i[idKey] === item[idKey]) ? updateItem(list, item, idKey) : addItem(list, item, idKey));

export { fetchItems, getItemById, getItemsByKey, addItem, updateItem, deleteItem, setItem };
