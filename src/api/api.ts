import axios from 'axios';
import { Secrets } from './Secrets'

const API_URL = 'https://gateway.marvel.com:443/v1/public';
const { ts, publicKey, hash } = Secrets;

export const getRandomCharacters = () => {
  
  return axios.get(`${API_URL}/characters`, {
    params: {
      'ts': ts,
      'apikey': publicKey,
      'hash': hash,
      'offset': 0,
      'limit': '3',
       
    }
  })
  .then((response) => {
    return response.data.data.results
  })
  .catch((err) => err);
};

export const getCharacterByName = (CharacterName : String) => {
  
  return axios.get(`${API_URL}/characters`, {
    params: {
      'nameStartsWith':CharacterName,
      'ts': ts,
      'apikey': publicKey,
      'hash': hash,
      'offset': 0,
      // 'limit': '3',  
    }
  })
  .then((response) => {
    return response.data.data.results
  })
  .catch((err) => err);
};

export const getCharacterById = (CharacterId : number) => {

  return axios.get(`${API_URL}/characters/`+CharacterId, {
    params: {
      'ts': ts,
      'apikey': publicKey,
      'hash': hash,
      'offset': 0,
    }
  })
  .then((response) => {
    return response.data.data.results
  })
  .catch((err) => err);
};


export const getComicsByCharacterId = (CharacterId : number) => {

  return axios.get(`${API_URL}/characters/`+CharacterId+'/comics', {
    params: {
      'ts': ts,
      'apikey': publicKey,
      'hash': hash,
      'offset': 0,
    }
  })
  .then((response) => {
    return response.data.data.results
  })
  .catch((err) => err);
};
