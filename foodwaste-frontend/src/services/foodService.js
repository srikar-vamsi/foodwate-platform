import API from "./api";

export const getFoodList = async () => {
  const response = await API.get("/food/all");
  return response.data;   // IMPORTANT
};

export const donateFood = async (food) => {
  const response = await API.post("/food/donate", food);
  return response.data;
};