const fs = require('fs')
const utils = require('./utils/utils')
const {parseProjects} = require('./utils/parseProjects')

const boardDir = 'boards'

if (require.main !== module) {
  module.exports = function() {
    const deps = [boardDir]
    const targets = ['build/.temp/boards.json']
    const moduleDep = false
    return {deps, targets, moduleDep}
  }
} else {
  const {config, cached_build, targets} = utils.processArgs(process.argv)

  const boards = parseProjects(config, cached_build)

  const boardJson = fs.openSync(targets[0], 'w')
  fs.write(boardJson, JSON.stringify(boards), err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

