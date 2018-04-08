const fs = require("fs")
const { join } = require("path")
const { promisify } = require("util")

const { distDir } = require("./paths.js")

const readdir = promisify(fs.readdir)
const unlink = promisify(fs.unlink)

readdir(distDir)
  .then(files => Promise.all(files.map(file => unlink(join(distDir, file)))))
  .then(() => { console.log(`${distDir} emptied`) })
  .catch(error => { console.log(error) }) 
