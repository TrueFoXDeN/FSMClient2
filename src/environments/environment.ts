export const environment = {
  appVersion: require('../../package.json').version,
  production: true,
  baseURL : "https://api-hawk-softworks.de:5001/api/v1",
  websocketURL: "wss://api-hawk-softworks.de:4001",
  multiplayerURL: "https://api-hawk-softworks.de:5003/api/v1"
};
