import axios from 'axios';

const baseRequest = Object.freeze({ method: 'post', url: "/log", data: null });

const info = (...args) => {
  axios({ ...baseRequest, data: { level: "info", date: new Date(), data: [...args]}})
  console.log(...args)
};
const error = (...args) => {
  axios({ ...baseRequest, data: { level: "error", date: new Date(), data: [...args]}})
  console.error(...args)
}
const warn = (...args) => {
  axios({ ...baseRequest, data: { level: "warn", date: new Date(), data: [...args]}})
  console.warn(...args)
}
const debug = (...args) => {
  axios({ ...baseRequest, data: { level: "debug", date: new Date(), data: [...args]}})
  console.debug(...args)
}

export default {
  info,
  error,
  warn,
  debug,
}