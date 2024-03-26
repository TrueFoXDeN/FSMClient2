export const environment = {
  appVersion: require('../../package.json').version,
  production: true,
  baseURL : "https://api-hawk-softworks.de:5001/api/v1",
  websocketURL: "ws://192.168.10.14:4000",
  multiplayerURL: "http://192.168.10.14:5000/api/v1"
};
