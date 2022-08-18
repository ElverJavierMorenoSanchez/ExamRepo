import axios from "axios";
const BASE_URI = "http://184.73.108.66:3017/animals";

export async function getAnimals() {
  try {
    const animals = await axios.get(BASE_URI);
    return animals.data;
  } catch (error) {
    console.log(error);
  }
}
export async function postAnimal(animal) {
  try {
    const animals = await axios.post(BASE_URI, animal);
    return animals.data;
  } catch (error) {
    console.log(error);
  }
}
export async function putAnimal(id, animal) {
  try {
    const animals = await axios.put(`${BASE_URI}/${id}`, animal);
    return animals.data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteAnimal(id) {
  try {
    const animals = await axios.delete(`${BASE_URI}/${id}`);
    return animals.data;
  } catch (error) {
    console.log(error);
  }
}
