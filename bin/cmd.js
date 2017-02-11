#!/usr/bin/env node

const bogota = require('../index')

const argv = process.argv

if (argv.length <= 2) {
  console.log(`Please specify a path like 'tests/*.js'`)
}

const paths = argv.slice(2)

bogota(paths)
