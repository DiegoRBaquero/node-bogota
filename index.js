const spawn = require('child_process').spawn
const tapSpec = require('tap-spec')
const glob = require('glob')
const Readable = require('stream').Readable
const shuffle = require('shuffle-array')
const uniq = require('uniq')

const cpus = require('os').cpus().length

function Bogota (paths) {
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

  shuffle(uniq(fileList))

  for (let i in [...Array(Math.min(cpus, fileList.length)).keys()]) {
    console.log(++pending, 'ins')
    runFork(i)
  }

  process.on('exit', code => {
    // console.log('parent exit', code || codes)
    process.exit(code || codes)
  })

  function runFork (i) {
    // console.log('spawning', i)
    const child = spawn('bogota-fork', [], {stdio: [null, null, null, 'ipc']})
    let data = []
    child.stdout.on('data', d => {
      if (data.length > 0 && d.includes('#')) {
        s.push(data.join(''))
        data = []
      }
      data.push(d)
    })

    child.stderr.on('data', err => {
      console.error(err.toString())
    })

    child.on('error', e => {
      console.error('ERROR', e)
    })

    child.on('message', m => {
      if (fileList.length) {
        console.log('sending more to', i)
        child.send(fileList.pop())
      } else {
        child.disconnect()
      }
    })

    child.on('exit', code => {
      // console.log('child exit', code)
      s.push(data.join(''))
      codes = codes || code
      if (--pending === 0) s.push(null)
    })

    setTimeout(() => {
      child.kill()
    }, 10000).unref()

    return child
  }
}

module.exports = Bogota
