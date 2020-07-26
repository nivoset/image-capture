const info = (...args) => console.log(...args);
const error = (...args) => console.error(...args)
const warn = (...args) => console.warn(...args)
const debug = (...args) => console.debug(...args)

export default {
  info,
  error,
  warn,
  debug,
}