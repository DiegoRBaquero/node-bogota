const resolvePath = require('path').resolve
const cwd = process.cwd()

process.on('message', file => {
  require(resolvePath(resolvePath(cwd, file)))
})
