export const environment = {
  appVersion: require('../../package.json').version,
  production: true,
  baseURL : "https://api-hawk-softworks.de:5001/api/v1",
  websocketURL: "ws://localhost:4000",
  multiplayerURL: "http://localhost:5000/api/v1"
};
