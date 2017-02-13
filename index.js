const spawn = require('child_process').spawn
const tapSpec = require('tap-spec')
const glob = require('glob')
const Readable = require('stream').Readable

let codes = 0

function Bogota (paths) {
  const s = new Readable()
  s._read = () => {}
  s.pipe(tapSpec()).pipe(process.stdout)

  let hm = paths.length

  paths.forEach(path => {
    glob(path, (err, files) => {
      if (err) console.error(err)
      hm += files.length
      files.forEach(f => runTestFile(f))
    })
    hm--
  })

  function runTestFile (filename) {
    const proc = spawn('node', [filename])
    const data = []
    proc.stdout.on('data', d => {
      data.push(d)
    })

    proc.stderr.on('data', err => {
      console.error(err.toString())
    })

    proc.on('exit', code => {
      s.push(data.join(''))
      codes = codes || code
      if (--hm === 0) s.push(null)
    })
  }
}

process.on('exit', code => {
  process.exit(code || codes)
})

module.exports = Bogota
