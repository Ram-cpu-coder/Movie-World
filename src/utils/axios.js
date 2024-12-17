import axios from "axios";
const apiKEY = import.meta.env.VITE_APIKEY;
const apiEP = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKEY}&`;


export const fetchFromAPI = async (str) => {
    try {
        const response = await axios.get(`${apiEP}&t=${str}`);
        return response.data;

    } catch (error) {
        console.log(error)
    }
};
