
import axios from 'axios';

const API_URL = "https://www.demonslayer-api.com/api/v1/characters";

export const getCharacters = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}