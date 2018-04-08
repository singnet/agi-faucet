const { region, Bucket } = require("./../config.json")
const { distDir } = require("./paths.js")

const fs = require("fs")
const { join } = require("path")
const { promisify } = require("util")
const mime = require("mime-types")
const AWS = require("aws-sdk")
AWS.config.update({ region })
const s3 = new AWS.S3({ "apiVersion": "2006-03-01" })

const readdir = promisify(fs.readdir)

readdir(distDir)
  .then(files => Promise.all(files.map(Key =>
    s3.upload({
      Bucket,
      Key,
      "ContentType": mime.lookup(join(distDir, Key)),
      "Body": fs.createReadStream(join(distDir, Key)),
      "CacheControl": Key === "index.html" ? "no-cache, no-store, must-revalidate" : "public, max-age=31536000"
    }).promise()
  )))
  .then(() => { console.log(`Files uploaded successfully`) })
  .catch(error => { console.log(error) }) 
