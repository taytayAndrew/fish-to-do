const homedir = require('os').homedir()
const home = process.env.HOME || homedir;
const p = require('path')
const dbPath = p.join(home, '.todo')
const fs = require('fs')


const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error) {return reject(error)} 
                    let list
                    try {
                        list = JSON.parse(data)
                     } catch (error2) {
                        list = []
                    }
                    resolve(list)
                })
        })
    },
    write(list,path=dbPath) {  
        return new Promise((resolve,reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path,string,(error) => {
            if(error){return reject(error)}
            resolve()
            
        })
        })
        }
}

module.exports = db

