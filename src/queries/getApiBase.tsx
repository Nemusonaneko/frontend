const api_deployed={
  baseURL:"https://waifus.nemusona.com",
  apiURL: "https://waifus-api.nemusona.com"
}
const api_develop={
  baseURL:"https://localhost:3001",
  apiURL: "https://localhost:3003"
};

const api = process.env.NODE_ENV === "development"? api_develop : api_deployed  

export const apiURL = api.apiURL;
export const baseURL = api.baseURL;