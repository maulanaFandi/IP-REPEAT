import axios from "axios";
export default axios.create({
  // baseUrl: import.meta.env.VITE_APP_BASE_URL,
  baseURL: "https://anime.hacktaurant.shop/",
  // baseURL: "https://localhost:3000/",
  
});