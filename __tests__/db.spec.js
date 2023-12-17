const db = require('../db.js')
const fs = require('../__mocks__/fs.js')
jest.mock('fs')

describe('db' , () => { 
 it('can read', async ()=>{
    afterEach(() =>{
      fs.clearMock()
    })
    const a = [{title:'hi',done:true}]
    fs.setReadmock('/xxx',null,JSON.stringify(a))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(a)
    fs.clearMock()
  })
  it('can write', async ()=>{
    let fakefile = ''
    fs.setWritemock('/yyy',(path,data,callback)=>{//这一步就会把/yyy放入writeMock里
        fakefile = data
        callback(null)
    })
    const list = [{title:'hi',done:true}]
    await db.write(list,'/yyy')
    expect(fakefile).toBe(JSON.stringify(list))
    fs.clearMock()
  })
 
})
//单元检测是否可以成功读取文件