const fs = jest.genMockFromModule('fs')
const __fs = jest.genMockFromModule('fs')

Object.assign(fs,__fs)
let readmocks = {}
fs.setReadmock = (path,error,data) =>{
    readmocks[path] = [error,data]
}
fs.readFile = (path,options,callback) =>{
    if(callback === undefined){
        callback = options //防止用户只传两个参数
    }
    if(path in readmocks){//如果该路径已经被mock过了 就不去调用真实的readfile
        callback(...readmocks[path])
    }else{
        __fs.readFile(path,options,callback)
    }
}
let writeMocks = {}
fs.setWritemock = (path,fn) =>{
    writeMocks[path] = fn
}
fs.writeFile = (path,data,options,callback) =>{
    if(path in writeMocks){
        writeMocks[path](path,data,options,callback)
    }else{
        __fs.writeFile(path,data,options,callback)
    }
}
fs.clearMock = () =>{
    writeMocks = {}
    readmocks = {}
}
module.exports = fs