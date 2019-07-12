const BufferList = require('bl')
const fork = require('child_process').fork
const tapSpec = require('tap-spec')
const glob = require('glob')
const path = require('path')
const Readable = require('stream').Readable
const uniq = require('uniq')
const os = require('os')

function Bogota (paths, maxChilds) {
  maxChilds = maxChilds || os.cpus().length * 2
  let codes = 0
  let pending = 0

  const s = new Readable()
  s._read = () => {}
  s.pipe(tapSpec()).pipe(process.stdout)

  let fileList = []

  paths.forEach(path => {
    const pathFiles = glob.sync(path)
    if (pathFiles.length > 0) fileList = fileList.concat(pathFiles)
  })

  uniq(fileList)

  const childsToRun = Math.min(maxChilds, fileList.length)
  const childs = []

  for (let i = 0; i < childsToRun; i++) {
    pending++
    runFork()
  }

  process.on('exit', code => {
    process.exit(code || codes)
  })

  const disconnectChilds = (function () {
    const once = () => {
      if (once.called) return true
      childs.forEach(child => {
        child.connected && child.disconnect()
      })
      once.called = true
    }
    once.called = false
    return once
  })()

  function runFork () {
    const child = fork(path.resolve(__dirname) + '/child.js', [], { stdio: [null, null, null, 'ipc'] })
    childs.push(child)
    let data = new BufferList()
    child.stdout.on('data', d => {
      if (data.length > 0 && d.includes('#')) {
        if (fileList.length) {
          child.send(fileList.pop())
        } else {
          disconnectChilds()
        }
        s.push(data.toString())
        data = new BufferList()
      }
      data.append(d)
    })

    child.stderr.on('data', err => {
      console.error(err.toString())
    })

    child.on('error', e => {
      console.error('ERROR', e)
    })

    child.on('exit', code => {
      s.push(data.toString())
      codes = codes || code
      if (--pending === 0) s.push(null)
    })

    child.send(fileList.pop())

    setTimeout(() => {
      child.connected && child.disconnect()
    }, 60000).unref()
  }
}

module.exports = Bogota
