import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_qVYrdKoKD4PlXwKqEPrm5lDUjttnVlAXJW1KcBK5vCL56jOAcqNsZ6C9B04Gjc21";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching breeds:", error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data[0])
    .catch(error => {
      console.error("Error fetching cat by breed:", error);
      throw error;
    });
}