import axios from "axios";

export const getCountryFlag = async (code: string) => {
  const { data } = await axios.get(`https://flagsapi.com/${code}/flat/64.png`);

  return data;
};
