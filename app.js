var db = require("./utils/db.js")


db.del("account", {name:'ccc',password:'yyyy'}, (err,ret)=>{
  let r = {
    data: JSON.stringify(ret.recordset),
    count: ret.rowsAffected[0]
  }
  console.log(r)
})

db.add("account",{name:'zhangsan',password:'qwert',age:999}, (err,ret)=>{
  let r = {
    data: JSON.stringify(ret.recordset),
    count: ret.rowsAffected[0]
  }
  console.log(r)
})


db.update("account", {password:"qazxsw", age: 20}, {name:"liyang", age:20}, (err,ret)=>{
  let r = {
    data: JSON.stringify(ret.recordset),
    count: ret.rowsAffected[0]
  }
  console.log(r)
})

db.select("account","","where name like @name",{name:'%li%'},"order by password", (err,ret)=>{
    let r = {
        data: JSON.stringify(ret.recordset),
        count: ret.rowsAffected[0]
    }
    console.log(r)
})


db.selectAll("account", (err,ret)=>{
  let r = {
    data: JSON.stringify(ret.recordset),
    count: ret.rowsAffected[0]
  }
  console.log(r)
})