export const environment = {
  appVersion: require('../../package.json').version  + '-dev',
  production: false,
  baseURL : "https://api-hawk-softworks.de:5001/api/v1",
  websocketURL: "ws://192.168.10.14:4000",
  multiplayerURL: "/api/v1"
}
