import axios from "axios";

export interface Character {
  id: number;
  name: string;
  img: string;
  age?: string;
  race?: string;
  gender?: string;
  description?: string;
  quote?: string;
}

const API_BASE = "https://www.demonslayer-api.com/api/v1/characters";

export async function getCharacters(): Promise<Character[]> {
  const response = await axios.get(`${API_BASE}?limit=45`);
  return response.data.content;
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await axios.get(`${API_BASE}?id=${id}`);
  return response.data.content[0];
}