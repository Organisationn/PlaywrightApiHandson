const fs = require('fs')
const path = require('path')

function readJson(filePath){
    const absolutePath = path.join(__dirname, filePath)
    const file = fs.readFileSync(absolutePath, 'utf8')
    return JSON.parse(file)
}

module.exports = readJson