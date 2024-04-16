export const environment = {
  appVersion: require('../../package.json').version,
  production: true,
  baseURL : "https://api-hawk-softworks.de:5001/api/v1",
  websocketURL: "ws://api-hawk-softworks.de:4000",
  multiplayerURL: "https://api-hawk-softworks.de:5003/api/v1"
};
